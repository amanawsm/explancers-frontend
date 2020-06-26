import * as actionTypes from 'state/actions/actionTypes';
import {
  updateObject
} from '../../shared/utility';

const initialState = {
  user: {
    userProfile: {
      loading: false,
      formData: {}
    },
    userPersonal: {
      loading: false,
      formData: {}
    },
    avatar: {
      loading: false
    }
  },
  job: {
    list: [],
    loading: false,
    paginationDetails: {
      totalNumberOfElements: 0
    },
    postJob: {
      loading: false,
      success: null
    },
    jobToSubmitProposal: {
      loading: false,
      formData: null
    },
    submitJobProposal: {
      loading: false,
      formData: null
    },
    clientJobsReport: {
      list: [],
      loading: false,
      paginationDetails: {
        totalNumberOfElements: 0
      }
    },
    fullProposalsReceivedForJob: {
      freelancer: null,
      proposal: null,
      loading: false
    },
    proposalsReceivedForJob: {
      proposals: [],
      job: null,
      loading: false
    },
    fullJobPostForFreelancer: {
      loading: false,
      data: null
    },
    fullJobPostForClient: {
      loading: false,
      data: null
    }
  }
}

/**User Personal Details */
const getUserPersonalStart = (state, action) => {
  const updatedUserPersonal = updateObject(state.user.userPersonal, {
    loading: true
  });
  const updatedUser = updateObject(state.user, {
    userPersonal: updatedUserPersonal
  });
  const newState = updateObject(state, {
    user: updatedUser
  });
  return newState;
}

const getUserPersonalSuccess = (state, action) => {
  const newState = updateObject(state, {
    user: updateObject(state.user, {
      userPersonal: updateObject(state.user.userPersonal, {
        loading: false,
        formData: action.payload
      })
    })
  });
  return newState;
}

const getUserPersonalFail = (state, action) => {
  const newState = updateObject(state, {
    user: updateObject(state.user, {
      userPersonal: updateObject(state.user.userPersonal, {
        loading: false
      })
    })
  });
  return newState;
}

const updateUserPersonalStart = (state, action) => {
  const newState = updateObject(state, {
    user: updateObject(state.user, {
      userPersonal: updateObject(state.user.userPersonal, {
        loading: true
      })
    })
  });
  return newState;
}

const updateUserPersonalSuccess = (state, action) => {
  const newState = updateObject(state, {
    user: updateObject(state.user, {
      userPersonal: updateObject(state.user.userPersonal, {
        loading: false,
        formData: action.payload
      })
    })
  });
  return newState;
}

const updateUserPersonalFail = (state, action) => {
  const newState = updateObject(state, {
    user: updateObject(state.user, {
      userPersonal: updateObject(state.user.userPersonal, {
        loading: false
      })
    })
  });
  return newState;
}


/** User Profile */
const getUserProfileStart = (state, action) => {
  const newState = updateObject(state, {
    user: updateObject(state.user, {
      userProfile: updateObject(state.user.userProfile, {
        loading: true
      })
    })
  });
  return newState;
}

const getUserProfileSuccess = (state, action) => {
  const newState = updateObject(state, {
    user: updateObject(state.user, {
      userProfile: updateObject(state.user.userProfile, {
        loading: false,
        formData: action.payload
      })
    })
  });
  return newState;
}

const getUserProfileFail = (state, action) => {
  const newState = updateObject(state, {
    user: updateObject(state.user, {
      userProfile: updateObject(state.user.userProfile, {
        loading: false
      })
    })
  });
  return newState;
}

const updateUserProfileStart = (state, action) => {
  const newState = updateObject(state, {
    user: updateObject(state.user, {
      userProfile: updateObject(state.user.userProfile, {
        loading: true
      })
    })
  });
  return newState;
}

const updateUserProfileSuccess = (state, action) => {
  const newState = updateObject(state, {
    user: updateObject(state.user, {
      userProfile: updateObject(state.user.userProfile, {
        loading: false,
        formData: action.payload
      })
    })
  });
  return newState;
}

const updateUserProfileFail = (state, action) => {
  const newState = updateObject(state, {
    user: updateObject(state.user, {
      userProfile: updateObject(state.user.userProfile, {
        loading: false
      })
    })
  });
  return newState;
}

