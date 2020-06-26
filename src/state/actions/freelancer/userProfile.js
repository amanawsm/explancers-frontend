import axios from 'core/http/axios.js';
import * as actionTypes from '../actionTypes';
import { store } from 'react-notifications-component';
import { notificationOptions } from 'shared/app-constants';
import objectToFormData from 'object-to-formdata';

export const updateUserProfileStart = () => {
    return {
        type: actionTypes.UPDATE_USER_PROFILE_START
    }
}

export const updateUserProfileSuccess = (response) => {
    return {
        type: actionTypes.UPDATE_USER_PROFILE_SUCCESS
    }
}

export const updateUserProfileFail = (error) => {
    return {
        type: actionTypes.UPDATE_USER_PROFILE_FAIL
    }
}

export const updateUserProfile = (data) => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    };

    const options = {
        indices: true,
        nullsAsUndefineds: false,
    };

    const formData = objectToFormData(
        data,
        options
    );

    return (dispatch) => {
        dispatch(updateUserProfileStart());
        axios.patch('/users/public/profile', formData, config)
            .then((response) => {
                store.addNotification({
                    ...notificationOptions,
                    title: "Updated",
                    message: "User profile details",
                    type: "success"
                });
                dispatch(updateUserProfileSuccess(response));
            })
            .catch((error) => {
                store.addNotification({
                    ...notificationOptions,
                    title: "Failed",
                    message: "Error updating user profile details",
                    type: "danger"
                });
                dispatch(updateUserProfileSuccess(error));
            });
    };
}

export const getUserProfileStart = () => {
    return {
        type: actionTypes.GET_USER_PROFILE_START
    }
}

export const getUserProfileSuccess = (response) => {
    return {
        type: actionTypes.GET_USER_PROFILE_SUCCESS,
        payload: response
    }
}

export const getUserProfileFail = (error) => {
    return {
        type: actionTypes.GET_USER_PROFILE_FAIL
    }
}

export const getUserProfile = () => {

    return (dispatch) => {
        dispatch(getUserProfileStart());
        axios.get('/users/public/profile')
            .then((response) => {
                dispatch(getUserProfileSuccess(response.data));
            })
            .catch((error) => {
                store.addNotification({
                    ...notificationOptions,
                    title: "Failed",
                    message: "Error fetching user profile details",
                    type: "danger"
                });
                dispatch(getUserProfileSuccess(error));
            });
    };
}