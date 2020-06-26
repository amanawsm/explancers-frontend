import axios from 'core/http/axios.js';
import * as actionTypes from './actionTypes';
import { store } from 'react-notifications-component';
import { notificationOptions } from 'shared/app-constants';

// Update user personal profile details
export const updateUserPersonalStart = () => {
    return {
        type: actionTypes.UPDATE_USER_PERSONAL_START
    }
}

export const updateUserPersonalSuccess = (response) => {
    return {
        type: actionTypes.UPDATE_USER_PERSONAL_SUCCESS
    }
}

export const updateUserPersonalFail = (error) => {
    return {
        type: actionTypes.UPDATE_USER_PERSONAL_FAIL
    }
}

export const updateUserPersonal = (data) => {    
    return (dispatch) => {
        dispatch(updateUserPersonalStart());
        axios.patch('/users' , data)
        .then((response) => {
            store.addNotification({
                ...notificationOptions,
                title: "Updated",
                message: "User personal details",
                type: "success"
            });
            dispatch(updateUserPersonalSuccess(response));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Updating user personal details",
                type: "danger"
            });
            dispatch(updateUserPersonalFail(error));
        });
    };
}

// Get user personal profile details
export const getUserPersonalStart = () => {
    return {
        type: actionTypes.GET_USER_PERSONAL_START
    }
}

export const getUserPersonalSuccess = (response) => {
    return {
        type: actionTypes.GET_USER_PERSONAL_SUCCESS,
        payload: response
    }
}

export const getUserPersonalFail = (error) => {
    return {
        type: actionTypes.GET_USER_PERSONAL_FAIL
    }
}

export const getUserPersonal = () => {
        
    return (dispatch) => {
        dispatch(getUserPersonalStart());
        axios.get('/user/me')
        .then((response) => {
            dispatch(getUserPersonalSuccess(response.data.user));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Fetching user personal details",
                type: "danger"
            });
            dispatch(getUserPersonalFail(error));
        });
    };
}

// Update user profile avatar
export const updateUserProfileAvatarStart = () => {
    return {
        type: actionTypes.UPDATE_USER_PROFILE_PICTURE_START
    }
}

export const updateUserProfileAvatarSuccess = (response) => {
    return {
        type: actionTypes.UPDATE_USER_PROFILE_PICTURE_SUCCESS,
        payload: response
    }
}

export const updateUserProfileAvatarFail = (error) => {
    return {
        type: actionTypes.UPDATE_USER_PROFILE_PICTURE_FAIL
    }
}

export const updateUserProfileAvatar = (file) => {
        
    return (dispatch) => {
        dispatch(updateUserProfileAvatarStart());
        
        let data = { avatar: file };
        axios.post('/users/me/avatar', data)
        .then((response) => {
            dispatch(updateUserProfileAvatarSuccess(response.data.user));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Uploading user profile avatar",
                type: "danger"
            });
            dispatch(updateUserProfileAvatarFail(error));
        });
    };
}