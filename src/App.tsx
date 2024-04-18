import React, {useEffect} from 'react';
import { NavLink, useRoutes } from 'react-router-dom'
import './App.css';
import routes from './routes'

const computedClassName = ({isActive} : any) => {
  return isActive ?  'list-group-item list-group-item-active' : 'list-group-item'
}

function App() {
  // 根据路由表生成对应的路由规则
  const element = useRoutes(routes)

  return (
    <div className="App">
      <h1>欢迎，这是一个react demo</h1>
      <div className="wrapper">
        <div className="list-group">
          <NavLink className={computedClassName} end to="/home">Home</NavLink>
          <NavLink className={computedClassName} to="/about">Redux</NavLink>
          <NavLink className={computedClassName} to="/query">Query</NavLink>
        </div>
        <div className="panel-body">
          {element}
        </div>
      </div>
      
    </div>
  );
}

export default App;
