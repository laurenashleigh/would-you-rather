import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header, Button, Progress, Grid, Image, Segment, Icon } from 'semantic-ui-react';

export class QuestionStat extends Component {

    render() {
        const { question, authUser } = this.props
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length
        const optionOnePercent = optionOneVotes / (optionOneVotes + optionTwoVotes)
        const optionTwoPercent = optionTwoVotes / (optionOneVotes + optionTwoVotes)
        return (
            <div>
                <Header as="h4" textAlign="left" block>
                    Results
                </Header>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Image src={`/${question.author}.png`}/>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Header as="h2">{question.author} asked:</Header>
                            <Segment>
                                {question.optionOne.votes.includes(authUser) && (
                                    <p><Icon name="check circle" color="green" size="large"/>You voted for:</p>
                                )}
                                 <p><strong>{question.optionOne.text}</strong></p>
                                <Progress percent={(optionOnePercent * 100).toFixed(2)} progress color="violet"> {optionOneVotes} votes</Progress>
                            </Segment>
                            <Segment>
                                {question.optionTwo.votes.includes(authUser) &&
                                    <p><Icon name="check circle" color="green" size="large"/>You voted for:</p>
                                }
                                 <p><strong>{question.optionTwo.text}</strong></p>
                                <Progress percent={(optionTwoPercent * 100).toFixed(2)} progress color="violet"> {optionTwoVotes} votes </Progress>
                            </Segment>
                            {console.log({question})}
                            <Link to="/"><Button size="tiny">Back</Button></Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
function mapStateToProps(
    { authUser, questions },
    { match, question_id }
) {
    let question;
    if (question_id !== undefined) {
    question = questions[question_id];
    } else {
    const { question_id } = match.params;
    question = questions[question_id];
    return {
        authUser,
        question
    };
    };
};

export default connect(mapStateToProps)(QuestionStat);