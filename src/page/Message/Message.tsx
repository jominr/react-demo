import React, {useState} from 'react';
import {Link, Outlet} from 'react-router-dom'

const Message = () => {
  const [messageList] = useState([
    {id: '001', title: '消息1', content: '这是消息1，内容很长…'},
    {id: '002', title: '消息2', content: '这是消息2，内容很长…'},
    {id: '003', title: '消息3', content: '这是消息3，内容很长…'},
    {id: '004', title: '消息4', content: '这是消息4，内容很长…'},
    {id: '005', title: '消息5', content: '这是消息5，内容很长…'},
  ])
  return (
    <div>
      <h3>探索路由传参</h3>
      <ul>
        {
          messageList.map(item => {
            return (
              <li key={item.id}>
                {/* <Link to={`detail/${item.id}/${item.title}/${item.content}`}>{item.title}</Link> */}
                {/* <Link to={`detail?id=${item.id}&title=${item.title}&content=${item.content}`}>{item.title}</Link> */}
                <Link to='detail' state={{id: item.id, title: item.title, content: item.content}}>{item.title}</Link>
              </li>
            )
          })
        }
      </ul>
      <hr />
      <Outlet></Outlet>
    </div>
  );
};

export default Message;