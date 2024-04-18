import { useRoutes } from 'react-router-dom'
import './App.css';
import routes from './routes';
import MainMenu from './components/MainMenu/MainMenu';
import useAutoLogout from './hooks/useAuthAutoLogout';

function App() {
  // 根据路由表生成对应的路由规则
  const element = useRoutes(routes);
  useAutoLogout();

  return (
    <div className="App">
      <h1>欢迎，这是一个react demo</h1>
      <div className="wrapper">
        <MainMenu />
        <div className="panel-body">
          { element }
        </div>
      </div>
      
    </div>
  );
}

export default App;
