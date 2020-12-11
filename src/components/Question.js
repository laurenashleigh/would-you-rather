import React, { Component } from 'react';
import { Form, Header, Radio, Button } from "semantic-ui-react";
import { connect } from 'react-redux';
import handleSaveQuestionAnswer from '../actions/users';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Question extends Component {
    state = {
        value: ''
    };

    handleChange = (e, { value }) => this.setState({ value });

    handleSubmit = e => {
        e.preventDefault();
        const { authUser, question, handleSaveQuestionAnswer } = this.props;
        const { value } = this.state;
        const qid = question.id
        new Promise ((res, rej) => {
            handleSaveQuestionAnswer(authUser, qid, value);
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
                                color="teal"
                                size="tiny"
                                content="Submit"
                                onClick={this.handleSubmit}
                                disabled={!answered}
                            />
                        </Link>
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