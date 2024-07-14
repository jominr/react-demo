import { useRoutes } from 'react-router-dom'
import './App.css';
import routes from './routes';
import MainMenu from './components/MainMenu/MainMenu';
import useAutoLogout from './hooks/useAuthAutoLogout';

import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/reducer/authSlice';

function App() {
  // 根据路由表生成对应的路由规则
  const element = useRoutes(routes);
  useAutoLogout();

  const {isLogged, username} = useSelector((state: any) => state.auth);
  // 获取dispatch,
  const dispatch = useDispatch();

  return (
    <div className="App">
      <div className="layout">
        <h1>Welcome, practice coding questions.</h1>
        {!isLogged && <NavLink to="/auth">login in</NavLink>}
        {
        isLogged && (
          <div>
            <span>{username}</span>
            <NavLink to="/" onClick={() => dispatch(logout(null))}>logout</NavLink>
          </div>
        )
      }
      </div>
      
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
