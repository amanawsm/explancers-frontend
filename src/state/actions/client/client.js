import axios from 'core/http/axios.js';
import * as actionTypes from '../actionTypes';
import { store } from 'react-notifications-component';
import { notificationOptions } from 'shared/app-constants';

// UPDATE CLIENT PUBLIC PROFILE
export const updateClientPublicProfileStart = () => {
    return {
        type: actionTypes.UPDATE_CLIENT_PUBLIC_PROFILE_START
    }
}

export const updateClientPublicProfileSuccess = (response) => {
    return {
        type: actionTypes.UPDATE_CLIENT_PUBLIC_PROFILE_SUCCESS
    }
}

export const updateClientPublicProfileFail = (error) => {
    return {
        type: actionTypes.UPDATE_CLIENT_PUBLIC_PROFILE_FAIL
    }
}

export const updateClientPublicProfile = (data) => {
    return (dispatch) => {
        dispatch(updateClientPublicProfileStart());
        axios.patch('/client/public/profile', data)
            .then((response) => {
                store.addNotification({
                    ...notificationOptions,
                    title: "Updated",
                    message: "Client public profile details",
                    type: "success"
                });
                dispatch(updateClientPublicProfileSuccess(response));
            })
            .catch((error) => {
                store.addNotification({
                    ...notificationOptions,
                    title: "Failed",
                    message: "Error updating client public profile details",
                    type: "danger"
                });
                dispatch(updateClientPublicProfileFail(error));
            });
    };
}

// GET CLIENT PUBLIC PROFILE
export const getClientPublicProfileStart = () => {
    return {
        type: actionTypes.GET_CLIENT_PUBLIC_PROFILE_START
    }
}

export const getClientPublicProfileSuccess = (response) => {
    return {
        type: actionTypes.GET_CLIENT_PUBLIC_PROFILE_SUCCESS,
        payload: response
    }
}

export const getClientPublicProfileFail = (error) => {
    return {
        type: actionTypes.GET_CLIENT_PUBLIC_PROFILE_FAIL
    }
}

export const getClientPublicProfile = () => {

    return (dispatch) => {
        dispatch(getClientPublicProfileStart());
        axios.get('/client/public/profile')
            .then((response) => {
                dispatch(getClientPublicProfileSuccess(response.data));
            })
            .catch((error) => {
                store.addNotification({
                    ...notificationOptions,
                    title: "Failed",
                    message: "Error fetching client public profile details",
                    type: "danger"
                });
                dispatch(getClientPublicProfileFail(error));
            });
    };
}

// GET CLIENT COMPLETE PROFILE
export const getClientProfileStart = () => {
    return {
        type: actionTypes.GET_CLIENT_PROFILE_START
    }
}

export const getClientProfileSuccess = (data) => {
    return {
        type: actionTypes.GET_CLIENT_PROFILE_SUCCESS,
        payload: data.clientProfile
    }
}

export const getClientProfileFail = () => {
    return {
        type: actionTypes.GET_CLIENT_PROFILE_FAIL
    }
}

export const getClientProfile = (username) => {
    return (dispatch, getState) => {
        dispatch(getClientProfileStart());

        axios.get('/client/' + username)
        .then((response) => {
            dispatch(getClientProfileSuccess(response.data));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Fetching client profile",
                type: "danger"
            });
            dispatch(getClientProfileFail(error));
        });
    }
}