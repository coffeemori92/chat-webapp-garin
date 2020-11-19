import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Signup from '../components/Signup';
import { LOAD_MY_INFO_REQUEST, LOG_IN_REQUEST, SOCIAL_LOG_IN_REQUEST } from '../store/constants/user';
import { LoginLayout, LoginForm, Logo } from '../styles/LoginStyle';
import { googleProvider, githubProvider, myFirebaseApp } from '../util/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { loginDone } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(inputEl.current) {
      inputEl.current.focus();
    }
  }, []);

  useEffect(() => {
    if(loginDone) {
      myFirebaseApp.auth().onAuthStateChanged(user => {
        if(user) {
          dispatch({ type: LOAD_MY_INFO_REQUEST, data: { email: user.email } });
          router.replace('/home');
        } 
      });
    }
  }, [loginDone]);

  const handleShowSignup = useCallback((cancel) => {
    if(cancel) {
      setShowSignup(false);
    }
    if(inputEl.current) {
      inputEl.current.focus();
    }
  }, []);

  const onSubmitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return dispatch({
      type: LOG_IN_REQUEST,
      data: {
        email,
        password
      }
    });
  }, [email, password]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if(name === 'email') setEmail(value);
    if(name === 'password') setPassword(value);
  }, []);

  const onClickSignup = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowSignup(true);
  }, []);
  
  const onSocialClick = useCallback((e) => {
    const name = e.target.name;
    let provider;
    if(name === 'google') provider = googleProvider;
    if(name === 'github') provider = githubProvider;
    return dispatch({
      type: SOCIAL_LOG_IN_REQUEST,
      data: provider,
    });
  }, []);
  return (
    <>
      <LoginLayout>
      <Logo>
        <img src="https://d2v9k5u4v94ulw.cloudfront.net/small_light(dw=200,dh=200,da=l,ds=s,cw=200,ch=200,cc=FFFFFF)/assets/images/3726945/original/f2c4f5ce-c69f-41d1-850f-0ddf76c82a9b?1556698179%27)/assets/images/372694" />
      </Logo>
      <LoginForm onSubmit={onSubmitForm}>
        <input
          name="email"
          type="email"
          placeholder="メール"
          value={email}
          onChange={onChange}
          ref={inputEl}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={onChange}
          required
        />
        <button>ログイン</button>
      </LoginForm>
      <button name="google" onClick={onSocialClick}>Googleアカウントで始める</button>
      <button name="github" onClick={onSocialClick}>Githubアカウントで始める</button>
      <button onClick={onClickSignup}>新規登録</button>
      </LoginLayout>
      <Signup visible={showSignup} cancelHandler={handleShowSignup} />
    </>
  );
};

export default Login;