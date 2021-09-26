import { Button } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

function LandingPage() {
  const dispatch = useDispatch();

  const logOutLoading = useSelector((state) => state.user.logOutLoading);
  const logOutDone = useSelector((state) => state.user.logOutDone);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  const style = useMemo(() => ({ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }));

  useEffect(() => {
    if (logOutDone) {
      alert('로그아웃이 돼 로그인 페이지로 이동합니다.');
      Router.replace('/login');
    }
  }, [logOutDone]);
  
  return (
      <div style={style}>
        <h2>시작 페이지</h2>
        <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>  
      </div>
  );
}

export default LandingPage;