// Post Job
const postClientJobStart = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      postJob: updateObject(state.user.postJob, {
        loading: true,
        success: null
      })
    })
  });
  return newState;
}

const postClientJobSuccess = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      postJob: updateObject(state.user.postJob, {
        loading: false,
        success: true
      })
    })
  });
  return newState;
}

const postClientJobFail = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      postJob: updateObject(state.user.postJob, {
        loading: false,
        success: false
      })
    })
  });
  return newState;
}

// GET FREELANCER MARKET JOBS
const getFreelanceMarketJobsStart = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      loading: true
    })
  });
  return newState;
}

const getFreelanceMarketJobsSuccess = (state, action) => {

  const newState = updateObject(state, {
    job: updateObject(state.job, {
      loading: false,
      list: action.payload.jobs,
      paginationDetails: action.payload.paginationDetails
    })
  });
  return newState;
}

const getFreelanceMarketJobsFail = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      loading: false
    })
  });
  return newState;
}

// Get client jobs report
const getClientJobsCreatedReportStart = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      clientJobsReport: updateObject(state.job.clientJobsReport, {
        loading: true
      })
    })
  });
  return newState;
}

const getClientJobsCreatedReportSuccess = (state, action) => {

  const newState = updateObject(state, {
    job: updateObject(state.job, {
      clientJobsReport: updateObject(state.job.clientJobsReport, {
        loading: false,
        list: action.payload.jobs,
        paginationDetails: action.payload.paginationDetails
      })
    })
  });
  return newState;
}

const getClientJobsCreatedReportFail = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      clientJobsReport: updateObject(state.job.clientJobsReport, {
        loading: false
      })
    })
  });
  return newState;
}

// Get Job To Submit Proposal
const getJobDataToSubmitProposalStart = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      jobToSubmitProposal: updateObject(state.job.jobToSubmitProposal, {
        loading: true
      })
    })
  });
  return newState;
}

const getJobDataToSubmitProposalSuccess = (state, action) => {

  const newState = updateObject(state, {
    job: updateObject(state.job, {
      jobToSubmitProposal: updateObject(state.job.jobToSubmitProposal, {
        loading: false,
        formData: action.payload
      })
    })
  });
  return newState;
}

const getJobDataToSubmitProposalFail = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      jobToSubmitProposal: updateObject(state.job.jobToSubmitProposal, {
        loading: false
      })
    })
  });
  return newState;
}

// SUBMIT PROPOSAL FOR A JOB
const submitProposalForJobStart = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      submitJobProposal: updateObject(state.job.submitJobProposal, {
        loading: true
      })
    })
  });
  return newState;
}

const submitProposalForJobSuccess = (state, action) => {

  const newState = updateObject(state, {
    job: updateObject(state.job, {
      submitJobProposal: updateObject(state.job.submitJobProposal, {
        loading: false,
        formData: action.payload
      })
    })
  });
  return newState;
}

const submitProposalForJobFail = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      submitJobProposal: updateObject(state.job.submitJobProposal, {
        loading: false
      })
    })
  });
  return newState;
}

// PROPOSALS RECEIVED FOR A JOB
const getProposalsReceivedForJobStart = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      proposalsReceivedForJob: updateObject(state.job.proposalsReceivedForJob, {
        loading: true
      })
    })
  });
  return newState;
}

const getProposalsReceivedForJobSuccess = (state, action) => {

  const newState = updateObject(state, {
    job: updateObject(state.job, {
      proposalsReceivedForJob: updateObject(state.job.proposalsReceivedForJob, {
        loading: false,
        proposals: action.payload.proposals
      })
    })
  });
  return newState;
}

const getProposalsReceivedForJobFail = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      proposalsReceivedForJob: updateObject(state.job.proposalsReceivedForJob, {
        loading: false
      })
    })
  });
  return newState;
}

// GET FULL JOB POST FOR FREELANCER
const getFullJobPostForFreelancerStart = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      fullJobPostForFreelancer: updateObject(state.job.fullJobPostForFreelancer, {
        loading: true
      })
    })
  });
  return newState;
}

const getFullJobPostForFreelancerSuccess = (state, action) => {

  const newState = updateObject(state, {
    job: updateObject(state.job, {
      fullJobPostForFreelancer: updateObject(state.job.fullJobPostForFreelancer, {
        loading: false,
        data: action.payload
      })
    })
  });
  return newState;
}

