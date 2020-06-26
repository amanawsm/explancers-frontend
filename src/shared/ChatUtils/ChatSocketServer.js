import * as io from 'socket.io-client';
const events = require('events');

class ChatSocketServer {
    
    socket = null;
    eventEmitter = new events.EventEmitter();
    baseURL = process.env.NODE_ENV === 'development' ? "http://localhost:3002" : 'https://explancers-node-backend.herokuapp.com';

    subscriptions = [];
    // Connecting to Socket Server
    establishSocketConnection(username) {
        try {
            this.socket = io(this.baseURL, {
                query: `username=${username}`
            });
        } catch (error) {
            alert(`Something went wrong; Can't connect to socket server`);
        }
    }

    getChatList(username) {
        this.socket.emit('chat-list', {
            username: username
        });
        this.socket.on('chat-list-response', (data) => {
            this.eventEmitter.emit('chat-list-response', data);
        });
    }

    sendMessage(message) {
        this.socket.emit('add-message', message);
    }

    receiveMessage() {
        let newCallback = (data) => {            
            this.eventEmitter.emit('add-message-response', data);
        };
        this.socket.on('add-message-response', newCallback);

        this.subscriptions.push({key: 'add-message-response', callback: newCallback});
    }

    receiveMessageRemoveSocketListener() {
        this.findAndRemoveSocketEventListener('add-message-response');
    }

    makeUserOnlineRequest() {
        this.socket.emit('make-user-online-request', null);
    }
    getMessageRoomMembersActiveStatusRequest(messageRoomId) {
        this.socket.emit('room-members-active-status-request', {messageRoomId});
    }

    getMessageRoomMembersActiveStatusResponse() {
        let newCallback = (data) => {            
            this.eventEmitter.emit('room-members-active-status-response', data);
        };
        this.socket.on('room-members-active-status-response', newCallback);

        this.subscriptions.push({key: 'room-members-active-status-response', callback: newCallback});
    }

    getMessageRoomMembersActiveStatusResponseRemoveListener() {
        this.findAndRemoveSocketEventListener('room-members-active-status-response');
    }

    findAndRemoveSocketEventListener (eventKey) {
        let foundListener = this.subscriptions.find( (subscription) => subscription.key === eventKey );
        if(!foundListener)
        {
            return;
        }
        this.socket.removeListener(foundListener.key, foundListener.callback);
        this.subscriptions = this.subscriptions.filter( (subscription) => subscription.key !== eventKey );
    }

    logout(username) {
        this.socket.emit('logout', username);
        this.socket.on('logout-response', (data) => {
            this.eventEmitter.emit('logout-response', data);
        });
    }

    //  Chat Room for Job Proposal Creation
    createRoomForJobProposal (fromUserName, forJobProposal, message) {
      this.socket.emit('create-room-for-job-proposal', { fromUserName, forJobProposal, message });

      this.socket.on('create-room-for-job-proposal-success', (data) => {
        this.eventEmitter.emit('create-room-for-job-proposal-success', data);
      });

      this.socket.on('create-room-for-job-proposal-fail', (data) => {
        this.eventEmitter.emit('create-room-for-job-proposal-fail', data);
      });
    }

}

export default new ChatSocketServer()