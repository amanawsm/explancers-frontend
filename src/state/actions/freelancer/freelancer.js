import axios from 'core/http/axios.js';
import * as actionTypes from '../actionTypes';
import { store } from 'react-notifications-component';
import { notificationOptions } from 'shared/app-constants';

// GET SINGLE FREELANCER PROFILE
export const getFreelancerProfileStart = () => {
    return {
        type: actionTypes.GET_FREELANCER_PROFILE_START
    }
}

export const getFreelancerProfileSuccess = (data) => {
    return {
        type: actionTypes.GET_FREELANCER_PROFILE_SUCCESS,
        payload: data.freelancerProfile
    }
}

export const getFreelancerProfileFail = () => {
    return {
        type: actionTypes.GET_FREELANCER_PROFILE_FAIL
    }
}

export const getFreelancerProfile = (username, params) => {
    return (dispatch, getState) => {
        dispatch(getFreelancerProfileStart());

        axios.get('/freelancer/' + username, {params: params})
        .then((response) => {
            dispatch(getFreelancerProfileSuccess(response.data));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Fetching freelancer profile",
                type: "danger"
            });
            dispatch(getFreelancerProfileFail(error));
        });
    }
}

// GET MARKET FREELANCERS LIST
export const getMarketFreelancersStart = () => {
    return {
        type: actionTypes.GET_MARKET_FERELANCERS_START
    }
}

export const getMarketFreelancersSuccess = (data) => {
    return {
        type: actionTypes.GET_MARKET_FERELANCERS_SUCCESS,
        payload: data
    }
}

export const getMarketFreelancersFail = () => {
    return {
        type: actionTypes.GET_MARKET_FERELANCERS_FAIL
    }
}

export const getMarketFreelancers = (searchCriteria, paginationFilter) => {

    let searchData = {
        searchCriteria: {...searchCriteria},
        paginationCriteria: {...paginationFilter}
    };

    return (dispatch, getState) => {
        dispatch(getMarketFreelancersStart());

        axios.post('/freelancer', searchData)
        .then((response) => {
            dispatch(getMarketFreelancersSuccess(response.data));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Fetching Market Freelancers",
                type: "danger"
            });
            dispatch(getMarketFreelancersFail(error));
        });
    }
}
