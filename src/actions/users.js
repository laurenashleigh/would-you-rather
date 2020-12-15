import { saveQuestionAnswer } from "../utils/api";
import { saveAnswer } from '../actions/questions';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

function addAnswerToUser(authUser, qid, value) {
  return {
    type: ADD_ANSWER_TO_USER,
    authUser,
    qid,
    value
  };
}

//Adds new answer to user
export default function handleAddAnswer(authUser, qid, value) {
  return dispatch => {
    dispatch(addAnswerToUser(authUser, qid, value));
    dispatch(saveAnswer(authUser, qid, value));

    return saveQuestionAnswer({authUser, qid, value})
  };
};

//Adds new question to user
export function saveQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author
  }
}