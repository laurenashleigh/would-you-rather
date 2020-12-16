import React, { Component } from 'react';
import { Header, Grid, Segment, Image } from "semantic-ui-react";
import { connect } from 'react-redux';
import Preview from './Preview';


export class Card extends Component {
    render() {
        const { question } = this.props;

        return (
            <div>
                <Segment.Group>
                        <Header as="h4" textAlign="left" block>
                            {question.author} asks:
                        </Header>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={5}>
                                    <Image src={`${question.author}.png`}/>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Preview question={question}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment.Group>  
                
            </div>
        )
    }
}

//Data from Redux store state
function mapStateToProps(state, ownProps) {
    const { users, questions } = state;
    const { match, question_id } = ownProps;
    let question,
      author;
    if (question_id !== undefined) {
      question = questions[question_id];
      author = users[question.author];
    } else {
      const { question_id } = match.params;
      question = questions[question_id];
  
      if (question !== undefined) {
        author = users[question.author];
      }
    }
  
    return {
      question,
      author,
    };
  }
  
  export default connect(mapStateToProps)(Card);