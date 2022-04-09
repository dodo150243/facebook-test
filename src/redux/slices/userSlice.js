import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import api from '../../api';

import { wrappedThunk } from '../../helpers';

export const signIn = createAsyncThunk(
  'users/signIn',
  wrappedThunk(async ({ email, password }) => {
    const res = await api.post('/auth/signIn', {
      email,
      password,
    });

    return res.data;
  })
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    state: 'idle',
    value: null,
    error: null,
    isLogin: false,
    token: null,
  },
  reducers: {
    setUser: (state, { payload }) => {
      const decoded = jwt_decode(payload.token);
      if (decoded.exp > Date.now() / 1000) {
        state.isLogin = true;
        state.value = payload.user;
        state.token = payload.token;
      }
    },
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.state = 'loading';
      state.value = null;
      state.error = null;
      state.token = null;
      state.isLogin = false;
      localStorage.clear();
    },
    [signIn.fulfilled]: (state, { payload }) => {
      state.state = 'idle';
      const decoded = jwt_decode(payload.token);
      if (decoded.exp < Date.now() / 1000) {
        state.error = {
          status: 'fail',
          message: 'หมดเวลาเข้าสู่ระบบ',
        };
        return;
      }
      state.value = { ...payload.user };
      state.isLogin = true;
      state.token = payload.token;
      localStorage.setItem('token', payload.token);
      localStorage.setItem('user', JSON.stringify(payload.user));
    },
    [signIn.rejected]: (state, { payload }) => {
      state.state = 'error';
      state.error = payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectAuth = (state) => state.users;

export default userSlice.reducer;