const getFullJobPostForFreelancerFail = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      fullJobPostForFreelancer: updateObject(state.job.fullJobPostForFreelancer, {
        loading: false
      })
    })
  });
  return newState;
}

// FULL PROPOSAL RECEIVED FOR A JOB
const getFullJobProposalReceivedStart = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      fullProposalsReceivedForJob: updateObject(state.job.fullProposalsReceivedForJob, {
        loading: true
      })
    })
  });
  return newState;
}

const getFullJobProposalReceivedSuccess = (state, action) => {

  const newState = updateObject(state, {
    job: updateObject(state.job, {
      fullProposalsReceivedForJob: updateObject(state.job.fullProposalsReceivedForJob, {
        loading: false,
        proposal: action.payload.proposal
      })
    })
  });
  return newState;
}

const getFullJobProposalReceivedFail = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      fullProposalsReceivedForJob: updateObject(state.job.fullProposalsReceivedForJob, {
        loading: false
      })
    })
  });
  return newState;
}

// Update user profile avatar
const updateUserProfileAvatarStartStart = (state, action) => {
  const newState = updateObject(state, {
    user: updateObject(state.user, {
      avatar: updateObject(state.job.avatar, {
        loading: true
      })
    })
  });
  return newState;
}

// GET FULL JOB POST FOR CLIENT
const getFullJobPostForClientStart = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      fullJobPostForClient: updateObject(state.job.fullJobPostForClient, {
        loading: true
      })
    })
  });
  return newState;
}

const getFullJobPostForClientSuccess = (state, action) => {

  const newState = updateObject(state, {
    job: updateObject(state.job, {
      fullJobPostForClient: updateObject(state.job.fullJobPostForClient, {
        loading: false,
        data: action.payload
      })
    })
  });
  return newState;
}

const getFullJobPostForClientFail = (state, action) => {
  const newState = updateObject(state, {
    job: updateObject(state.job, {
      fullJobPostForClient: updateObject(state.job.fullJobPostForClient, {
        loading: false
      })
    })
  });
  return newState;
}

const updateUserProfileAvatarStartSuccess = (state, action) => {

  const newState = updateObject(state, {
    user: updateObject(state.user, {
      avatar: updateObject(state.job.avatar, {
        loading: false
      })
    })
  });
  return newState;
}

