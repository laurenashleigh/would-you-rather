import React, { Component } from 'react';
import { Form, Header, Radio, Button } from "semantic-ui-react";
import { connect } from 'react-redux';
import handleSaveQuestionAnswer from '../actions/users';
import { Redirect } from 'react-router-dom';

export class Teaser extends Component {
    state ={
        clicked: false
    };


    handleClick = e => {
        this.setState(prevState => ({
            clicked: !prevState.clicked
        }));
    };

    render() {
        const { question, unanswered } = this.props;
        const disabled = this.state.value === '' ? true : false;
        const buttonLabel = unanswered === true ? 'Click to answer' : 'View results'

        if (this.state.clicked === true) {
            return <Redirect push to={`/questions/${question.id}`}/>
        }

        return (
            <div>
                <Header as="h3" >Would you rather</Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Radio 
                            value="optionOne"
                            checked={this.state.value === 'optionOne'}
                            name="radioGroup"
                            label={question.optionOne.text}
                        />
                        <br />
                        <p>or ...</p>
                    </Form.Field>
                    <Form.Field>
                        <Button 
                            color="teal"
                            size="tiny"
                            disabled={disabled}
                            content={buttonLabel}
                            onClick={this.handleClick}
                        />
                    </Form.Field>
                </Form>
            </div>
        )
    }
}

export default Teaser;