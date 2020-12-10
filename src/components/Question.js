import React, { Component } from 'react';
import { Form, Header, Radio, Button } from "semantic-ui-react";
import { connect } from 'react-redux';
import handleSaveQuestionAnswer from '../actions/users';

export class Question extends Component {
    state = {
        value: ''
    };

    handleChange = (e, { value }) => this.setState({ value });

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.value !== '') {
            const { authUser, question, handleSaveQuestionAnswer } = this.props;
            handleSaveQuestionAnswer(authUser, question.id, this.state.value);
        }
    };

    render() {
        const { question } = this.props;
        const disabled = this.state.value === '' ? true : false;

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
                        <Radio 
                            onChange={this.handleChange}
                            value="optionTwo"
                            checked={this.state.value === 'optionTwo'}
                            name="radioGroup"
                            label={question.optionTwo.text}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button 
                            color="teal"
                            size="tiny"
                            disabled={disabled}
                            content="Submit"
                        />
                    </Form.Field>
                </Form>
            </div>
        )
    }
}

function mapStateToProps({ authUser }) {
    return {
        authUser,
    }
}

export default connect(
    mapStateToProps,
    { handleSaveQuestionAnswer }
)(Question);