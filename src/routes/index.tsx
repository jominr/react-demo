import Home from "../page/Home/Home";
import About from "../page/About/About";
import { Navigate } from "react-router-dom";
import News from "../page/News/News";
import Query from "../page/Query/Query";
import Message from "../page/Message/Message";
import MessageDetail from "../page/MessageDetail/MessageDetail";
import Default from '../page/Default/Default';
import AuthPage from '../page/AuthPage/AuthPage';
import NeedAuth from '../components/NeedAuth/NeedAuth';
import ContactForm from '../page/ContractForm';
import HolyGrail from "../page/HolyGrail";
import Mortgage from "../page/Mortgage";
import Tabs from "../page/Tabs";
import TodoList from "../page/TodoList";
import TrafficLight from "../page/TrafficLight";
import DigitalClock from "../page/DigitalClock";
import JobBoard from "../page/JobBoard";
import CodeQuestions from "../page/CodeQuestions"
import InterviewTest from "../page/InterviewTest/InterviewTest";

export default [
    {
      path: '/default',
      element: <Default/>
    },
    {
      path: '/Interview',
      element: <InterviewTest />
    },
    {
      path: '/contactForm',
      element: <ContactForm />
    },
    {
      path: '/holyGrail',
      element: <HolyGrail/>
    },
    {
      path: '/mortgage',
      element: <Mortgage/>
    },
    {
      path: '/tabs',
      element: <Tabs/>
    },
    {
      path: '/todoList',
      element: <TodoList/>
    },
    {
      path: '/trafficLight',
      element: <TrafficLight/>
    },
    {
      path: '/digitalClock',
      element: <DigitalClock/>
    },
    {
      path: '/jobBoard',
      element: <JobBoard/>
    },
    {
      path: '/codeQuestions',
      element: <CodeQuestions/>
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