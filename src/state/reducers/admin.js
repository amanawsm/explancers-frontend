import * as actionTypes from '../actions/adminActionTypes';
import {
  updateObject
} from '../../shared/utility';

const initialState = {
  dashboard: {
    users: {
      loading: false,
      error: null,
      list: [],
      paginationDetails: {
        totalNumberOfElements: 0
      }
    }
  }
};

const getUsersListForAdminDashboardStart = (state, action) => {
  const newState = updateObject(state, {
    dashboard: updateObject(state.dashboard, {
      users: updateObject(state.dashboard.user, {
        loading: true,
        error: null,
        list: [],
        paginationDetails: {
          totalNumberOfElements: 0
        }
      })
    })
  });
  return newState;
};

const getUsersListForAdminDashboardSuccess = (state, action) => {
  const newState = updateObject(state, {
    dashboard: updateObject(state.dashboard, {
      users: updateObject(state.dashboard.user, {
        loading: false,
        error: null,
        list: action.payload.users,
        paginationDetails: action.payload.paginationDetails
      })
    })
  });
  return newState;
};

const getUsersListForAdminDashboardFail = (state, action) => {
  const newState = updateObject(state, {
    dashboard: updateObject(state.dashboard, {
      users: updateObject(state.dashboard.user, {
        loading: false,
        error: action.payload.error,
        list: [],
        paginationDetails: {
          totalNumberOfElements: 0
        }
      })
    })
  });
  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_LIST_FOR_ADMIN_DASHBOARD_START:
      return getUsersListForAdminDashboardStart(state, action);
    case actionTypes.GET_USERS_LIST_FOR_ADMIN_DASHBOARD_SUCCESS:
      return getUsersListForAdminDashboardSuccess(state, action);
    case actionTypes.GET_USERS_LIST_FOR_ADMIN_DASHBOARD_FAIL:
      return getUsersListForAdminDashboardFail(state, action);
    default:
      return state;
  }
}

export default reducer;
