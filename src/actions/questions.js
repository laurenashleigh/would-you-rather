import { saveQuestion } from "../utils/api";
import { saveQuestionToUser } from '../actions/users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER = 'SAVE_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function saveAnswer(authUser, qid, value) {
  return {
    type: SAVE_ANSWER,
    authUser,
    qid,
    value
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

//Adds new question to the store
export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return dispatch => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(addQuestion(question));
        dispatch(saveQuestionToUser(question));
      }
    )
  }
}

