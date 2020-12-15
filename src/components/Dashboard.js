import React, { Component } from 'react';
import { Segment, Tab, Header, Grid, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Question from '../components/Question';
import Card from '../components/Card';

export class Dashboard extends Component {
    state ={
        value: ''
    };

    handleChange = (e, { value }) => this.setState({ value });

    render() {
        const { userAnswerStatus } = this.props;
        return <Tab panes={panes({ userAnswerStatus })} />
    }
}

const panes = (props) => {
    const { userAnswerStatus } = props;
    
    return [
        {
            menuItem: 'Answered',
            render: () => (
                <Tab.Pane>
                    {userAnswerStatus.unanswered.map(question => (
                        <Card key={question.id} question_id={question.id} unanswered={true}/> 
                    ))}
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Unanswered',
            render: () => (
                <Tab.Pane>
                    {userAnswerStatus.answered.map(question => (
                        <Segment.Group key={question.id}>
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
    

function mapStateToProps(state) {
    const { authUser, users, questions } = state;
    const answeredIds = Object.keys(users[authUser].answers);
    const answered = Object.values(questions)
      .filter(question => !answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
    const unanswered = Object.values(questions)
      .filter(question => answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
  
    return {
      userAnswerStatus: {
        answered,
        unanswered
      }
    };
  }
  
  export default connect(mapStateToProps)(Dashboard);