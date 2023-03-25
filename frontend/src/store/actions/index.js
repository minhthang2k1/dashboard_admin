import axios from "axios";
import * as types from "../constants";
import { BASE_URL_AUTH, BASE_URL_USER } from "~/util/api.js";
import { headers } from "~/util/headers.js";

export const postLogin = (user, navigate) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  try {
    const res = await axios.post(`${BASE_URL_AUTH}/login`, user);
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("isAdmin", res.data.isAdmin);
    navigate("/");
  } catch (error) {
    dispatch({ type: types.LOGIN_ERROR, payload: error.response.msg });
  }
};

export const postRegister = (user, navigate) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST });
  try {
    const res = await axios.post(`${BASE_URL_AUTH}/register`, user);
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
    navigate("/login");
  } catch (error) {
    dispatch({ type: types.REGISTER_ERROR, payload: error.response.msg });
  }
};

export const getUsers = () => async (dispatch) => {
  dispatch({ type: types.GET_USER_START });
  try {
    const res = await axios.get(`${BASE_URL_USER}`, {
      headers,
    });
    dispatch({ type: types.GET_USER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.GET_USER_ERROR, payload: error.response.msg });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_USER_START });
  try {
    const res = await axios.delete(`${BASE_URL_USER}/${id}/delete`, {
      headers,
    });
    dispatch({ type: types.DELETE_USER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.DELETE_USER_ERROR, payload: error.response.data });
  }
};

export const updateUser = (id, userUpdate) => async (dispatch) => {
  dispatch({ type: types.UPDATE_USER_START });
  try {
    const res = await axios.put(`${BASE_URL_USER}/${id}/update`, userUpdate, {
      headers,
    });
    dispatch({ type: types.UPDATE_USER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.UPDATE_USER_ERROR, payload: error.response.data });
  }
};

export const postLogout = (id) => async (dispatch) => {
  dispatch({ type: types.LOGOUT_REQUEST });
  try {
    await axios.post(`${BASE_URL_AUTH}/logout`, id, { headers });
    dispatch({ type: types.LOGOUT_SUCCESS });
    localStorage.clear();
  } catch (error) {
    dispatch({ type: types.LOGOUT_ERROR, payload: error.message });
  }
};
