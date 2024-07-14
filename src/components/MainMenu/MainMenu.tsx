import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const computedClassName = ({isActive} : any) => {
  return isActive ?  'list-group-item list-group-item-active' : 'list-group-item'
}

const MainMenu = () => {

  const {isLogged, username} = useSelector((state: any) => state.auth);
  return (
    <div className="list-group">
      <NavLink className={computedClassName} to="/default">Default</NavLink>
      <NavLink className={computedClassName} to="/interview">Interview</NavLink>
      <NavLink className={computedClassName} to="/contactForm">Contact Form</NavLink>
      <NavLink className={computedClassName} to="/holyGrail">Holy Grail</NavLink>
      <NavLink className={computedClassName} to="/mortgage">Mortgage</NavLink>
      <NavLink className={computedClassName} to="/tabs">Tabs</NavLink>
      <NavLink className={computedClassName} to="/todoList">Todo List</NavLink>
      <NavLink className={computedClassName} to="/trafficLight">Traffic Light</NavLink>
      <NavLink className={computedClassName} to="/digitalClock">Digital Clock</NavLink>
      <NavLink className={computedClassName} to="/jobBoard">Job Board</NavLink>
      <NavLink className={computedClassName} to="/codeQuestions">Code</NavLink>
      {
        isLogged && (
          <>
            <NavLink className={computedClassName} end to="/home">Learn route</NavLink>
            <NavLink className={computedClassName} to="/about">Redux</NavLink>
            <NavLink className={computedClassName} to="/query">Query</NavLink>
          </>
        )
      }
      
    </div>
  );
};

export default MainMenu;