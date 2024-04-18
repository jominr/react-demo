import { createSlice } from "@reduxjs/toolkit";

// createSlice创建reducer切片,它需要一个配置对象作为参数
const stuSlice = createSlice({
  name: 'stu',
  initialState: {
    name: '孙悟空',
    age: 18,
    gender: '男',
    address: '花果山'
  }, // state初始值
  reducers: {
    setName(state, action) {
      // 这个state是代理对象，可以直接修改，
      state.name = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    }
  }
});
// 切片对象会自动帮我们生成action, 
// action对象的结构：{type: name/setName, payload: 函数参数}
// action对象的结构：{type: name/setAge, payload: 函数参数}
export const { setName, setAge } = stuSlice.actions;

export const {reducer: stuReducer} = stuSlice;
