import { createSlice } from "@reduxjs/toolkit";

const schoolSlice = createSlice({
  name: 'school',
  initialState: {
    name: '花果山小学',
    address: '花果山街道'
  }, // state初始值
  reducers: {
    setName(state, action) {
      // 这个state是代理对象，可以直接修改，
      state.name = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    }
  }
});

export const {setName, setAddress } = schoolSlice.actions;

export const {reducer: schoolReducer} = schoolSlice;