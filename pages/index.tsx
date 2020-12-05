import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Signup from '../components/Signup';
import { LOG_IN_REQUEST, SOCIAL_LOG_IN_REQUEST } from '../store/constants/user';
import { LoginLayout, LoginForm, Logo, TempButton, LoginButton } from '../styles/LoginStyle';
import { googleProvider, githubProvider, myFirebaseApp } from '../util/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { me, loginError } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(loginError) {
      alert(loginError);
    }
  }, []);

  useEffect(() => {
    if(inputEl.current) {
      inputEl.current.focus();
    }
  }, []);

  useEffect(() => {
    if(me) {
      myFirebaseApp.auth().onAuthStateChanged(user => {
        if(user) {
          router.replace('/home'); 
        }
      });
    }
  }, [me]);

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
        <img src="https://firebasestorage.googleapis.com/v0/b/chat-webapp-garin.appspot.com/o/default%2Fapple-icon-120x120.png?alt=media&token=7fa132d8-9f03-47f4-98c6-770084dc9659" />
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
        <LoginButton>ログイン</LoginButton>
      </LoginForm>
      {/* <button name="google" onClick={onSocialClick}>Googleアカウントで始める</button>
      <button name="github" onClick={onSocialClick}>Githubアカウントで始める</button> */}
      <TempButton onClick={onClickSignup}>新規登録</TempButton>
      </LoginLayout>
      <Signup visible={showSignup} cancelHandler={handleShowSignup} />
    </>
  );
};

export default Login;