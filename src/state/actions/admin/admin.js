import axios from 'core/http/axios.js';
import * as actionTypes from '../adminActionTypes';
import { store } from 'react-notifications-component';
import { notificationOptions } from 'shared/app-constants';

// GET MARKET FREELANCERS LIST
export const getUsersListForAdminDashboardStart = () => {
    return {
        type: actionTypes.GET_USERS_LIST_FOR_ADMIN_DASHBOARD_START
    }
}

export const getUsersListForAdminDashboardSuccess = (data) => {
    return {
        type: actionTypes.GET_USERS_LIST_FOR_ADMIN_DASHBOARD_SUCCESS,
        payload: data
    }
}

export const getUsersListForAdminDashboardFail = (error) => {
    return {
        type: actionTypes.GET_USERS_LIST_FOR_ADMIN_DASHBOARD_FAIL,
        payload: {error}
    }
}

export const getUsersListForAdminDashboard = (searchCriteria, paginationFilter) => {

    let searchData = {
        searchCriteria: {...searchCriteria},
        paginationCriteria: {...paginationFilter}
    };

    return (dispatch, getState) => {
        dispatch(getUsersListForAdminDashboardStart());

        axios.post('/api/admin/users/search', searchData)
        .then((response) => {
            dispatch(getUsersListForAdminDashboardSuccess(response.data));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Fetching Users for Admin Dashboard",
                type: "danger"
            });
            dispatch(getUsersListForAdminDashboardFail(error));
        });
    }
}
