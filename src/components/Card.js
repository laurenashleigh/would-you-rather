import React, { Component } from 'react';
import { Header, Grid, Segment, Image } from "semantic-ui-react";
import { connect } from 'react-redux';
import Question from './Question';
import Preview from './Preview';
import QuestionStat from './QuestionStat';

const cardTypes = {
    QUESTION: 'QUESTION',
    PREVIEW: 'PREVIEW',
    RESULT: 'RESULT'
}

export class Card extends Component {
    render() {
        const { question, cardType } = this.props;

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
                                    {cardType === cardTypes.QUESTION && <Question question={question}/>}
                                    {cardType === cardTypes.PREVIEW && <Preview question={question}/>}
                                    {cardType === cardTypes.RESULT && <QuestionStat question={question}/>}
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
    const { users, questions, authUser } = state;
    const { match, question_id } = ownProps;
    let question,
      author,
      cardType;
    if (question_id !== undefined) {
      question = questions[question_id];
      author = users[question.author];
      cardType = cardTypes.PREVIEW;
    } else {
      const { question_id } = match.params;
      question = questions[question_id];
      const user = users[authUser];
  
      if (question !== undefined) {
        author = users[question.author];
        cardType = cardTypes.QUESTION;
        if (Object.keys(user.answers).includes(question.id)) {
          cardType = cardTypes.RESULT;
        }
      }
    }
  
    return {
      question,
      author,
      cardType
    };
  }
  
  export default connect(mapStateToProps)(Card);