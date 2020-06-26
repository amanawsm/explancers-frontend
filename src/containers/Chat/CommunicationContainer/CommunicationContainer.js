import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ChatSocketServer from 'shared/ChatUtils/ChatSocketServer';
import ChatHttpServer from 'shared/ChatUtils/ChatHttpServer';
import ChatList from './ChatList/ChatList';
import Conversation from './Conversation/Conversation';
import classes from './CommunicationContainer.module.css';
import { Row, Col } from 'reactstrap';
import { Spinner } from 'components';

class CommunicationContainer extends Component {

  username = null;

  state = {
    isOverlayVisible: true,
    username: '______',
    selectedMessageRoom: null
  }

  logout = async () => {
    try {
      // await ChatHttpServer.removeLS();
      ChatSocketServer.logout({
        username: this.username
      });
      ChatSocketServer.eventEmitter.on('logout-response', (loggedOut) => {
        this.props.history.push(`/`);
      });
    } catch (error) {
      console.log(error);
      alert(' This App is Broken, we are working on it. try after some time.');
      throw error;
    }
  }

  setRenderLoadingState = (loadingState) => {
    this.setState({
      isOverlayVisible: loadingState
    });
  }

  async componentDidMount() {

    try {

      this.setRenderLoadingState(true);
      this.username = await ChatHttpServer.getUserName();
      const response = await ChatHttpServer.userSessionCheck(this.username);

      if (response.error) {
        this.props.history.push(`/`)
      } else {

        this.setState({
          username: response.username
        });
        // ChatHttpServer.setLS('username', response.username);
        // ChatSocketServer.establishSocketConnection(this.username);

      }

      this.setRenderLoadingState(false);

    } catch (error) {

      this.setRenderLoadingState(false);
      this.props.history.push(`/`);

    }
  }

  updateSelectedMessageRoom = (messageRoom) => {
    this.setState({
      selectedMessageRoom: messageRoom
    });
  }

  getChatListComponent() {
    return this.state.isOverlayVisible ? null : <ChatList username={this.username} updateSelectedMessageRoom={this.updateSelectedMessageRoom} />
  }

  getChatBoxComponent = () => {
    return this.state.isOverlayVisible ? null : <Conversation username={this.username} newSelectedMessageRoom={this.state.selectedMessageRoom} />
  }

  render() {

    let rootContent = (
      <Col md="12" className='overlay'>
        <Spinner />
      </Col>
    );

    if (!this.state.isOverlayVisible) {
      rootContent = (
        <Col md="12" role="main" className={classes['content'] + " container"} >

          <Row className={classes['chat-content']}>
            <Col sm="2" xs="2" md="2" className={[classes["chat-list-container"]].join(' ')}>
              {this.getChatListComponent()}
            </Col>
            <Col sm="10" xs="10" md="10" className={classes['message-container']}>
              {this.getChatBoxComponent()}
            </Col>
          </Row>

        </Col>
      )
    }

    return (
      <Row className={classes["MessageWrapper"]}>
        {rootContent}


        {/* <Col md="12" className={classes['app-header']}>

          <label><strong>Hello {this.state.username} </strong></label>
          <Button size="sm" className="btn-success btn-square float-right" onClick={this.logout}>Disconnect</Button>

        </Col> */}


      </Row>
    );
  }
}

export default withRouter(CommunicationContainer);
