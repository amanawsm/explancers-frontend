import axios from 'core/http/axios.js';
import * as actionTypes from '../actionTypes';
import { store } from 'react-notifications-component';
import { notificationOptions } from 'shared/app-constants';

// SUBMIT JOB PROPOSAL
export const submitProposalForJobStart = () => {
    return {
        type: actionTypes.SUBMIT_PROPOSAL_FOR_JOB_START
    }
}

export const submitProposalForJobSuccess = (data) => {
    return {
        type: actionTypes.SUBMIT_PROPOSAL_FOR_JOB_SUCCESS,
        payload: data
    }
}

export const submitProposalForJobFail = () => {
    return {
        type: actionTypes.SUBMIT_PROPOSAL_FOR_JOB_FAIL
    }
}

export const submitProposalForJob = (jobData) => {
    return (dispatch, getState) => {
        dispatch(submitProposalForJobStart());

        axios.post('/proposal/job', jobData)
        .then((response) => {
            store.addNotification({
                ...notificationOptions,
                title: "Success",
                message: "Job Posted Successfully",
                type: "success"
            });
            dispatch(submitProposalForJobSuccess(response.data));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Sending Job Proposal",
                type: "danger"
            });
            dispatch(submitProposalForJobFail(error));
        });
    }
}

// GET FULL JOB PROPOSAL RECEIVED
export const getFullJobProposalReceivedStart = () => {
    return {
        type: actionTypes.GET_FULL_PROPOSAL_RECEIVED_FOR_JOB_START
    }
}

export const getFullJobProposalReceivedSuccess = (data) => {
    return {
        type: actionTypes.GET_FULL_PROPOSAL_RECEIVED_FOR_JOB_SUCCESS,
        payload: data
    }
}

export const getFullJobProposalReceivedFail = () => {
    return {
        type: actionTypes.GET_FULL_PROPOSAL_RECEIVED_FOR_JOB_FAIL
    }
}

export const getFullJobProposalReceived = (proposalId) => {
    return (dispatch, getState) => {
        dispatch(getFullJobProposalReceivedStart());

        axios.get('/proposal/' + proposalId)
        .then((response) => {
            dispatch(getFullJobProposalReceivedSuccess(response.data));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Getting Job Proposal",
                type: "danger"
            });
            dispatch(getFullJobProposalReceivedFail(error));
        });
    }
}

// GET JOBPROPOSALS SUBMITED BY FREELANCER
export const getJobProposalsSubmittedByFreelancersStart = () => {
    return {
        type: actionTypes.GET_JOBPROPOSALS_SUBMITTED_BY_FERELANCER_START
    }
}

export const getJobProposalsSubmittedByFreelancersSuccess = (data) => {
    return {
        type: actionTypes.GET_JOBPROPOSALS_SUBMITTED_BY_FERELANCER_SUCCESS,
        payload: data
    }
}

export const getJobProposalsSubmittedByFreelancersFail = () => {
    return {
        type: actionTypes.GET_JOBPROPOSALS_SUBMITTED_BY_FERELANCER_FAIL
    }
}

export const getJobProposalsSubmittedByFreelancers = (searchCriteria, paginationFilter) => {
    return (dispatch, getState) => {
        dispatch(getJobProposalsSubmittedByFreelancersStart());

        let searchData = {
            searchCriteria: {...searchCriteria},
            paginationCriteria: {...paginationFilter}
        };

        axios.post('/proposals', searchData)
        .then((response) => {
            dispatch(getJobProposalsSubmittedByFreelancersSuccess(response.data));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Getting Job Proposals",
                type: "danger"
            });
            dispatch(getJobProposalsSubmittedByFreelancersFail(error));
        });
    }
}

// SINGLE JOBPROPOSAL WITH JOB SUBMITTED BY FERELANCER
export const getFullSubmittedProposalAndJobForFreelancerStart = () => {
    return {
        type: actionTypes.GET_FULL_JOB_PROPOSAL_AND_JOB_FOR_FERELANCER_START
    }
}

export const getFullSubmittedProposalAndJobForFreelancerSuccess = (data) => {
    return {
        type: actionTypes.GET_FULL_JOB_PROPOSAL_AND_JOB_FOR_FERELANCER_SUCCESS,
        payload: data
    }
}

export const getFullSubmittedProposalAndJobForFreelancerFail = () => {
    return {
        type: actionTypes.GET_FULL_JOB_PROPOSAL_AND_JOB_FOR_FERELANCER_FAIL
    }
}

export const getFullSubmittedProposalAndJobForFreelancer = (proposalId) => {
    return (dispatch, getState) => {
        dispatch(getFullSubmittedProposalAndJobForFreelancerStart());

        axios.get('/proposals/' + proposalId + '/freelancer')
        .then((response) => {
            dispatch(getFullSubmittedProposalAndJobForFreelancerSuccess(response.data));
        })
        .catch((error) => {
            store.addNotification({
                ...notificationOptions,
                title: "Failed",
                message: "Getting Job Proposal",
                type: "danger"
            });
            dispatch(getFullSubmittedProposalAndJobForFreelancerFail(error));
        });
    }
}
