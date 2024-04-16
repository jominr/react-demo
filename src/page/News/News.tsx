import React, { useEffect, useState, useCallback } from 'react';
import './News.css'
import useFetch from '../../hooks/useFetch'

const News = () => {

  const [stuData, setStuData] = useState([{
    id: '1',
    attributes: {
      name: '悟空',
      age: 18,
      gender: '男',
      address: '花果山'
    }} ])

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback避免重复的去创建
  const fetchDataAsync = useCallback(async() => {
    try {
      setError(null);
      const res = await fetch('http://127.0.0.1/api/user/list');
      if (res.ok) {
        const data = await res.json();
        setStuData([{
          id: '7',
          attributes: {
            name: '铁扇公主',
            age: 18,
            gender: '女',
            address: '火焰山'
          }
        }, ...data.data,]);
      } else {
        throw new Error('数据加载失败')
      }
    } catch (e: any) {
      setError(e.message)
    }
  }, [])

  // 也可以用useCallback
  const deleteHander = async (id: number) => {
    try {
      const res = await fetch(`http://127.0.0.1/api/user/${id}`, {
        method: 'delete'
      });
      if (!res.ok) {
        throw new Error('删除失败')
      }
    } catch (e: any) {
      setError(e.message)
    }
  }

  // 也可以用useCallback
  const addHander = async (newStu: any) => {
    try {
      const res = await fetch('http://127.0.0.1/api/students', {
        method: 'post',
        body: JSON.stringify({data: newStu}),
        headers: {
          "Content-type": "application/json"
        }
      });
      if (res.ok) {
        const data = await res.json();
        // 最好是重新加载数据
      } else {
        throw new Error('添加失败')
      }
    } catch (e: any) {
      setError(e.message)
    }
  }

  // 也可以用useCallback
  const updateHander = async (id: number, newStu: any) => {
    try {
      const res = await fetch(`http://127.0.0.1/api/students/${id}`, {
        method: 'put',
        body: JSON.stringify({data: newStu}),
        headers: {
          "Content-type": "application/json"
        }
      });
      if (res.ok) {
        const data = await res.json();
        // 最好是重新加载数据
      } else {
        throw new Error('添加失败')
      }
    } catch (e: any) {
      setError(e.message)
    }
  }

  const {loading: loading1, error: error1, fetchData: updateStudent} = useFetch({
    url: 'students/id',
    method: 'post',
  })

  // 组件初始化加载数据
  useEffect(()=> {
    setLoading(true);
    setError(null);
    fetch('http://127.0.0.1/api/user/list')
      .then((res)=> {
        if (res.ok) {
          return res.json();
        }
        throw new Error('数据加载失败')
      })
      .then((data)=> {
        setStuData(data.data);
        setLoading(false);
      })
      .catch((e)=> {
        console.log(e)
        setLoading(false);
        setError(e.message);
      })
  }, [])

  // 如果外层函数无法是异步函数，我们可以这样转换一下
  const fetchData = () => {
    fetchDataAsync();
  }

  return (
    <div>
      <h3>从服务器获取的数据</h3>
      <button onClick={fetchData}>点击重新加载数据</button>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>age</th>
            <th>gender</th>
            <th>address</th>
          </tr>
        </thead>
        <tbody>
          {
            !loading && !error && stuData.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.attributes.name}</td>
                  <td>{item.attributes.age}</td>
                  <td>{item.attributes.gender}</td>
                  <td>{item.attributes.address}</td>
                </tr>
                
              )
            })
          }
        </tbody>
      </table>
      {loading && <p>loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default News;