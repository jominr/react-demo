import Home from "../page/Home/Home";
import About from "../page/About/About";
import { Navigate } from "react-router-dom";
import News from "../page/News/News";
import Query from "../page/Query/Query";
import Message from "../page/Message/Message";
import MessageDetail from "../page/MessageDetail/MessageDetail";
import Default from '../page/Default/Default';
import AuthPage from '../page/AuthPage/AuthPage';
import NeedAuth from '../components/NeedAuth/NeedAuth'

export default [
    {
      path: '/default',
      element: <Default/>
    },
    {
      path: '/auth',
      element: <AuthPage></AuthPage>
    },
    {
      path: '/query',
      element: <NeedAuth><Query/></NeedAuth>,
    },
    {
      path: '/about',
      element: <NeedAuth><About/></NeedAuth>,
    },
    {
      path: '/home',
      element: <NeedAuth><Home/></NeedAuth>,
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
      element: <Navigate to='/default'/>
    },
  ]