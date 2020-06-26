import axios from 'core/http/axios.js';
import * as actionTypes from './actionTypes';
import { store } from 'react-notifications-component';
import { notificationOptions } from 'shared/app-constants';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    }
}

export const signupSuccess = () => {
    return {
        type: actionTypes.SIGNUP_SUCCESS
    };
}

export const signupFailure = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error
    }
}

export const signup = (signUpData) => {

    return (dispatch, getState) => {

        dispatch(signupStart());

        axios.post('/users', signUpData)
            .then((response) => {
                // localStorage.setItem('token', response.data.token);
                // localStorage.setItem('username', response.data.user.username);
                store.addNotification({
                    ...notificationOptions,
                    title: "Account Registerd",
                    message: "Activate your account through the activation link sent to your Email and then Login"
                });
                dispatch(signupSuccess());
            })
            .catch((error) => {
                store.addNotification({
                    ...notificationOptions,
                    title: "Unable to Register",
                    message: "Username or Email is already registered",
                    type: "danger"
                });
                dispatch(signupFailure(error));
            });
    };
};
