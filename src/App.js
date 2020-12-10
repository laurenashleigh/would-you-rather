import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import handleInitialData from '../src/actions/shared';
import { connect } from 'react-redux';
import Login from './components/Login';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import { Question } from './components/Question';


class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authUser } = this.props;
    return (
      <Router>
        <div className="App" style={{ maxWidth: 550, textAlign: "center" }}>
          {authUser === null ? (
            <Route
            render={() => (
                <Login />
            )}
          />
          ) : (
          <Fragment>
            <Nav />
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/question" component={Question} />
              </Switch>
          </Fragment>
          )}
        </div>
      </Router>
    
  );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default connect(
  mapStateToProps,
  { handleInitialData }
)(App);