const updateUserProfileAvatarStartFail = (state, action) => {
  const newState = updateObject(state, {
    user: updateObject(state.user, {
      avatar: updateObject(state.job.avatar, {
        loading: false
      })
    })
  });
  return newState;
}
/** App Reducer */
const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.GET_USER_PERSONAL_START:
      return getUserPersonalStart(state, action);
    case actionTypes.GET_USER_PERSONAL_SUCCESS:
      return getUserPersonalSuccess(state, action);
    case actionTypes.GET_USER_PERSONAL_FAIL:
      return getUserPersonalFail(state, action);

    case actionTypes.UPDATE_USER_PERSONAL_START:
      return updateUserPersonalStart(state, action);
    case actionTypes.UPDATE_USER_PERSONAL_SUCCESS:
      return updateUserPersonalSuccess(state, action);
    case actionTypes.UPDATE_USER_PERSONAL_FAIL:
      return updateUserPersonalFail(state, action);

    case actionTypes.GET_USER_PROFILE_START:
      return getUserProfileStart(state, action);
    case actionTypes.GET_USER_PROFILE_SUCCESS:
      return getUserProfileSuccess(state, action);
    case actionTypes.GET_USER_PROFILE_FAIL:
      return getUserProfileFail(state, action);

    case actionTypes.UPDATE_USER_PROFILE_START:
      return updateUserProfileStart(state, action);
    case actionTypes.UPDATE_USER_PROFILE_SUCCESS:
      return updateUserProfileSuccess(state, action);
    case actionTypes.UPDATE_USER_PROFILE_FAIL:
      return updateUserProfileFail(state, action);

    case actionTypes.POST_CLIENT_JOB_START:
      return postClientJobStart(state, action);
    case actionTypes.POST_CLIENT_JOB_SUCCESS:
      return postClientJobSuccess(state, action);
    case actionTypes.POST_CLIENT_JOB_FAIL:
      return postClientJobFail(state, action);

    case actionTypes.GET_FREELANCE_MARKET_JOBS_START:
      return getFreelanceMarketJobsStart(state, action);
    case actionTypes.GET_FREELANCE_MARKET_JOBS_SUCCESS:
      return getFreelanceMarketJobsSuccess(state, action);
    case actionTypes.GET_FREELANCE_MARKET_JOBS_FAIL:
      return getFreelanceMarketJobsFail(state, action);

    case actionTypes.GET_CLIENT_JOBS_CREATED_REPORT_START:
      return getClientJobsCreatedReportStart(state, action);
    case actionTypes.GET_CLIENT_JOBS_CREATED_REPORT_SUCCESS:
      return getClientJobsCreatedReportSuccess(state, action);
    case actionTypes.GET_CLIENT_JOBS_CREATED_REPORT_FAIL:
      return getClientJobsCreatedReportFail(state, action);

    case actionTypes.GET_JOB_DATA_TO_SUBMIT_PROPOSAL_START:
      return getJobDataToSubmitProposalStart(state, action);
    case actionTypes.GET_JOB_DATA_TO_SUBMIT_PROPOSAL_SUCCESS:
      return getJobDataToSubmitProposalSuccess(state, action);
    case actionTypes.GET_JOB_DATA_TO_SUBMIT_PROPOSAL_FAIL:
      return getJobDataToSubmitProposalFail(state, action);

    case actionTypes.SUBMIT_PROPOSAL_FOR_JOB_START:
      return submitProposalForJobStart(state, action);
    case actionTypes.SUBMIT_PROPOSAL_FOR_JOB_SUCCESS:
      return submitProposalForJobSuccess(state, action);
    case actionTypes.SUBMIT_PROPOSAL_FOR_JOB_FAIL:
      return submitProposalForJobFail(state, action);

    case actionTypes.GET_PROPOSALS_RECEIVED_FOR_JOB_LIST_START:
      return getProposalsReceivedForJobStart(state, action);
    case actionTypes.GET_PROPOSALS_RECEIVED_FOR_JOB_LIST_SUCCESS:
      return getProposalsReceivedForJobSuccess(state, action);
    case actionTypes.GET_PROPOSALS_RECEIVED_FOR_JOB_LIST_FAIL:
      return getProposalsReceivedForJobFail(state, action);

    case actionTypes.GET_FULL_JOB_POST_FOR_FREELANCER_START:
      return getFullJobPostForFreelancerStart(state, action);
    case actionTypes.GET_FULL_JOB_POST_FOR_FREELANCER_SUCCESS:
      return getFullJobPostForFreelancerSuccess(state, action);
    case actionTypes.GET_FULL_JOB_POST_FOR_FREELANCER_FAIL:
      return getFullJobPostForFreelancerFail(state, action);

    case actionTypes.GET_FULL_PROPOSAL_RECEIVED_FOR_JOB_START:
      return getFullJobProposalReceivedStart(state, action);
    case actionTypes.GET_FULL_PROPOSAL_RECEIVED_FOR_JOB_SUCCESS:
      return getFullJobProposalReceivedSuccess(state, action);
    case actionTypes.GET_FULL_PROPOSAL_RECEIVED_FOR_JOB_FAIL:
      return getFullJobProposalReceivedFail(state, action);

    case actionTypes.UPDATE_USER_PROFILE_PICTURE_START:
      return updateUserProfileAvatarStartStart(state, action);
    case actionTypes.UPDATE_USER_PROFILE_PICTURE_SUCCESS:
      return updateUserProfileAvatarStartSuccess(state, action);
    case actionTypes.UPDATE_USER_PROFILE_PICTURE_FAIL:
      return updateUserProfileAvatarStartFail(state, action);

    case actionTypes.GET_FULL_JOB_POST_FOR_CLIENT_START:
      return getFullJobPostForClientStart(state, action);
    case actionTypes.GET_FULL_JOB_POST_FOR_CLIENT_SUCCESS:
      return getFullJobPostForClientSuccess(state, action);
    case actionTypes.GET_FULL_JOB_POST_FOR_CLIENT_FAIL:
      return getFullJobPostForClientFail(state, action);

    default:
      return state;
  }
}

export default reducer;
