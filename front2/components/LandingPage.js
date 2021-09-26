import { Button } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

function LandingPage() {
  const dispatch = useDispatch();

  const logOutLoading = useSelector((state) => state.user.logOutLoading);
  const logInDone = useSelector((state) => state.user.logInDone);
  const LogOutSuccess = useSelector((state) => state.user.LogOutSuccess);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  const moveLogin = useCallback(() => {
    Router.replace('/login');
  });   

  const style = useMemo(() => ({ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }));

  const ButtonStyle = useMemo(() => ({ display: 'block', position: 'absolute', marginTop: '100px' }));

  useEffect(() => {
    if (LogOutSuccess) {
      alert('로그아웃이 돼 로그인 페이지로 이동합니다.');
      Router.replace('/login');
    }
  }, [LogOutSuccess]);
  
  return (
      <div style={style}>
        <h2>시작 페이지</h2>
        {logInDone
        ? (
        <Button style={ButtonStyle} onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        )
        : <Button style={ButtonStyle} onClick={moveLogin}>로그인 페이지로 이동</Button>}
      </div>
  );
}

export default LandingPage;
