import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { DarkBackground, SignupForm, SignupLayout, Label, ErrorMsg } from '../styles/SignupStyle';
import { SIGN_UP_REQUEST } from '../store/constants/user';
import { myFirebaseApp}  from '../util/firebase';

import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 3%;
  right: 3%;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`;

interface Signup {
  visible: boolean;
  cancelHandler(cancel: boolean): void;
};

const Signup = ({ visible, cancelHandler }: Signup) => {
  
  if(!visible) return null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if(inputEl.current) {
      inputEl.current.focus();
    }
  }, []);

  useEffect(() => {
    myFirebaseApp.auth().onAuthStateChanged(user => {
      if(user) {
        router.replace('/home');
      }
    });
  }, []);

  const onClick = useCallback((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    cancelHandler(true);
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if(name === 'email') setEmail(value);
    if(name === 'password') setPassword(value);
    if(name === 'passwordCheck') {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(value);
    }
    if(name === 'nickname') setNickname(value);
  }, [password]);

  const onSubmitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(password !== passwordCheck) {
      alert('パスワードを確認してください。');
      return setPasswordError(true);
    }
    console.log(email, nickname, password, passwordCheck);
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        nickname,
      }
    });
  }, [email, nickname, password, passwordCheck]);

  return (
    <>
      <DarkBackground>
        <SignupLayout>
          <Label>新規登録</Label>
          <StyledCloseIcon onClick={onClick}/>
          <SignupForm onSubmit={onSubmitForm}>
            <input
              name="nickname"
              type="text"
              placeholder="ニックネーム"
              value={nickname}
              onChange={onChange}
              ref={inputEl}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="メール"
              value={email}
              onChange={onChange}
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
            <input
              name="passwordCheck"
              type="password"
              placeholder="パスワードチェック"
              value={passwordCheck}
              onChange={onChange}
              required
            />
            {
              passwordError &&
              passwordCheck !== '' &&
              <ErrorMsg>パスワードが一致しません。</ErrorMsg>
            }
            <button>登録</button>
          </SignupForm>
        </SignupLayout>
      </DarkBackground>
    </>
  );
};

export default Signup;