import React, { Component } from 'react';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import './App.scss';
import { connect } from 'react-redux';
import AppRoutes from './AppRoutes.js';
import { authCheckState } from 'state/actions/index';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { logout } from 'state/actions/index';

import ChatSocketServer from 'shared/ChatUtils/ChatSocketServer';
import ChatHttpServer from 'shared/ChatUtils/ChatHttpServer';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {

  state = {
    userHasProfileAvatar: true
  }

  toggleUserHasProfileAvatar = () => {
    this.setState({ userHasProfileAvatar: !this.state.userHasProfileAvatar });
  }

  async componentDidMount() {
    this.props.onCheckAuthStatus();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated === false && this.props.isAuthenticated === true) {
      this.establishMessageServerConnection();
    }
  }

  componentWillUnmount() {
  }

  establishMessageServerConnection = async () => {
    console.log('Establishing Message Server Connection');

    try {

      const username = await ChatHttpServer.getUserName();
      if (!username) {
        return;
      }
      const response = await ChatHttpServer.userSessionCheck(username);

      if (response.error) {
        // this.props.history.push(`/`);
        console.log('Network Error For Chat Connection');
      } else {

        this.setState({
          username: response.username
        });
        ChatSocketServer.establishSocketConnection(username);
        ChatSocketServer.makeUserOnlineRequest();
      }

    } catch (error) {
      // this.props.history.push("/");
      console.log('Socket Error For Chat Connection');
    }
  }

  render() {
    return (
      // <HashRouter>
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <ReactNotification />
          <AppRoutes {...this.props} {...this.state}
            toggleUserHasProfileAvatar={this.toggleUserHasProfileAvatar}>
          </AppRoutes>
        </React.Suspense>
      </BrowserRouter>
      // </HashRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadingAuth: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    accountType: state.auth.accountType,
    userName: state.auth.userName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthStatus: () => dispatch(authCheckState()),
    onLogout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
