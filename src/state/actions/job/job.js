import axios from 'core/http/axios.js';
import * as actionTypes from '../actionTypes';
import { store } from 'react-notifications-component';
import { notificationOptions } from 'shared/app-constants';

// GET CLIENT COMPLETE PROFILE
export const postJobStart = () => {
    return {
        type: actionTypes.POST_CLIENT_JOB_START
    }
}

export const postJobSuccess = (data) => {
    return {
        type: actionTypes.POST_CLIENT_JOB_SUCCESS,
        payload: data
    }
}

export const postJobFail = () => {
    return {
        type: actionTypes.POST_CLIENT_JOB_FAIL
    }
}

export const postJob = (jobData) => {
    return (dispatch, getState) => {
        dispatch(postJobStart());

        axios.post('/jobs', jobData)
        .then((response) => {
            store.addNotification({
                ...notificationOptions,
                title: "Success",
                message: "Job Posted Successfully",
                type: "success"
            });
            dispatch(postJobSuccess(response.data));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Adding Job Post",
                type: "danger"
            });
            dispatch(postJobFail(error));
        });
    }
}

// GET CLIENT COMPLETE PROFILE
export const getFreelanceMarketJobsStart = () => {
    return {
        type: actionTypes.GET_FREELANCE_MARKET_JOBS_START
    }
}

export const getFreelanceMarketJobsSuccess = (data) => {
    return {
        type: actionTypes.GET_FREELANCE_MARKET_JOBS_SUCCESS,
        payload: data
    }
}

export const getFreelanceMarketJobsFail = () => {
    return {
        type: actionTypes.GET_FREELANCE_MARKET_JOBS_FAIL
    }
}

export const getFreelanceMarketJobs = (freelanceJobMarketSearchCriteria, paginationFilter) => {

    let searchData = {
        searchCriteria: {...freelanceJobMarketSearchCriteria},
        paginationCriteria: {...paginationFilter}
    };

    return (dispatch, getState) => {
        dispatch(getFreelanceMarketJobsStart());

        axios.post('/jobs/freelancer/market', searchData)
        .then((response) => {
            dispatch(getFreelanceMarketJobsSuccess(response.data));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Getting Market Jobs",
                type: "danger"
            });
            dispatch(getFreelanceMarketJobsFail(error));
        });
    }
}

// GET CLIENT JOBS REPORT
export const getClientJobsCreatedReportStart = () => {
    return {
        type: actionTypes.GET_CLIENT_JOBS_CREATED_REPORT_START
    }
}

export const getClientJobsCreatedReportSuccess = (data) => {
    return {
        type: actionTypes.GET_CLIENT_JOBS_CREATED_REPORT_SUCCESS,
        payload: data
    }
}

export const getClientJobsCreatedReportFail = () => {
    return {
        type: actionTypes.GET_CLIENT_JOBS_CREATED_REPORT_FAIL
    }
}

export const getClientJobsCreatedReport = (searchCriteria, paginationFilter) => {

    let searchData = {
        searchCriteria: {...searchCriteria},
        paginationCriteria: {...paginationFilter}
    };

    return (dispatch, getState) => {
        dispatch(getClientJobsCreatedReportStart());

        axios.post('/jobs/client/report', searchData)
        .then((response) => {
            dispatch(getClientJobsCreatedReportSuccess(response.data));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Getting Client Jobs Report",
                type: "danger"
            });
            dispatch(getClientJobsCreatedReportFail(error));
        });
    }
}

// GET JOB TO SUBMIT PROPOSAL
export const getJobDataToSubmitProposalStart = () => {
    return {
        type: actionTypes.GET_JOB_DATA_TO_SUBMIT_PROPOSAL_START
    }
}

export const getJobDataToSubmitProposalSuccess = (data) => {
    return {
        type: actionTypes.GET_JOB_DATA_TO_SUBMIT_PROPOSAL_SUCCESS,
        payload: data
    }
}

export const getJobDataToSubmitProposalFail = () => {
    return {
        type: actionTypes.GET_JOB_DATA_TO_SUBMIT_PROPOSAL_FAIL
    }
}

export const getJobDataToSubmitProposal = (jobId) => {
    return (dispatch, getState) => {
        dispatch(getJobDataToSubmitProposalStart());

        axios.get('/jobs/submit/' + jobId)
        .then((response) => {
            dispatch(getJobDataToSubmitProposalSuccess(response.data));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Getting Job to Submit",
                type: "danger"
            });
            dispatch(getJobDataToSubmitProposalFail(error));
        });
    }
}

// GET PROPOSALS RECEIVED FOR JOB
export const getProposalsReceivedForJobStart = () => {
    return {
        type: actionTypes.GET_PROPOSALS_RECEIVED_FOR_JOB_LIST_START
    }
}

export const getProposalsReceivedForJobSuccess = (data) => {
    return {
        type: actionTypes.GET_PROPOSALS_RECEIVED_FOR_JOB_LIST_SUCCESS,
        payload: data
    }
}

export const getProposalsReceivedForJobFail = () => {
    return {
        type: actionTypes.GET_PROPOSALS_RECEIVED_FOR_JOB_LIST_FAIL
    }
}

export const getProposalsReceivedForJob = (jobId) => {
    return (dispatch, getState) => {
        dispatch(getProposalsReceivedForJobStart());

        axios.get('/jobs/proposals/' + jobId)
        .then((response) => {
            dispatch(getProposalsReceivedForJobSuccess(response.data));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Getting Proposals for Job",
                type: "danger"
            });
            dispatch(getProposalsReceivedForJobFail(error));
        });
    }
}

// GET FULL JOB POST FOR FREELANCER
export const getFullJobPostForFreelancerStart = () => {
    return {
        type: actionTypes.GET_FULL_JOB_POST_FOR_FREELANCER_START
    }
}

export const getFullJobPostForFreelancerSuccess = (data) => {
    return {
        type: actionTypes.GET_FULL_JOB_POST_FOR_FREELANCER_SUCCESS,
        payload: data
    }
}

export const getFullJobPostForFreelancerFail = () => {
    return {
        type: actionTypes.GET_FULL_JOB_POST_FOR_FREELANCER_FAIL
    }
}

export const getFullJobPostForFreelancer = (jobId) => {
    return (dispatch, getState) => {
        dispatch(getFullJobPostForFreelancerStart());

        axios.get('/jobs/' + jobId)
        .then((response) => {
            dispatch(getFullJobPostForFreelancerSuccess(response.data));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Getting Full Job For Freelancer",
                type: "danger"
            });
            dispatch(getFullJobPostForFreelancerFail(error));
        });
    }
}

// GET FULL JOB POST FOR CLIENT
export const getFullJobPostForClientStart = () => {
    return {
        type: actionTypes.GET_FULL_JOB_POST_FOR_CLIENT_START
    }
}

export const getFullJobPostForClientSuccess = (data) => {
    return {
        type: actionTypes.GET_FULL_JOB_POST_FOR_CLIENT_SUCCESS,
        payload: data
    }
}

export const getFullJobPostForClientFail = () => {
    return {
        type: actionTypes.GET_FULL_JOB_POST_FOR_CLIENT_FAIL
    }
}

export const getFullJobPostForClient = (jobId) => {
    return (dispatch, getState) => {
        dispatch(getFullJobPostForClientStart());

        axios.get('/jobs/' + jobId)
        .then((response) => {
            dispatch(getFullJobPostForClientSuccess(response.data));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Getting Full Job For Client",
                type: "danger"
            });
            dispatch(getFullJobPostForClientFail(error));
        });
    }
}