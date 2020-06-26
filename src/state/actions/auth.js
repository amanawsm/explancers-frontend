import axios from 'core/http/axios.js';
import * as actionTypes from './actionTypes';
import { store } from 'react-notifications-component';
import { notificationOptions } from 'shared/app-constants';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId, userName, accountType) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    userName: userName,
    accountType: accountType
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logoutSuccess = (error) => {
  return {
    type: actionTypes.AUTH_LOGOUT,
    error: error
  };
}

export const logoutFail = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_FAIL
  };
}

export const logout = () => {
  return (dispatch, getState) => {
    let url = '/users/logout';

    axios.post(url)
      .then(response => {

        localStorage.removeItem('token');
        localStorage.removeItem('username');

        dispatch(logoutSuccess());
      })
      .catch(err => {
        console.log(err);
        dispatch(logoutFail(err));
      });
  }
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (authData) => {
  return (dispatch, getState) => {

    dispatch(authStart());
    let url = '/users/login';

    axios.post(url, authData)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.user.username);

        dispatch(authSuccess(response.data.token,
          response.data.user._id,
          response.data.user.username,
          response.data.accountType));
      })
      .catch(err => {
        store.addNotification({
          ...notificationOptions,
          title: "Failed",
          message: "Username or Password Incorrect",
          type: "danger"
        });
        dispatch(authFail(err.response));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(authStart());
      let url = '/users/validate/token';

      axios.get(url)
        .then(response => {

          localStorage.setItem('username', response.data.user.username);
          dispatch(authSuccess(response.data.token,
            response.data.user._id,
            response.data.user.username,
            response.data.accountType));
        })
        .catch(err => {
          dispatch(authFail(err));
        });
    }
  };
}

/**
 * Activate User Account
 */
export const activateUserAccountStart = () => {
  return {
    type: actionTypes.USER_ACCOUNT_ACTIVATE_START
  }
}

export const activateUserAccountSuccess = (token, userId, userName, accountType) => {
  return {
    type: actionTypes.USER_ACCOUNT_ACTIVATE_SUCCESS,
    idToken: token,
    userId: userId,
    userName: userName,
    accountType: accountType
  };
}

export const activateUserAccountFail = (error) => {
  return {
    type: actionTypes.USER_ACCOUNT_ACTIVATE_FAIL,
    error: error
  }
}

export const activateUserAccount = (activationToken, data) => {
  return dispatch => {
    dispatch(activateUserAccountStart());

    const url = '/users/account/activate/' + activationToken;

    axios.post(url, data)
      .then((response) => {

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.user.username);
        dispatch(activateUserAccountSuccess(response.data.token,
          response.data.user._id,
          response.data.user.username,
          response.data.accountType));

      }).catch(error => {
        dispatch(activateUserAccountFail(error));
      });
  }
}

/**
 * Reset User Account Password
 */

export const resetForgotUserPasswordStart = () => {
  return {
    type: actionTypes.RESET_FORGOT_USER_PASSWORD_START
  }
}

export const resetForgotUserPasswordSuccess = (data) => {
  return {
    type: actionTypes.RESET_FORGOT_USER_PASSWORD_SUCCESS
  };
}

export const resetForgotUserPasswordFail = (error) => {
  return {
    type: actionTypes.RESET_FORGOT_USER_PASSWORD_FAIL,
    error: error
  }
}

export const resetForgotUserPassword = (data) => {
  return dispatch => {
    dispatch(resetForgotUserPasswordStart());

    const url = '/users/account/reset/password';

    axios.post(url, data)
      .then((response) => {
        store.addNotification({
          ...notificationOptions,
          title: "Success",
          message: "Check your Email for password reset link",
          type: "success"
        });
        dispatch(resetForgotUserPasswordSuccess(response.data));
      }).catch(error => {
        dispatch(resetForgotUserPasswordFail(error.data));
      });
  }
}

/**
 * Login user Auth request
 */

export const authLoginStart = () => {
  return {
    type: actionTypes.AUTH_LOGIN_START
  };
};

export const authLoginSuccess = (token, userId, userName, accountType) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    idToken: token,
    userId: userId,
    userName: userName,
    accountType: accountType
  };
};

export const authLoginFail = (error) => {
  return {
    type: actionTypes.AUTH_LOGIN_FAIL,
    error: error
  };
};
export const authLogin = (authData) => {
  return (dispatch, getState) => {

    dispatch(authLoginStart());
    let url = '/users/login';

    axios.post(url, authData)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.user.username);

        dispatch(authLoginSuccess(response.data.token,
          response.data.user._id,
          response.data.user.username,
          response.data.accountType));
      })
      .catch(err => {
        store.addNotification({
          ...notificationOptions,
          title: "Failed",
          message: "Username or Password Incorrect",
          type: "danger"
        });
        dispatch(authLoginFail(err.response));
      });
  };
};