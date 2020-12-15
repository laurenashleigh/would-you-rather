import React from 'react';
import { Form, Header, Radio, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';

export const Preview = (props) => {
        const { question, unanswered } = props;
        const buttonLabel = unanswered === true ? 'Click to answer' : 'View results'

        return (
            <div>
                <Header as="h3" >Would you rather</Header>
                <Form>
                    <Form.Field>
                        <Radio 
                            value="optionOne"
                            name="radioGroup"
                            label={question.optionOne.text}
                        />
                        <br />
                        <p>or ...</p>
                    </Form.Field>
                    <Form.Field>
                        <Link to={`/questions/${question.id}`}>
                            <Button 
                                color="teal"
                                size="tiny"
                                content={buttonLabel}
                            />
                        </Link>
                        
                    </Form.Field>
                </Form>
            </div>
        )
}

export default Preview;