import React from 'react';
import { useGetTeachersQuery, 
  useGetTeacherByIdQuery, 
  useDelTeacherMutation, 
  useAddTeacherMutation,
  useUpdateTeacherMutation } from '../../store/api/teacherApi'
/*
    web应用中加载数据时需要处理的问题：
    
    1，根据不同的加载状态显示不同的UI组件
    2，减少相同数据重复发送请求
    3，使用乐观更新，提供用户体验（乐观更新：成功才更新）
    4，在用户与UI交互时，管理缓存的生命周期。（在数据需要变动时，手动触发刷新）

    RTKQ: 创建API对象
  */ 

const Query = () => {

  // 这个钩子函数会返回一个对象作为返回值，请求过程中相关数据都在该对象中存储。
  /*
    currentData: 当前参数的最新数据，当参数发生变化时会变成undefined，再获取到值
    data: 最新数据
    isError: 布尔值，是否有错误
    error: Error()，有错时才存在，error对象
    isFetching: 布尔值，数据是否在加载，
    isLoading: 布尔值，表示数据是否第一次加载，
    isSuccess: 布尔值，请求是否成功
    isUninitialized: 布尔值，请求是否还没有开始发送
    refetch: f() // 一个函数，用来重新加载数据
    status: 'pending' or 'fullfilled' 请求的状态
  */
  const {data, isSuccess, isLoading, refetch} = useGetTeachersQuery(null, {
    // useQuery可以接收一个对象作为第二个参数，通过该对象可以对请求进行配置
    selectFromResult: result => {
      // 举例
      // if (result.data) {
      //   result.data = result.data.filter((item: any) => item.attributes.age >18);
      // }
      return result;
    }, // 回调函数，用来指定useQuery返回的结果。
    pollingInterval: 0, // 设置轮训的间隔，隔一段时间发一个请求，单位是毫秒，0表示不轮询。
    skip: false, // 设置是否跳过当前请求，默认false
    refetchOnMountOrArgChange: false, // 设置是否每次都重新加载数据。是否在组件挂载时重新加载数据。
    // false表示正常使用缓存，true每次都重载数据，数字，数据缓存的时间（秒）
    refetchOnFocus: false, // 是否在重新获取焦点时重载数据，想要用户回来时重新加载数据。
    refetchOnReconnect: true, // 是否在重新连接后重载数据，断网后恢复连接
  });

  const stuId = '1'; // 假设修改某个id的数据，或者添加一条数据时调用一下接口
  const obj = useGetTeacherByIdQuery(stuId, {
    skip: !stuId, // 没有id时就是添加一条数据。
  })

  /* useMutation的钩子返回的是一个数组，数组中2个元素，
      第一个是操作的触发器，第二个是结果集
  */ 
  const [delStudent, delResult] = useDelTeacherMutation();
  // delStudent(4);
  // 在需要删除时，调用delStudent(3);

  const [addStudent, addRes] = useAddTeacherMutation();
  const [updataStudent, updateRes] = useUpdateTeacherMutation();
  // 添加、修改以后，查询的数据走的缓存，没有更新该怎么办？处理缓存：打标签
  
  return (
    <div>
      <h3>RTK Query: Redux toolkit Query</h3>

      {isLoading && <p>正在加载中</p>}

      {isSuccess && data.map((item: any) => <p key={item.id}>
        {item.attributes.name} ---
        {item.attributes.age} ---
        {item.attributes.gender} ---
        {item.attributes.address}
      </p>)}

      <button onClick={()=>refetch()}>刷新</button>
      
    </div>
  );
};

export default Query;