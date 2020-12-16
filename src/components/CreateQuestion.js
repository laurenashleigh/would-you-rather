import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { Header, Grid, Segment, Form, Divider, Button, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export class CreateQuestion extends Component {
    state = {  
        optionOne: '',
        optionTwo: '',
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault();

        const { authUser, handleAddQuestion } = this.props;
        const { optionOne, optionTwo } = this.state;
        new Promise ((res, rej) => {
            handleAddQuestion(optionOne, optionTwo, authUser) ;
            setTimeout(() => res('success'), 500);
        }).then(() => {
            this.setState({ optionOne: '', optionTwo: '' })
        })
    }
    
    render() {
        const state = this.state
        return (
            <div>
                <Segment.Group>
                    <Header as="h4" textAlign="left" block>Create your own question</Header>
                    <Grid>
                        <Grid.Column>
                            <Header>Would you rather...</Header>
                            <Form>
                                <div>
                                    <Input 
                                        id="optionOne"
                                        placeholder="Option one"
                                        value={this.state.optionOne}
                                        onChange={this.handleChange}
                                        required
                                        style={{width: "100%"}}
                                    />
                                    {console.log({state})}
                                    <Divider horizontal>Or</Divider>
                                    <Input
                                        id="optionTwo"
                                        placeholder="Option two"
                                        value={this.state.optionTwo}
                                        onChange={this.handleChange}
                                        required
                                        style={{width: "100%", paddingBottom: "2rem"}}
                                    />
                                </div>
                                <Button size="tiny" fluid color="teal" onClick={this.handleSubmit}>Submit</Button>
                                <br/>
                                <Link to="/"><Button size="tiny">Back</Button></Link>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Segment.Group>
            </div>
        )
    }
}

//Data from Redux store 
const mapStateToProps = ({ authUser }) => ({
    authUser,
})

export default connect(
    mapStateToProps,
    { handleAddQuestion }
)(CreateQuestion);