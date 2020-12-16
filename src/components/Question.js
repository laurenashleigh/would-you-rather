import React, { Component } from 'react';
import { Form, Header, Radio, Button } from "semantic-ui-react";
import { connect } from 'react-redux';
import handleAddAnswer from '../actions/users';
import { Link } from 'react-router-dom';

export class Question extends Component {
    state = {
        value: ''
    };

    handleChange = (e, { value }) => this.setState({ value });

    handleSubmit = e => {
        e.preventDefault();
        const { authUser, question, handleAddAnswer } = this.props;
        const { value } = this.state;
        const qid = question.id
        new Promise ((res, rej) => {
            handleAddAnswer(authUser, qid, value);
            setTimeout(() => res('success', 500));
        }).then(() => {
            this.setState({ value: '' })
        })
        

    };

    render() {
        const { question } = this.props;
        const { value } = this.state;
        const answered = this.state.value === '' ? false : true;
        return (
            <div>
                <Header as="h3" >Would you rather</Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Radio 
                            onChange={this.handleChange}
                            value="optionOne"
                            checked={this.state.value === 'optionOne'}
                            name="radioGroup"
                            label={question.optionOne.text}
                        />
                        <br />
                        {console.log({value})}
                        <Radio 
                            onChange={this.handleChange}
                            value="optionTwo"
                            checked={this.state.value === 'optionTwo'}
                            name="radioGroup"
                            label={question.optionTwo.text}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Link to="/">
                            <Button 
                                onClick={this.handleSubmit}
                                color="teal"
                                size="tiny"
                                content="Submit"
                                disabled={!answered}
                            />
                        </Link>
                    </Form.Field>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { authUser } = state;
    return {
        authUser,
    }
}

export default connect(
    mapStateToProps,
    { handleAddAnswer }
)(Question);