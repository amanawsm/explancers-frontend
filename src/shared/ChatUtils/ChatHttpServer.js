import axios from 'core/http/axios.js';
 
class ChatHttpServer {

    getUserName() {
        return new Promise((resolve, reject) => {
            try {
                resolve(localStorage.getItem('username'));
            } catch (error) {
                reject(error);
            }
        });
    }

    removeLS() {
        return new Promise((resolve, reject) => {
            try {
                // localStorage.removeItem('userid');
                localStorage.removeItem('username');
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    setLS(key, value) {
        return new Promise((resolve, reject) => {
            try {
                localStorage.setItem(key, value);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    // login(userCredential) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const response = await axios.post('/login', userCredential);
    //             resolve(response.data);
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });
    // }

    checkUsernameAvailability(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post('/usernameAvailable', {
                    username: username
                });
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }
    
    // register(userCredential) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const response = await axios.post('/register', userCredential);
    //             resolve(response.data);
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });
    // }

    userSessionCheck(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post('/userSessionCheck', {
                    username: username
                });
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    getMessages(username, forMessageRoomId) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post('/getMessages', {
                    username: username,
                    forMessageRoomId: forMessageRoomId
                });
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    checkIfExistsMessageRoomForJobProposal( proposalId ) {
        return new Promise (async (resolve, reject) => {
            try {
                const response = await axios.get('message-room/exists/' + proposalId, );
                resolve(response.data);
            } catch (error) {
                reject(error.data);
            }
        });
    }

    sendFileMessage(messageFormData) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post('/sendFileMessage', messageFormData);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }
    
}

export default new ChatHttpServer();