import React, { Component, Fragment } from 'react';
import {
    Image,
    Grid,
    Header,
    Button,
    Form,
  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setAuthUser } from '../actions/authUser';

export class Login extends Component {
    state = {
        value: '',
    };

    onChange = (e, { value }) => {
        this.setState({ value });
    };
    handleSubmit = e => {
        e.preventDefault();
        const { setAuthUser } = this.props;
        const authUser = this.state.value;

        new Promise((res, rej) => {
            setTimeout(() => res(), 500);
        }).then(() => setAuthUser(authUser));
    };
    dropdownList = () => {
        const { users } = this.props;
        return users.map(user => ({
            key: user.id,
            value: user.id,
            text: user.name,
            image: { avatar: true, src: user.avatarURL }
        }));
    };

    render() {
        const { value } = this.state;
        const disabled = value === '' ? true : false;
        return (
            
            <Fragment>
                   <Header as="h3" block color="teal" textAlign="center">Welcome to the game!</Header>
                   <Header attached as="h4">Pick an avatar to continue</Header>
                <div>
                    <Grid padded textAlign="center">
                        <Grid.Row>
                            <Grid.Column>
                                <Image src="./avatar-grid.jpg" size="medium" centered />
                                <br />
                                <Form>
                                    <Header as="h2" color="teal" block >
                                        Login
                                    </Header>
                                    <Form.Dropdown
                                        placeholder="Select a User"
                                        scrolling
                                        fluid
                                        selection
                                        options={this.dropdownList()}
                                        value={value}
                                        onChange={this.onChange}
                                        required
                                    />
                                    <Button onClick={this.handleSubmit} content="Login" disabled={disabled} positive fluid color="teal"/>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Fragment>
            
        )
    }
}
  
  const mapStateToProps = (state) => {
      const { users } = state;
    return {
      users: Object.values(users)
    };
  }
  
export default connect(
    mapStateToProps,
    { setAuthUser }
)(Login);