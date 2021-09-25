/* eslint-disable react/button-has-type */
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const divStyle = useMemo(() => ({ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }));

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
          <form style={formStyle} onSubmit={onSubmitForm}>
            <label>Email</label>
            <input type="email" value={email} onChange={onChangeEmail} />
            <label>Pasword</label>
            <input type="password" value={password} onChange={onChangePassword} />
            <br />
            <button>
              Login
            </button>
          </form>   
        </div>
    );
}

export default LoginPage;
