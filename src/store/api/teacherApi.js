import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 创建Api对象
const teacherApi = createApi({ // 配置对象
  reducerPath: 'teacherApi', // Api标识，不重复
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1/api/',
    // 统一设置请求头
    prepareHeaders: (headers, {getState}) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }), // 指定查询的基础信息，发送请求使用的工具，表示用fetch发送请求
  tagTypes: ['student', 'teacher'], // 用来指定Api中的标签类型
  endpoints(build) {
    // build是请求的构建器，通过build来设置请求的相关信息
    return {
      getTeachers: build.query({
        // 配置这一次查询的信息
        query() {
          // 用于指定子路径
          return 'students'
          
          // 单个请求设置header
          // return {
          //   url: 'studnets',
          //   headers: {
          //     Authorization: "Bearer " + 'token'
          //   }
          // }
        },
        transformResponse(baseQueryReturnValue) {
          return baseQueryReturnValue.data;
        }, // 用来转换响应数据的格式
        
        // providesTags: ['student', 'teacher'], // 打上了标签, 当student标签失效时会重新加载数据，当teacher标签时效时也会重新加载。
        providesTags:[{type: 'student', id: 'LIST'}], // 标签更细化
      }),
      getTeacherById: build.query({
        query(id) {
          return `students/${id}`
        },
        transformResponse(baseQueryReturnValue) {
          return baseQueryReturnValue.data;
        },
        keepUnusedDataFor: 0, // 设置数据缓存的时间，默认60s
        providesTags: (result, error, id) => [{type: 'student', id }], // 更新了的那条数据重新加载
      }),
      delTeacher: build.mutation({
        query(id) {
          // 发送的不是get请求，要return一个obj
          return {
            url: `students/${id}`,
            method: 'delete'
          }
        }
      }), // mutation：突变，改变
      addTeacher: build.mutation({
        query(teacherData) {
          return {
            url: 'students',
            method: 'post',
            body: {data: teacherData}
          }
        },
        // invalidatesTags: ['student'], // 使student标签失效。
        invalidatesTags: [{type: 'student', id: 'LIST'}],
      }),
      updateTeacher: build.mutation({
        query(teacherData) {
          return {
            url: `students/${teacherData.id}`,
            method: 'put',
            body: {data: teacherData}
          }
        },
        invalidatesTags: (result, error, teacher)=>
        [{type: 'student', id: teacher.id}, {type: 'student', id: 'LIST'}], // 只让id这条数据失效
      }),
    };
  }, // 这是一个回调函数，用来指定api中的各种功能，需要一个对象作为返回值。
});

/*
  Api对象创建后，对象会根据各种方法自动的生成对应的钩子函数
  通过这些钩子函数，可以向服务器发送请求
  钩子函数的命名规则，getStudents --> useGetStudentsQuery;
                  updataStudent --> useUpdataStudentMutation;
*/

export const { 
  useGetTeachersQuery, 
  useGetTeacherByIdQuery, 
  useDelTeacherMutation,
  useAddTeacherMutation,
  useUpdateTeacherMutation,
 } = teacherApi;

export default teacherApi;
