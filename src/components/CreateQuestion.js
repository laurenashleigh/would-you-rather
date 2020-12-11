import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/questions';
import { Header, Grid, Segment, Form, Divider } from 'semantic-ui-react';
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

        const { authUser } = this.props;
        const { optionOne, optionTwo } = this.state;
        const info = { optionOne, optionTwo, authUser }
        new Promise ((res, rej) => {
            handleSaveQuestion(info) ;
            setTimeout(() => res('success'), 500);
        }).then(() => {
            this.setState({ optionOne: '', optionTwo: '' })
        })
    }
    
    render() {
        const formComplete = (this.state.optionOne === '' || this.state.optionTwo === '') ? false : true;
        return (
            <div>
                <Segment.Group>
                    <Header as="h4" textAlign="left" block>Create your own question</Header>
                    <Grid>
                        <Grid.Column>
                            <Header>Would you rather...</Header>
                            <Form onSubmit={this.handleSubmit}>
                                <div>
                                    <Form.Input 
                                        id="optionOne"
                                        placeholder="Option one"
                                        value={this.state.optionOne}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <Divider horizontal>Or</Divider>
                                    <Form.Input
                                    id="optionTwo"
                                    placeholder="Option two"
                                    value={this.state.optionTwo}
                                    onChange={this.handleChange}
                                    required
                                    />
                                </div>
                                <Link to="/" disabled={formComplete}><Form.Button size="tiny" fluid >Submit</Form.Button></Link>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Segment.Group>
            </div>
        )
    }
}

const mapStateToProps = ({ authUser }) => ({
    authUser,
})

export default connect(
    mapStateToProps,
    { handleSaveQuestion }
)(CreateQuestion);