import React, { Component } from 'react';
import { Form, Header, Radio, Button, Grid, Segment, Image } from "semantic-ui-react";
import { connect } from 'react-redux';
import handleSaveQuestionAnswer from '../actions/users';
import Question from './Question';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Teaser from './Teaser';
import QuestionStat from './QuestionStat';

const cardTypes = {
    QUESTION: 'QUESTION',
    TEASER: 'TEASER',
    RESULT: 'RESULT'
}

export class Card extends Component {
    static propTypes = {
        question: PropTypes.object,
        author: PropTypes.object,
        cardType: PropTypes.string,
        unanswered: PropTypes.bool,
        question_id: PropTypes.string
      };
    render() {
        const { question, cardType, error } = this.props;

        if (error === true) {
            return <Redirect to="/error" />
        }

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
                                    {cardType === cardTypes.TEASER && <Teaser question={question}/>}
                                    {cardType === cardTypes.RESULT && <Question question={question}/>}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment.Group>  
                
            </div>
        )
    }
}

function mapStateToProps(
    { users, questions, authUser },
    { match, question_id }
  ) {
    let question,
      author,
      cardType,
      error = false;
    if (question_id !== undefined) {
      question = questions[question_id];
      author = users[question.author];
      cardType = cardTypes.TEASER;
    } else {
      const { question_id } = match.params;
      question = questions[question_id];
      const user = users[authUser];
  
      if (question === undefined) {
        error = true;
      } else {
        author = users[question.author];
        cardType = cardTypes.QUESTION;
        if (Object.keys(user.answers).includes(question.id)) {
          cardType = cardTypes.RESULT;
        }
      }
    }
  
    return {
      error,
      question,
      author,
      cardType
    };
  }
  
  export default connect(mapStateToProps)(Card);