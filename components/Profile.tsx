import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { DarkBackground, Label, SignupForm, SignupLayout, StyledCloseIcon } from '../styles/ProfileStyle';

interface Profile {
  visible: boolean;
  cancelHandler(cancel: boolean): void;
};

const Profile = ({ visible, cancelHandler }: Profile) => {
  
  if(!visible) return null;

  const onClick = useCallback((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    cancelHandler(true);
  }, []);

  return (
    <>
      <DarkBackground>
        <SignupLayout>
          <Label>プロフィール</Label>
          <StyledCloseIcon onClick={onClick}/>
          <SignupForm>
            <input
              name="nickname"
              type="text"
              placeholder="ニックネーム"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="メール"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="パスワード"
              required
            />
            <input
              name="passwordCheck"
              type="password"
              placeholder="パスワードチェック"
              required
            />
            <button>登録</button>
          </SignupForm>
        </SignupLayout>
      </DarkBackground>
    </>
  );
};

export default Profile;