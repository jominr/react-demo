import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setName , setAge } from '../../store/reducer/stuSlice';
import { setName as setSchoolName, setAddress } from '../../store/reducer/schoolSlice'
/* 
  理解context, reducer, redux,
  1 context
    1）在store中定义一个xxxContext，定义初始的数据和空函数。
    2）使用xxxContext.Provider把组件包起来，使用useState构造的数据传入数据，
    2）使用编写好的函数1,2,3，传入函数，
    3）const ctx = useContext(xxxContext), 通过ctx.函数来使用上述函数1,2,3

  2 reducer 优化store
    1）在store中定义一个xxxContext，定义初始的数据和xxxDispatch,
    2）使用xxxContext.Provider把组件包起来，传入数据和Dispatch,
    2) 数据和dispatch是通过const [xxxData, xxDispatch] = useReducer(xxxReducer, {初始数据})来生成的
    2) 其中xxReducer包含了具体的函数操作: const xxxxReducer = (state, action) => {多个函数操作}
    3）const ctx = useContext(xxxContext), 通过ctx.xxxDispatch({type: 'xxxx', 其他参数})调用函数。


  3 redux toolkit
    1) 引入redux核心包，
    2）创建reducer整合函数: 这里我们是创建了一个reducer切片对象, export actions
    2）创建store：使用的是configureStore创建store对象，
    3) 对store中的state进行订阅: 给<App />包裹 <Provider store={store}>，把store注入，redux只有一个store
    4）使用useSelector加载state中的数据, 可以返回全部的state, 也可以一部分state.
    5) 使用useDispatch()返回dispatch, 通过dispatch派发action操作。
*/ 

const About = () => {
  const student = useSelector((state : any) => state.student);
  const school = useSelector((state : any) => state.school);
  // const {student, school} = useSelector((state : any) => state);
  const dispatch = useDispatch();
  const setNameHander = () => {
    // 获取acton的构建起
    dispatch(setName('MM'));
  }
  const setAgeHander = () => {
    // 获取acton的构建起
    dispatch(setAge(20));
  }
  const setSchoolNameHander = ()=> {
    dispatch(setSchoolName('三中'));
  }
  const setAddressHander = () => {
    dispatch(setAddress('小巷'));
  }
  
  return (
    <div>
      <h3>redux toolkit</h3>
        <p>{student.name}---
        {student.age}---
        {student.gender}---
        {student.address}
        </p>
        <button onClick={setNameHander}>修改name</button>
        <button onClick={setAgeHander}>修改age</button>

        <hr />

        <p>{school.name}---
        {school.address}
        </p>

        <button onClick={setSchoolNameHander}>修改name</button>
        <button onClick={setAddressHander}>修改age</button>

    </div>
  );
};

export default About;