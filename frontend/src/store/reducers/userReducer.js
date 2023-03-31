import * as types from "../constants";

const initialStates = {
  users: null,
  loading: false,
  error: null,
  userid: null,
};

const userReducer = (state = initialStates, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case types.GET_USER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_USER_SUCCESS:
      return {
        ...state,
        users: payload,
        error: null,
      };

    case types.GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        users: null,
        error: payload,
      };

    case types.DELETE_USER_START:
      return {
        ...state,
        loading: true,
      };

    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
        error: null,
      };
    case types.DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        users: null,
        error: payload,
      };

    case types.UPDATE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
        error: null,
      };
    case types.UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        users: null,
        error: payload,
      };

    case types.GET_USER_ID_START:
      return {
        ...state,
        loading: true,
      };

    case types.GET_USER_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        userid: payload,
        error: null,
      };

    case types.GET_USER_ID_ERROR:
      return {
        ...state,
        loading: false,
        userid: null,
        error: payload,
      };

    default:
      return state;
  }
};

export default userReducer;
