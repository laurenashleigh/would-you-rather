import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthUser } from '../actions/authUser';
import {
    Container, Menu, Image, Button
} from 'semantic-ui-react';
import users from '../utils/_DATA';

export class Nav extends Component {
    handleLogout = e => {
        e.preventDefault();
        this.props.setAuthUser(null);
    }
    render() {
        const { authUser, users } = this.props;

        return (
            <Container>
                <Menu secondary>
                    <Menu.Item name="home" as={NavLink} to="/" exact />
                    <Menu.Item name="new question" as={NavLink} to="/new" />
                    <Menu.Item name="leaderboard" as={NavLink} to="/leaderboard" />
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <span>
                                <Image src={users[authUser].avatarURL} avatar spaced="right" verticalAlign="bottom"/>
                                Hello {users[authUser].name}
                            </span>
                        </Menu.Item>
                        <Menu.Item>
                            <Button 
                                content="Log Out"
                                labelPosition="right"
                                basic
                                compact
                                icon="log out"
                                size="mini"
                                onClick={this.handleLogout}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Container>
        )
    }
}

function mapStateToProps({ users, authUser }) {
    return {
      authUser,
      users
    };
  }
  
  export default connect(
    mapStateToProps,
    { setAuthUser }
  )(Nav);