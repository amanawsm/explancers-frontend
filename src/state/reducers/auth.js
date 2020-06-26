import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    userName: null,
    error: null,
    loading: null,
    authRedirectPath: '/',
    accountType: {
        status: null,
        type: null
    },
    activateAccount: {
        loading: false,
        error: null
    },
    resetPassword: {
        loading: null,
        error: null
    },
    loginAccount: {
        loading: null,
        error: null
    },
    registerAccount: {
        loading: null,
        error: null
    },
    signupSuccess: null
};

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        userName: action.userName,
        accountType: action.accountType,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error.data,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
};

const authLogoutFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    })
}

/**
 * Signup Action Creators
 */

const signupStart = (state, action) => {
    return updateObject(state, {
        registerAccount: updateObject(state.registerAccount, {
            error: null,
            loading: true
        })
    });
};

const signupSuccess = (state, action) => {
    return updateObject(state, {
        registerAccount: updateObject(state.registerAccount, {
            error: null,
            loading: false
        }),
        signupSuccess: true
    });
}

const signupFail = (state, action) => {
    return updateObject(state, {
        registerAccount: updateObject(state.registerAccount, {
            error: action.error,
            loading: false,
        }),
        signupSuccess: false
    })
}

/**
 * Activate User Account
 */

const activateUserAccountSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        userName: action.userName,
        accountType: action.accountType,
        activateAccount: updateObject(state.activateAccount, {
            error: null,
            loading: false
        }),
        signupSuccess: null
    });
};

const activateUserAccountStart = (state, action) => {
    return updateObject(state, {
        activateAccount: updateObject(state.activateAccount, {
            error: null,
            loading: true
        })
    });
};

const activateUserAccountFail = (state, action) => {
    return updateObject(state, {
        activateAccount: updateObject(state.activateAccount, {
            error: action.error,
            loading: false
        })
    });
};

/**
 * Reset Password
 */

const resetForgotUserPasswordSuccess = (state, action) => {
    return updateObject(state, {
        resetPassword: updateObject(state.resetPassword, {
            error: null,
            loading: false
        }),
        signupSuccess: true
    });
};

const resetForgotUserPasswordStart = (state, action) => {
    return updateObject(state, {
        resetPassword: updateObject(state.resetPassword, {
            error: null,
            loading: true
        }),
        signupSuccess: null
    });
};

const resetForgotUserPasswordFail = (state, action) => {
    return updateObject(state, {
        resetPassword: updateObject(state.resetPassword, {
            error: action.error,
            loading: false
        }),
        signupSuccess: null
    });
};

/**
 * Auth Login
 */

const authLoginStart = (state, action) => {
    return updateObject(state, {
        loginAccount: updateObject(state.loginAccount, {
            error: null,
            loading: true
        })
    });
};

const authLoginSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        userName: action.userName,
        accountType: action.accountType,
        loginAccount: updateObject(state.loginAccount, {
            error: null,
            loading: false
        })
    });
};

const authLoginFail = (state, action) => {
    return updateObject(state, {
        loginAccount: updateObject(state.loginAccount, {
            error: action.error.data,
            loading: false
        })
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.AUTH_LOGOUT_FAIL:
            return authLogoutFail(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        case actionTypes.SIGNUP_START:
            return signupStart(state, action);
        case actionTypes.SIGNUP_SUCCESS:
            return signupSuccess(state, action);
        case actionTypes.SIGNUP_FAIL:
            return signupFail(state, action);

        case actionTypes.USER_ACCOUNT_ACTIVATE_START:
            return activateUserAccountStart(state, action);
        case actionTypes.USER_ACCOUNT_ACTIVATE_SUCCESS:
            return activateUserAccountSuccess(state, action);
        case actionTypes.USER_ACCOUNT_ACTIVATE_FAIL:
            return activateUserAccountFail(state, action);

        case actionTypes.RESET_FORGOT_USER_PASSWORD_START:
            return resetForgotUserPasswordStart(state, action);
        case actionTypes.RESET_FORGOT_USER_PASSWORD_SUCCESS:
            return resetForgotUserPasswordSuccess(state, action);
        case actionTypes.RESET_FORGOT_USER_PASSWORD_FAIL:
            return resetForgotUserPasswordFail(state, action);

        case actionTypes.AUTH_LOGIN_START:
            return authLoginStart(state, action);
        case actionTypes.AUTH_LOGIN_SUCCESS:
            return authLoginSuccess(state, action);
        case actionTypes.AUTH_LOGIN_FAIL:
            return authLoginFail(state, action);

        default:
            return state;
    }

}

export default reducer;