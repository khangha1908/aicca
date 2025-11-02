import axios from 'axios';
import Cookies from 'js-cookie';

import {
  LOAD_PROF,
  LOGIN_FAIL,
  LOGIN_REQ,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../action-types";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const login = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQ,
    });

    const res = await axios.post(`${API_BASE_URL}/auth/login`);

    const accessToken = res.data.accessToken;

    const profile = res.data.profile;

    Cookies.set('sign-language-ai-access-token', accessToken, { expires: 2 });
    Cookies.set('sign-language-ai-user', JSON.stringify(profile), { expires: 2 });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: accessToken,
    });

    dispatch({
      type: LOAD_PROF,
      payload: profile,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post(`${API_BASE_URL}/auth/logout`);
  } catch (error) {
    console.error('Logout API error:', error);
  }

  dispatch({
    type: LOGOUT
  });

  Cookies.remove('sign-language-ai-access-token');
  Cookies.remove('sign-language-ai-user');
};
