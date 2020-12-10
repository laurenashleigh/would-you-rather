import React, { Component } from 'react';
import { Segment, Tab, Header, Grid, Image, Button, Form, Radio } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from '../components/Question';
import Card from '../components/Card';

export class Dashboard extends Component {
    static propTypes = {userQuestionData: PropTypes.object.isRequired};
    state ={
        value: ''
    };

    handleChange = (e, { value }) => this.setState({ value });

    render() {
        const { userQuestionData } = this.props;
        return <Tab panes={panes({ userQuestionData })} className="tab" />
    }
}

const panes = (props) => {
    const { userQuestionData } = props;
    
    return [
        {
            menuItem: 'Answered',
            render: () => (
                <Tab.Pane>
                    {userQuestionData.answered.map(question => (
                        <Card key={question.id} question_id={question.id} unanswered={true}/> 
                    ))}
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Unanswered',
            render: () => (
                <Tab.Pane>
                    {userQuestionData.unanswered.map(question => (
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
                                <Question question={question} key={question.id}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment.Group>  
                    ))}
                    
                </Tab.Pane>
            )
        },
    ];
}
    

function mapStateToProps({ authUser, users, questions }) {
    const answeredIds = Object.keys(users[authUser].answers);
    const answered = Object.values(questions)
      .filter(question => !answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
    const unanswered = Object.values(questions)
      .filter(question => answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
  
    return {
      userQuestionData: {
        answered,
        unanswered
      }
    };
  }
  
  export default connect(mapStateToProps)(Dashboard);