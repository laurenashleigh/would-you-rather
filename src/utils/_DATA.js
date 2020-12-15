let users = {
    andrewsatish: {
      id: 'andrewsatish',
      name: 'Andrew-Satish',
      avatarURL: 'Andrew-Satish.png',
      answers: {
        '8xf0y6ziyjabvozdd253nd': 'optionOne',
        '6ni6ok3ym7mf1p33lnez': 'optionTwo',
        am8ehyc8byjqgar0jgpub9: 'optionTwo',
        loxhs1bqm25b708cmbf3g: 'optionTwo'
      },
      questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    },
    karen: {
      id: 'karen',
      name: 'Karen',
      avatarURL: 'Karen.png',
      answers: {
        vthrdm985a262al8qx3do: 'optionOne',
        xj352vofupe1dqz9emx13r: 'optionTwo'
      },
      questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
    },
    lauren: {
      id: 'lauren',
      name: 'Lauren',
      avatarURL: 'Lauren.png',
      answers: {
        xj352vofupe1dqz9emx13r: 'optionOne',
        vthrdm985a262al8qx3do: 'optionTwo',
        '6ni6ok3ym7mf1p33lnez': 'optionTwo'
      },
      questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
    },
    kieren: {
      id: 'kieren',
      name: 'Kieren',
      avatarURL: 'Kieren.png',
      answers: {},
      questions: []
    },
    matthew: {
      id: 'matthew',
      name: 'Matthew',
      avatarURL: 'Matthew.png',
      answers: {},
      questions: []
    },
    ryan: {
      id: 'ryan',
      name: 'Ryan',
      avatarURL: 'Ryan.png',
      answers: {},
      questions: []
    },
    mrb: {
      id: 'mrb',
      name: 'Mr B',
      avatarURL: 'Mr B.png',
      answers: {},
      questions: []
    },
    rebekka: {
      id: 'rebekka',
      name: 'Rebekka',
      avatarURL: 'Rebekka.png',
      answers: {},
      questions: []
    }
  };
  
  let questions = {
    '8xf0y6ziyjabvozdd253nd': {
      id: '8xf0y6ziyjabvozdd253nd',
      author: 'Andrew-Satish',
      timestamp: 1467166872634,
      optionOne: {
        votes: ['andrewsatish'],
        text: 'have horrible short term memory'
      },
      optionTwo: {
        votes: [],
        text: 'have horrible long term memory'
      }
    },
    '6ni6ok3ym7mf1p33lnez': {
      id: '6ni6ok3ym7mf1p33lnez',
      author: 'Lauren',
      timestamp: 1468479767190,
      optionOne: {
        votes: [],
        text: 'become a superhero'
      },
      optionTwo: {
        votes: ['andrewsatish', 'lauren'],
        text: 'become a supervillain'
      }
    },
    am8ehyc8byjqgar0jgpub9: {
      id: 'am8ehyc8byjqgar0jgpub9',
      author: 'Andrew-Satish',
      timestamp: 1488579767190,
      optionOne: {
        votes: [],
        text: 'be telekinetic'
      },
      optionTwo: {
        votes: ['andrewsatish'],
        text: 'be telepathic'
      }
    },
    loxhs1bqm25b708cmbf3g: {
      id: 'loxhs1bqm25b708cmbf3g',
      author: 'Karen',
      timestamp: 1482579767190,
      optionOne: {
        votes: [],
        text: 'be a front-end developer'
      },
      optionTwo: {
        votes: ['andrewsatish'],
        text: 'be a back-end developer'
      }
    },
    vthrdm985a262al8qx3do: {
      id: 'vthrdm985a262al8qx3do',
      author: 'Karen',
      timestamp: 1489579767190,
      optionOne: {
        votes: ['karen'],
        text: 'find $50 yourself'
      },
      optionTwo: {
        votes: ['lauren'],
        text: 'have your best friend find $500'
      }
    },
    xj352vofupe1dqz9emx13r: {
      id: 'xj352vofupe1dqz9emx13r',
      author: 'Lauren',
      timestamp: 1493579767190,
      optionOne: {
        votes: ['lauren'],
        text: 'write JavaScript'
      },
      optionTwo: {
        votes: ['karen'],
        text: 'write Swift'
      }
    }
  };
  
  function generateUID() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  }
  
  export function _getUsers() {
    return new Promise((res, rej) => {
      setTimeout(() => res({ ...users }), 1000);
    });
  }
  
  export function _getQuestions() {
    return new Promise((res, rej) => {
      setTimeout(() => res({ ...questions }), 1000);
    });
  }
  
  function formatQuestion({ optionOneText, optionTwoText, author }) {
    return {
      id: generateUID(),
      timestamp: Date.now(),
      author,
      optionOne: {
        votes: [],
        text: optionOneText
      },
      optionTwo: {
        votes: [],
        text: optionTwoText
      }
    };
  }
  
  export function _saveQuestion(question) {
    return new Promise((res, rej) => {
      const authUser = question.author;
      const formattedQuestion = formatQuestion(question);
  
      setTimeout(() => {
        questions = {
          ...questions,
          [formattedQuestion.id]: formattedQuestion
        };
  
        users = {
          ...users,
          [authUser]: {
            ...users[authUser],
            questions: users[authUser].questions.concat([formattedQuestion.id])
          }
        };
  
        res(formattedQuestion);
      }, 1000);
    });
  }
  
  export function _saveQuestionAnswer({ authUser, qid, value }) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        users = {
          ...users,
          [authUser]: {
            ...users[authUser],
            answers: {
              ...users[authUser].answers,
              [qid]: value
            }
          }
        };
  
        questions = {
          ...questions,
          [qid]: {
            ...questions[qid],
            [value]: {
              ...questions[qid][value],
              votes: questions[qid][value].votes.concat([authUser])
            }
          }
        };
  
        res();
      }, 500);
    });
  }

  export default users;
  