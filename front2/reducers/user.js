import produce from '../util/produce';

export const initialState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,

  LoginSuccess: null,
  LogOutSuccess: null,
  LoginMessage: null,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const loginRequestAction = (data) => ({
    type: LOG_IN_REQUEST,
    data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInDone = false;
      draft.logOutDone = false;
      draft.LogOutSuccess = null;
      break;
    case LOG_IN_SUCCESS:
      draft.logInLoading = false;
      draft.logInDone = true;
      draft.LoginSuccess = action.data.data.loginSuccess;
      break;
      case LOG_IN_FAILURE:
      draft.logInLoading = false;
      draft.LoginSuccess = action.data.data.loginSuccess;
      draft.LoginMessage = action.data.data.message;
      draft.logInDone = false;
      break;
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutDone = false;
      break;
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.LogOutSuccess = action.data.data.logoutSuccess;
      draft.logInDone = false;
      draft.LoginSuccess = null;
      draft.LoginMessage = null;
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      console.log(action.data);
      draft.LogOutSuccess = action.data.data.logoutSuccess;
      break;
    case SIGN_UP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpError = null;
      draft.signUpDone = false;
      break;
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false;
      draft.signUpDone = true;
      break;
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false;
      draft.signUpError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
