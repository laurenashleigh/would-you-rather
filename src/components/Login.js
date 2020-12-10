import React, { Component, Fragment } from 'react';
import {
    Grid,
    Header,
    Image,
    Form,
    Dimmer,
    Loader
  } from 'semantic-ui-react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAuthUser } from '../actions/authUser';

export class Login extends Component {
    state = {
        loading: false
    };
    handleLoading = () => {
        this.setState({ loading: true })
    };

    render() {
        return (
            <Fragment>
               <Header as="h4" block color="teal" textAlign="center">
                   <Header.Content>Welcome to the game!</Header.Content>
                   <Header.Subheader>Pick an avatar to continue</Header.Subheader>
                </Header>
                <div>
                    <Grid padded textAlign="center">
                        <Grid.Row>
                            <Grid.Column>
                                {this.state.loading === true && (
                                    <Dimmer active inverted>
                                        <Loader inverted content="Loading" />
                                    </Dimmer>
                                )}
                                <Image src="./avatar-grid.jpg" size="medium" centered />
                                <br />
                                <ConnectedLoginForm onLoading={this.handleLoading}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Fragment>
            
        )
    }
}

class LoginForm extends Component {
    static propTypes = {
        onLoading: propTypes.func.isRequired
    };
    state = {
        value: ''
    };
    onChange = (e, { value }) => {
        this.setState({ value });
    };
    handleSubmit = e => {
        e.preventDefault();
        const { onLoading, setAuthUser } = this.props;
        const authUser = this.state.value;

        new Promise((res, rej) => {
            onLoading();
            setTimeout(() => res(), 500);
        }).then(() => setAuthUser(authUser));
    };
    generateDropdownData = () => {
        const { users } = this.props;

        return users.map(user => ({
            key: user.id,
            text: user.name,
            value: user.id,
            image: { avatar: true, src: user.avatarURL }
        }));
    };
    render() {
        const { value } = this.state;
        const disabled = value === '' ? true : false;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Header as="h2" color="teal" block >
                    Login
                </Header>
                <Form.Dropdown
                    placeholder="Select a User"
                    fluid
                    selection
                    scrolling
                    options={this.generateDropdownData()}
                    value={value}
                    onChange={this.onChange}
                    required
                />
                <Form.Button content="Login" disabled={disabled} positive fluid />
            </Form>
        )
    }
}

const ConnectedLoginForm = connect(
    mapStateToProps,
    { setAuthUser }
  )(LoginForm);
  
  function mapStateToProps({ users }) {
    return {
      users: Object.values(users)
    };
  }
  
  export default Login;