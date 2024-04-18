import Home from "../page/Home/Home";
import About from "../page/About/About";
import { Navigate } from "react-router-dom";
import News from "../page/News/News";
import Query from "../page/Query/Query";
import Message from "../page/Message/Message";
import MessageDetail from "../page/MessageDetail/MessageDetail";

export default [
  {
    path: '/query',
    element: <Query/>
  },
  {
    path: '/about',
    element: <About/>
  },
  {
    path: '/home',
    element: <Home/>,
    children: [
      {
        path: 'news',
        element: <News/>
      },
      {
        path: 'message',
        element: <Message/>,
        children: [
          // {
          //   path: 'detail/:id/:title/:content',
          //   element: <MessageDetail/>
          // },
          {
            path: 'detail',
            element: <MessageDetail/>
          },
        ]
      }
    ],
  },
  {
    path: '/',
    element: <Navigate to='/home/message'/>
  },
]