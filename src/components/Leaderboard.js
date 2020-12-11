import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';

const cardColour = ['yellow', 'grey', 'brown']
const place = ["First", "Second","Third"]

export class Leaderboard extends Component {
    render() {
        const { scoreData } = this.props;
        return (
            <div>
                {scoreData.map((user, i) => (
                    <Segment.Group>
                        <Header as="h4" textAlign="left" block color={cardColour[i]}>{place[i]}</Header>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={5}>
                                    <Image src={user.avatarURL}/>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Header>{user.name}</Header>
                                    {console.log({scoreData})}
                                    <div>
                                        <span>Questions answered: </span>
                                        <span>{user.answered}</span>
                                    </div>
                                    <div>
                                        <span>Questions asked: </span>
                                        <span>{user.asked}</span>
                                    </div>

                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <div>
                                        <p><strong>Score</strong></p>
                                        <br></br>
                                        <p>{user.score}</p>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment.Group>
                ))}
                    
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { users } = state;
    const scoreData = Object.values(users)
    .map(user => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answered: Object.values(user.answers).length,
        asked: user.questions.length,
        score: Object.values(user.answers).length + user.questions.length
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);
    return {
        scoreData
    };
}

export default connect(mapStateToProps)(Leaderboard);