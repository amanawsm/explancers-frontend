import * as actionTypes from 'state/actions/actionTypes';
import {
  updateObject
} from '../../shared/utility';

const initialState = {
  profile: {
    loading: false,
    formData: null
  },
  proposals: {
    loading: false,
    list: [],
    paginationDetails: {
      totalNumberOfElements: 0
    }
  },
  submittedJobProposalAndJob: {
    loading: false,
    job: null,
    jobProposal: null
  },
  market: {
    loading: false,
    freelancers: [],
    paginationDetails: {
      totalNumberOfElements: 0
    }
  }
}

const getFreelancerProfileStart = (state, action) => {
  const newState = updateObject(state, {
    profile: updateObject(state.profile, {
      loading: true
    })
  });
  return newState;
}

const getFreelancerProfileSuccess = (state, action) => {
  const newState = updateObject(state, {
    profile: updateObject(state.profile, {
      loading: false,
      formData: action.payload
    })
  });
  return newState;
}
const getFreelancerProfileFail = (state, action) => {
  const newState = updateObject(state, {
    profile: updateObject(state.profile, {
      loading: false
    })
  });
  return newState;
}

// GET JOBPROPOSALS SUBMITTED BY FREELANCER
const getJobProposalsSubmittedByFreelancersStart = (state, action) => {
  const newState = updateObject(state, {
    proposals: updateObject(state.proposals, {
      loading: true
    })
  });
  return newState;
}

const getJobProposalsSubmittedByFreelancersSuccess = (state, action) => {
  const newState = updateObject(state, {
    proposals: updateObject(state.proposals, {
      loading: false,
      list: action.payload.jobProposals,
      paginationDetails: action.payload.paginationDetails
    })
  });
  return newState;
}
const getJobProposalsSubmittedByFreelancersFail = (state, action) => {
  const newState = updateObject(state, {
    proposals: updateObject(state.proposals, {
      loading: false
    })
  });
  return newState;
}

// GET SINGLE JOB PROPOSAL  SUBMITTED AND JOB BY FREELANCER
const getFullSubmittedProposalAndJobForFreelancerStart = (state, action) => {
  const newState = updateObject(state, {
    submittedJobProposalAndJob: updateObject(state.submittedJobProposalAndJob, {
      loading: true
    })
  });
  return newState;
}

const getFullSubmittedProposalAndJobForFreelancerSuccess = (state, action) => {
  const newState = updateObject(state, {
    submittedJobProposalAndJob: updateObject(state.submittedJobProposalAndJob, {
      loading: false,
      job: action.payload.job,
      jobProposal: action.payload.jobProposal
    })
  });
  return newState;
}
const getFullSubmittedProposalAndJobForFreelancerFail = (state, action) => {
  const newState = updateObject(state, {
    submittedJobProposalAndJob: updateObject(state.submittedJobProposalAndJob, {
      loading: false
    })
  });
  return newState;
}

// GET MARKET FREELANCERS
const getMarketFreelancersStart = (state, action) => {
  const newState = updateObject(state, {
    market: updateObject(state.market, {
      loading: true
    })
  });
  return newState;
}

const getMarketFreelancersSuccess = (state, action) => {
  const newState = updateObject(state, {
    market: updateObject(state.market, {
      loading: false,
      freelancers: action.payload.freelancers,
      paginationDetails: action.payload.paginationDetails
    })
  });
  return newState;
}
const getMarketFreelancersFail = (state, action) => {
  const newState = updateObject(state, {
    market: updateObject(state.market, {
      loading: false
    })
  });
  return newState;
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.GET_FREELANCER_PROFILE_START:
      return getFreelancerProfileStart(state, action);
    case actionTypes.GET_FREELANCER_PROFILE_SUCCESS:
      return getFreelancerProfileSuccess(state, action);
    case actionTypes.GET_FREELANCER_PROFILE_FAIL:
      return getFreelancerProfileFail(state, action);

    case actionTypes.GET_JOBPROPOSALS_SUBMITTED_BY_FERELANCER_START:
      return getJobProposalsSubmittedByFreelancersStart(state, action);
    case actionTypes.GET_JOBPROPOSALS_SUBMITTED_BY_FERELANCER_SUCCESS:
      return getJobProposalsSubmittedByFreelancersSuccess(state, action);
    case actionTypes.GET_JOBPROPOSALS_SUBMITTED_BY_FERELANCER_FAIL:
      return getJobProposalsSubmittedByFreelancersFail(state, action);

    case actionTypes.GET_FULL_JOB_PROPOSAL_AND_JOB_FOR_FERELANCER_START:
      return getFullSubmittedProposalAndJobForFreelancerStart(state, action);
    case actionTypes.GET_FULL_JOB_PROPOSAL_AND_JOB_FOR_FERELANCER_SUCCESS:
      return getFullSubmittedProposalAndJobForFreelancerSuccess(state, action);
    case actionTypes.GET_FULL_JOB_PROPOSAL_AND_JOB_FOR_FERELANCER_FAIL:
      return getFullSubmittedProposalAndJobForFreelancerFail(state, action);

    case actionTypes.GET_MARKET_FERELANCERS_START:
      return getMarketFreelancersStart(state, action);
    case actionTypes.GET_MARKET_FERELANCERS_SUCCESS:
      return getMarketFreelancersSuccess(state, action);
    case actionTypes.GET_MARKET_FERELANCERS_FAIL:
      return getMarketFreelancersFail(state, action);

    default:
      return state;
  }
}

export default reducer;
