import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "../App.css"
import { connect } from 'react-redux';
import { setAuthUser } from '../actions/authUser';
import {
    Container, Menu, Image, Button
} from 'semantic-ui-react';

export class Nav extends Component {
    handleLogout = e => {
        e.preventDefault();
        this.props.setAuthUser(null);
    }
    render() {
        const { authUser, users } = this.props;

        return (
            <Container className="nav">
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
                                onClick={this.handleLogout}
                                labelPosition="right"
                                icon="hand point right outline"
                                basic
                                size="mini"
                                color="teal"
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    const { users, authUser } = state;
    return {
      authUser,
      users
    };
  }
  
  export default connect(
    mapStateToProps,
    { setAuthUser }
  )(Nav);