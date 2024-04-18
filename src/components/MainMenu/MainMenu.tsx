import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/reducer/authSlice';

const computedClassName = ({isActive} : any) => {
  return isActive ?  'list-group-item list-group-item-active' : 'list-group-item'
}

const MainMenu = () => {

    // 获取dispatch,
    const dispatch = useDispatch();

  const {isLogged, username} = useSelector((state: any) => state.auth);
  return (
    <div className="list-group">
      <NavLink className={computedClassName} to="/default">Default</NavLink>
      {!isLogged && <NavLink className={computedClassName} to="/auth">auth</NavLink>}
      {
        isLogged && (
          <>
            <NavLink className={computedClassName} to="/" onClick={() => dispatch(logout(null))}>登出</NavLink>
            <NavLink className={computedClassName} end to="/home">Home</NavLink>
            <NavLink className={computedClassName} to="/about">Redux</NavLink>
            <NavLink className={computedClassName} to="/query">Query</NavLink>
          </>
        )
      }
      
    </div>
  );
};

export default MainMenu;