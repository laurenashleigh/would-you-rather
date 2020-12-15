import {
  RECEIVE_QUESTIONS,
  SAVE_ANSWER,
  ADD_QUESTION
} from '../actions/questions';

//Adds new question to state
//Saves user's vote to question
export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case SAVE_ANSWER:
      const { authUser, qid, value } = action;

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [value]: {
            ...state[qid][value],
            votes: state[qid][value].votes.concat(authUser)
          }
        }
      };
    case ADD_QUESTION:
      const { question } = action;

      return {
        ...state,
        [question.id]: question
      };
    default:
      return state;
  }
}