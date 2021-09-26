/* eslint-disable react/button-has-type */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Router from 'next/router';
import { Button, Input, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

function LoginPage() {
  const dispatch = useDispatch();
  const LoginSuccess = useSelector((state) => state.user.LoginSuccess);
  const LoginMessage = useSelector((state) => state.user.LoginMessage);
  const logInDone = useSelector((state) => state.user.logInDone);
  const logInLoading = useSelector((state) => state.user.logInLoading);
  
  const divStyle = useMemo(() => ({ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }));

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (LoginSuccess) {
        alert('로그인이 성공했습니다');
      } else if (LoginSuccess === false) {
        alert(`로그인이 실패했습니다. \n${LoginMessage}`);
      } else {
        return null;
      }
  }, [LoginSuccess, LoginMessage]);

  useEffect(() => {
    if (logInDone) {
      alert('로그인을 완료했으니 메인페이지로 이동합니다.');
      Router.replace('/');
    }
  }, [logInDone]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  });

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  });
  
  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  const formStyle = useMemo(() => ({ display: 'flex', flexDirection: 'column' }));
    return (
        <div style={divStyle}>
          <Form style={formStyle} onFinish={onSubmitForm}>
            <label>Email</label>
            <Input type="email" value={email} onChange={onChangeEmail} />
            <label>Pasword</label>
            <Input type="password" value={password} onChange={onChangePassword} />
            <br />
            <Button type="primary" htmlType="submit" loading={logInLoading}>
              Login
            </Button>
          </Form>   
        </div>
    );
}

export default LoginPage;
