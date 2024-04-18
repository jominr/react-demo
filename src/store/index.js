import { configureStore } from "@reduxjs/toolkit";
import { stuReducer } from "./reducer/stuSlice";
import { schoolReducer } from "./reducer/schoolSlice";
import teacherApi from "./api/teacherApi";
import { authApi } from "./api/authApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import { authSlice } from "./reducer/authSlice";

// 创建store, 传入配置对象
const store = configureStore({
  reducer: {
    student: stuReducer,
    school: schoolReducer,
    [teacherApi.reducerPath] : teacherApi.reducer,
    [authApi.reducerPath] : authApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware => 
      getDefaultMiddleware().concat(teacherApi.middleware, authApi.middleware), // 缓存生效
});

// 设置以后，将会支持refetchOnFocus, refetchOnReconnect,
setupListeners(store.dispatch); 

export default store;