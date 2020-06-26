import * as actionTypes from 'state/actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  completeProfile: {
    loading: false,
    formData: null
  },
  publicProfile: {
    loading: false,
    formData: null
  }
}

// GET CLIENT COMPLETE PROFILE AND UPDATE TO STATE
const getClientProfileStart = (state, action) => {
  const newState = updateObject(state, {
    completeProfile: updateObject(state.completeProfile, {
      loading: true
    })
  });
  return newState;
}

const getClientProfileSuccess = (state, action) => {
  const newState = updateObject(state, {
    completeProfile: updateObject(state.completeProfile, {
      loading: false,
      formData: action.payload
    })
  });
  return newState;
}
const getClientProfileFail = (state, action) => {
  const newState = updateObject(state, {
    completeProfile: updateObject(state.completeProfile, {
      loading: false
    })
  });
  return newState;
}

/** Client Public Profile */
const getClientPublicProfileStart = (state, action) => {
  const newState = updateObject(state, {

    publicProfile: updateObject(state.publicProfile, {
      loading: true
    })

  });
  return newState;
}

const getClientPublicProfileSuccess = (state, action) => {
  const newState = updateObject(state, {
    publicProfile: updateObject(state.publicProfile, {
      loading: false,
      formData: action.payload
    })
  });
  return newState;
}

const getClientPublicProfileFail = (state, action) => {
  const newState = updateObject(state, {
    publicProfile: updateObject(state.publicProfile, {
      loading: false
    })
  });
  return newState;
}

const updateClientPublicProfileStart = (state, action) => {
  const newState = updateObject(state, {
    publicProfile: updateObject(state.publicProfile, {
      loading: true
    })
  });
  return newState;
}

const updateClientPublicProfileSuccess = (state, action) => {
  const newState = updateObject(state, {
    publicProfile: updateObject(state.publicProfile, {
      loading: false,
      formData: action.payload
    })
  });
  return newState;
}

const updateClientPublicProfileFail = (state, action) => {
  const newState = updateObject(state, {
    publicProfile: updateObject(state.publicProfile, {
      loading: false
    })
  });
  return newState;
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.GET_CLIENT_PROFILE_START:
      return getClientProfileStart(state, action);
    case actionTypes.GET_CLIENT_PROFILE_SUCCESS:
      return getClientProfileSuccess(state, action);
    case actionTypes.GET_CLIENT_PROFILE_FAIL:
      return getClientProfileFail(state, action);
    case actionTypes.GET_CLIENT_PUBLIC_PROFILE_START:
      return getClientPublicProfileStart(state, action);
    case actionTypes.GET_CLIENT_PUBLIC_PROFILE_SUCCESS:
      return getClientPublicProfileSuccess(state, action);
    case actionTypes.GET_CLIENT_PUBLIC_PROFILE_FAIL:
      return getClientPublicProfileFail(state, action);
    case actionTypes.UPDATE_CLIENT_PUBLIC_PROFILE_START:
      return updateClientPublicProfileStart(state, action);
    case actionTypes.UPDATE_CLIENT_PUBLIC_PROFILE_SUCCESS:
      return updateClientPublicProfileSuccess(state, action);
    case actionTypes.UPDATE_CLIENT_PUBLIC_PROFILE_FAIL:
      return updateClientPublicProfileFail(state, action);
    default:
      return state;
  }
}

export default reducer;
