import * as types from "../constants";

const initialStates = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialStates, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        user: payload,
        error: null,
      };
    case types.LOGIN_ERROR:
    case types.REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        token: null,
        user: null,
        error: payload,
      };

    case types.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.LOGOUT_SUCCESS:
      return initialStates;

    case types.LOGOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
