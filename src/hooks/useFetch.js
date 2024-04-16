import {useCallback, useState} from 'react'

// 自定义钩子
/* {
  url,
  method,
}
*/
export default function useFectch(reqObj) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (body)=> {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch('http://127.0.0.1/api/' + reqObj.url, {
        method: reqObj.method || 'get',
        headers: {
          "Content-type": reqObj.type || "appliation/json"
        },
        body: body ? JSON.stringify({data: body}) : null //eg,修改数据 submit时才有body
      });
      if (res.ok) {
        const data = await res.json();
        setData(data.data);
      } else {
        throw new Error('数据加载失败')
      }
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false);
    }
  }, []);

  return {data, loading, error, fetchData} 

}