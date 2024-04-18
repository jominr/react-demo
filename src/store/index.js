import { configureStore } from "@reduxjs/toolkit";
import { stuReducer } from "./stuSlice/stuSlice";
import { schoolReducer } from "./schoolSlice/schoolSlice";
import teacherApi from "./teacherApi";
import {setupListeners} from "@reduxjs/toolkit/query"

// 创建store, 传入配置对象
const store = configureStore({
  reducer: {
    student: stuReducer,
    school: schoolReducer,
    [teacherApi.reducerPath] : teacherApi.reducer,
  },
  middleware: getDefaultMiddleware => 
      getDefaultMiddleware().concat(teacherApi.middleware), // 缓存生效
});

// 设置以后，将会支持refetchOnFocus, refetchOnReconnect,
setupListeners(store.dispatch); 

export default store;