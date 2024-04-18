import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return {
        isLogged: false,
        token: null,
        username: null,
        expirationTime: 0,
      }
    }
    return {
      isLogged: true,
      token, // 服务器发送给我们的token, 默认有效期为1个月
      username: localStorage.getItem('username'),
      expirationTime: +localStorage.getItem('expirationTime')
    }
    
  },
  reducers: {
    login(state, action) {
      state.isLogged = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      const currentTime = Date.now();
      const timeout = 1000 * 60 * 60;
      state.expirationTime = currentTime + timeout;

      // 将数据同时存储到本地
      localStorage.setItem('token', state.token);
      localStorage.setItem('username', state.username);
      localStorage.setItem('expirationTime', currentTime + timeout + '');
    },
    logout(state, action) {
      state.isLogged = false;
      state.token = null;
      state.username = null;
      state.expirationTime = 0;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('expirationTime');
    }
  }
  
})

export const {login, logout} = authSlice.actions;
