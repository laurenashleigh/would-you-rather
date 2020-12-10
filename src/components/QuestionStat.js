import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header, Button, Progress, Grid, Image, Segment } from 'semantic-ui-react';

export class QuestionStat extends Component {

    render() {
        const { question } = this.props
        return (
            <div>
                <Header as="h4" textAlign="left" block>
                    Results
                </Header>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Image src='/Lauren.png'/>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Header as="h2">Results</Header>
                            <Segment>
                                 <p><strong>Option one</strong></p>
                                <Progress percent={((1/5) * 100).toFixed(2)} progress color="violet"> 1 out of 5 votes</Progress>
                            </Segment>
                            <Segment>
                                 <p><strong>Option two</strong></p>
                                <Progress percent={((4/5) * 100).toFixed(2)} progress color="violet"> 4 out of 5 votes</Progress>
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