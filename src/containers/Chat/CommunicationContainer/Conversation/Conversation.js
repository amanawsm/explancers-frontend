import React, { Component, Fragment } from 'react';

import ChatSocketServer from 'shared/ChatUtils/ChatSocketServer';
import ChatHttpServer from 'shared/ChatUtils/ChatHttpServer';

import classes from './Conversation.module.css';
import { Row, Col } from 'reactstrap';
import MessageBoxUI from './MessageBoxUI/MessageBoxUI';
import MessageWriterUI from './MessageWriterUI/MessageWriterUI';
import NotificationSound from './NotificationSounds/NotificationSounds';

class Conversation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageLoading: true,
      conversations: [],
      selectedMessageRoom: null,
      messageValue: '',
      playNotificationSound: false,
      selectedMessageRoomMembersActiveStatus: [],
      showFileUploadDialog: false
    }
    this.messageContainer = React.createRef();
  }

  componentDidMount() {
    ChatSocketServer.receiveMessage();
    ChatSocketServer.eventEmitter.on('add-message-response', this.receiveSocketMessages);

    ChatSocketServer.getMessageRoomMembersActiveStatusResponse();
    ChatSocketServer.eventEmitter.on('room-members-active-status-response', this.receiveMessageRoomMembersActiveStatus);
    ChatSocketServer.makeUserOnlineRequest();
  }

  componentWillUnmount() {
    ChatSocketServer.receiveMessageRemoveSocketListener();
    ChatSocketServer.eventEmitter.removeListener('add-message-response', this.receiveSocketMessages);

    ChatSocketServer.getMessageRoomMembersActiveStatusResponseRemoveListener();
    ChatSocketServer.eventEmitter.removeListener('room-members-active-status-response', this.receiveMessageRoomMembersActiveStatus);
  }

  componentDidUpdate(prevProps) {
    const oldMessageRoom = prevProps.newSelectedMessageRoom
    const newMessageRoom = this.props.newSelectedMessageRoom;

    if ((newMessageRoom !== null && oldMessageRoom === null) ||
      (newMessageRoom && oldMessageRoom && newMessageRoom.roomId !== oldMessageRoom.roomId)) {
      this.getMessages();
      // Get Message Room Members Avtive Status
      const { newSelectedMessageRoom } = this.props;
      ChatSocketServer.getMessageRoomMembersActiveStatusRequest(newSelectedMessageRoom.roomId);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (state.selectedMessageRoom === null || state.selectedMessageRoom.roomId !== props.newSelectedMessageRoom.roomId) {
      return {
        selectedMessageRoom: props.newSelectedMessageRoom
      };
    }
    return null;
  }

  receiveMessageRoomMembersActiveStatus = (membersActiveStatusSocketResponse) => {
    if (!membersActiveStatusSocketResponse.error) {
      if (membersActiveStatusSocketResponse.singleMember) {

        let messageRoomMembersActiveStatus = [...this.state.selectedMessageRoomMembersActiveStatus];

        for (let i = 0; i < messageRoomMembersActiveStatus.length; i++) {
          if (messageRoomMembersActiveStatus[i].username === membersActiveStatusSocketResponse.message.username) {
            messageRoomMembersActiveStatus[i] = { ...membersActiveStatusSocketResponse.message };
          }
        }

        this.setState({
          selectedMessageRoomMembersActiveStatus: messageRoomMembersActiveStatus
        });
      } else {
        this.setState({
          selectedMessageRoomMembersActiveStatus: [...membersActiveStatusSocketResponse.message]
        });
      }
    }
  }

  receiveSocketMessages = (socketResponse) => {

    const { selectedMessageRoom } = this.state;

    if (selectedMessageRoom !== null && selectedMessageRoom.roomId === socketResponse.messageRoom) {
      this.setState({
        conversations: [...this.state.conversations, socketResponse],
        playNotificationSound: true
      });
      this.scrollMessageContainer();

    }
  }

  resetNotificationSoundAlert = () => {
    this.setState({ playNotificationSound: false });
  }

  getMessages = async () => {
    try {
      const { username, newSelectedMessageRoom } = this.props;
      const messageResponse = await ChatHttpServer.getMessages(username, newSelectedMessageRoom.roomId);
      if (!messageResponse.error) {
        this.setState({
          conversations: messageResponse.messages,
        });
        this.scrollMessageContainer();
      } else {
        console.log('Unable to fetch messages');
      }
      this.setState({
        messageLoading: false
      });
    } catch (error) {
      this.setState({
        messageLoading: false
      });
    }
  }

  inputChangedHandler = (event) => {
    this.setState({ messageValue: event.target.value });
  }

  sendMessage = (event) => {

    ChatSocketServer.makeUserOnlineRequest();

    if ((event.key === 'Enter' || !event.key) && !event.shiftKey) {
      event.preventDefault();
      const message = this.state.messageValue;
      const { username, newSelectedMessageRoom } = this.props;

      if (message === '' || message === undefined || message === null) {
        console.log(`Message can't be empty.`);
      } else if (username === '') {
        this.router.navigate(['/']);
      } else if (newSelectedMessageRoom === undefined) {
        console.log(`Select a Room to chat.`);
      } else {
        this.sendAndUpdateMessages({
          fromUserName: username,
          message: (message).trim(),
          toMessageRoomId: newSelectedMessageRoom.roomId,
          sender: {
            username: username
          },
          type: "string"
        });
        this.setState({ messageValue: '' });
        event.target.value = '';
      }
    }
  }

  sendAndUpdateMessages(message) {
    try {
      ChatSocketServer.sendMessage(message);
      // this.setState({
      //   conversations: [...this.state.conversations, message]
      // });
      this.scrollMessageContainer();
    } catch (error) {
      console.log(`Can't send your message`);
    }
  }

  scrollMessageContainer() {
    if (this.messageContainer.current !== null) {
      try {
        setTimeout(() => {
          if (this.messageContainer.current)
            this.messageContainer.current.scrollTop = this.messageContainer.current.scrollHeight;
        }, 100);
      } catch (error) {
        console.warn(error);
      }
    }
  }

  getMessageUI() {
    return (
      <div className={classes["MessageThreadWrapper"]}>
        <div ref={this.messageContainer} className={classes["MessageThread"]}>
          {
            this.state.conversations.map((conversation, index) => {

              const user = this.state.selectedMessageRoomMembersActiveStatus
                .find((user) => user.username === conversation.sender.username);

              let isUserOnline = false;
              if (user) {
                isUserOnline = user.online === 'Y';
              }

              return (<Fragment key={index}>
                <MessageBoxUI
                  conversation={conversation}
                  isUserOnline={isUserOnline}
                  isSelfMessage={conversation.sender.username === this.props.username}
                ></MessageBoxUI>
              </Fragment>
              )
            })
          }
        </div>
      </div>
    )
  }

  getInitiateConversationUI() {
    if (this.props.newSelectedMessageRoom !== null) {
      return (
        <div className={classes["MessageThread StartChattingBanner"]}>
          <p className={classes["heading"]}>
            You haven 't chatted with {this.props.newSelectedMessageRoom.username} in a while,
            <span className={classes["sub-heading"]}> Say Hi.</span>
          </p>
        </div>
      )
    }
  }

  toggleFileUploadModal = () => {
    this.setState({showFileUploadDialog: !this.state.showFileUploadDialog});
  }

  uploadFile = async(file, metaData) => {
    const { username, newSelectedMessageRoom } = this.props;
    const formData = new FormData();

    formData.append("messageInfo", JSON.stringify({
      fromUserName: username,      
      toMessageRoomId: newSelectedMessageRoom.roomId,
      sender: {
        username: username
      },
      type: "file"
    }))
    formData.append("file", file);

    const fileUploadResponse = await ChatHttpServer.sendFileMessage(formData);
    // console.log("File Upload Response", fileUploadResponse);    
  }

  render() {
    const { messageLoading, selectedMessageRoom } = this.state;

    let messageOverlayContainerClasses = [classes.MessageOverlay];
    let messageWrapperClasses = [classes.MessageWrapper];

    if (!messageLoading) {
      messageOverlayContainerClasses.push(classes.VisibilityHidden);
    } else {
      messageWrapperClasses.push(classes.VisibilityHidden);
    }

    return (
      <>
        {this.state.playNotificationSound ? <NotificationSound
        resetNotificationSoundAlert={this.resetNotificationSoundAlert}>          
        </NotificationSound> : null}

        <div className={messageOverlayContainerClasses.join(' ')}>
          <h3> {selectedMessageRoom !== null && selectedMessageRoom.username ? 'Loading Messages' : ' Select a Room to chat.'}</h3>
        </div>
        <Row className={messageWrapperClasses.join(' ')}>
          <Col md="12" className={classes["MessageContainer"]}>
            {/* <div className={classes["opposite-user"]}>
              Chatting with {this.props.newSelectedMessageRoom !== null ? this.props.newSelectedMessageRoom.username : '----'}
            </div> */}
            {this.state.conversations.length > 0 ? this.getMessageUI() : this.getInitiateConversationUI()}
          </Col>

          <Col md="12" className={classes.MessageTyper}>

            <MessageWriterUI
              messageValue={this.state.messageValue}
              inputChangedHandler={this.inputChangedHandler}
              sendMessageHandler={this.sendMessage}
              showFileUploadDialog={this.state.showFileUploadDialog}
              toggleFileUploadModal={this.toggleFileUploadModal}
              uploadFile={this.uploadFile}
            ></MessageWriterUI>

          </Col>
        </Row>
      </>
    );
  }
}

export default Conversation;
