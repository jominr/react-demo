import React, {useRef, useState} from 'react';
import { useRegisterMutation, useLoginMutation } from '../../store/api/authApi';
import { useDispatch } from 'react-redux';
import { login } from '../../store/reducer/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  // 表单数据
  const usernameInput = useRef();
  const pwdInput = useRef();
  const emailInput = useRef();

  // 登录、注册fetch接口
  const [regFn, {error: regError}] = useRegisterMutation();
  const [loginFn, {error: loginError}] = useLoginMutation()

  // 获取dispatch,
  const dispatch = useDispatch();

  // 获取navigate
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.preLocation?.pathname || '/';

  const submitHander = (e) => {
    e.preventDefault();
    const username = usernameInput.current.value;
    const passward = pwdInput.current.value;
    if (isLoginForm) {
      loginFn({
        username,
        passward,
      }).then(res => {
        if (!res.error) {
          // 登录成功后，像系统中添加一个标识，标记用户的登录状态，
          // 登录状态布尔值， token(jwt)，用户信息
          // 重定向
          dispatch(login({
            token: 'abfsbfsf',
            username: res.data.username,
          }));
          navigate(from, {replice: true});

        }
      })
    } else {
      const email = emailInput.current.value;
      regFn({
        username,
        passward,
        email
      }).then(res => {
        if (!res.error) {
          setIsLoginForm(true)
        }
      })
    }
    
  }
  return (
    <div>
      <h3>{isLoginForm ? '登录' : '注册'}</h3>
      <form onSubmit={submitHander}>
        <div>
          <input ref={usernameInput} type="text" placeholder="用户名"></input>
        </div>

        {
          !isLoginForm && <div>
            <input ref={emailInput} type="email" placeholder="电子邮件"></input>
          </div>
        }

        <div>
          <input ref={pwdInput} type="password" placeholder="密码"></input>
        </div>
        <div>
          <button>{isLoginForm ? '登录' : '注册'}</button>
          <a href="#" onClick={e=> {
            e.preventDefault();
            setIsLoginForm(prevState => !prevState)
          }}>
            {
              isLoginForm ? '没有账号？点击注册' : '已有账号？点击登录'
            }
          </a>
        </div>
      </form>
      <p style={{color: 'red'}}>{regError && regError.data.error.messae}</p>
    </div>
  );
};

export default AuthForm;