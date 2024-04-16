import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Home.css'

const computedClassName = ({isActive} : any) => {
  return isActive ?  'home-list-group-item home-list-group-item-active' : 'home-list-group-item'
}

const Home = () => {
  return (
    <div>
      <div className="home-list-group">
        <NavLink className={computedClassName} to="news">News</NavLink>
        <NavLink className={computedClassName} to="message">Message</NavLink>
      </div>
      <div>
        <Outlet />
      </div>
      
    </div>
  );
};

export default Home;