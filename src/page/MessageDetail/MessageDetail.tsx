import React from 'react';
import {useParams, useSearchParams, useLocation} from 'react-router-dom'

const MessageDetail = () => {
  // const {id, title, content} : any = useParams();
  
  // const [search, setSearch] = useSearchParams();
  // const id = search.get('id');
  // const title = search.get('title');
  // const content = search.get('content');

  const {state: {id, title, content}} = useLocation();
  
  return (
    <ul>
      <li>id: {id}</li>
      <li>标题：{title}</li>
      <li>内容：{content}</li>
    </ul>
  );
};

export default MessageDetail;