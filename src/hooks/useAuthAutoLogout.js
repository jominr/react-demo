import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/reducer/authSlice';

const useAutoLogout = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const timeout = auth.expirationTime - Date.now();
    if (timeout < 3000) {
      dispatch(logout(null));
      return;
    }
    const timer = setTimeout(() => {
      dispatch(logout(null));
    }, timeout)
    return() => {
      clearTimeout(timer);
    }

  }, [auth])
}

export default useAutoLogout;
