import React from 'react';
import {useSelector} from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


const NeedAuth = (props) => {
  const { isLogged } = useSelector(state => state.auth);
  const location = useLocation();
  
  return (
    isLogged ? 
    props.children : 
    <Navigate 
      to='/auth'
      replace
      state={{preLocation: location}}
    />
  );
};

export default NeedAuth;