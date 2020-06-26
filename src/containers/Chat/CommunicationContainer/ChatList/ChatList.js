import React, { Component } from 'react';
import ChatSocketServer from 'shared/ChatUtils/ChatSocketServer';
import classes from "./ChatList.module.css";
import { Row, Col } from 'reactstrap';
import ChatListItem from "./ChatListItem/ChatListItem";
import Header from './Header/Header';
import SearchBar from './SearchBar/SearchBar';

class ChatList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedRoomId: null,
      chatListRooms: []
    }
  }

  componentDidMount() {
    const username = this.props.username;
    ChatSocketServer.getChatList(username);
    ChatSocketServer.eventEmitter.on('chat-list-response', this.createchatListRooms);
  }

  componentWillUnmount() {
    ChatSocketServer.eventEmitter.removeListener('chat-list-response', this.createchatListRooms);
  }

  createchatListRooms = (chatListResponse) => {
    // console.log('Chat List Response', chatListResponse);

    if (!chatListResponse.error) {
      let chatListRooms = this.state.chatListRooms;

      if (chatListResponse.singleUser) {
        if (chatListRooms.length > 0) {
          chatListRooms = chatListRooms.filter(function (obj) {
            return obj.roomId !== chatListResponse.chatList[0].roomId;
          });
        }
        /* Adding new online user into chat list array */
        chatListRooms = [...chatListRooms, ...chatListResponse.chatList];
      } else if (chatListResponse.userDisconnected) {
        const loggedOutUser = chatListRooms.findIndex((obj) => obj.id === chatListResponse.userid);
        if (loggedOutUser >= 0) {
          chatListRooms[loggedOutUser].online = 'N';
        }
      } else {
        /* Updating entire chat list if user logs in. */
        chatListRooms = chatListResponse.chatList;
      }
      if (chatListRooms.length > 0) {
        this.selectedRoom(chatListRooms[0]);
      }

      this.setState({
        chatListRooms: chatListRooms
      });
    } else {
      console.log(`Unable to load Chat list, Redirecting to Login.`);
    }
    this.setState({
      loading: false
    });
  }

  selectedRoom = (room) => {
    this.setState({
      selectedRoomId: room.roomId
    });
    this.props.updateSelectedMessageRoom(room);
  }

  render() {

    let chatListRooms = null;
    if (this.state.chatListRooms) {
      chatListRooms = this.state.chatListRooms.map((room, roomIndex) =>
        <ChatListItem
          currentActiveUsername={this.props.username}
          key={roomIndex}
          active={room.roomId === this.state.selectedRoomId}
          messageRoom={room}
          onSelectRoom={() => this.selectedRoom(room)}
        ></ChatListItem>
      );
    }

    let chatListRoomsWrapperComponents = (
      <div className={classes.ChatListRoomsWrapper}>
        {chatListRooms}
      </div>
    );

    if (!this.state.chatListRooms || this.state.chatListRooms.length === 0) {
      chatListRoomsWrapperComponents = null;
    }

    if (this.state.loading || this.state.chatListRooms.length === 0) {
      
      let processingChatList = ['alert'];
      let alertMessage = 'No Rooms Available to chat.';

      if (this.state.loading) {
        processingChatList.push('alert-info');
        alertMessage = 'Loading your chat list.';
      }
      if (this.state.chatListRooms.length > 0) {
        processingChatList.push(classes.VisibilityHidden);
        alertMessage = null;
      }
      chatListRoomsWrapperComponents = (
        <div className={processingChatList.join(' ')}>
          {alertMessage}
        </div>
      );
    }

    return (
      <>
        {/* Header */}
        <Header></Header>

        {/* Search Bar */}
        <SearchBar></SearchBar>

        <Row className={classes.SideBar}>
          <Col xs="12" sm="12" md="12" className={classes.SideBarColWrapper}>
            {chatListRoomsWrapperComponents}
          </Col>
        </Row>

      </>
    );
  }
}

export default ChatList;
