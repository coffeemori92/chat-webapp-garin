import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { LOG_OUT_REQUEST } from '../store/constants/user';
import { SettingBar } from '../styles/SettingMenuStyle';
import { myFirebaseApp } from '../util/firebase';
import Profile from './Profile';

interface SettingMenu {
  cancelHandler(cancel: boolean): void;
};

const SettingMenu = ({ cancelHandler }: SettingMenu) => {
  const [onLogout, setOnLogout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  
  useEffect(() => {
    if(onLogout) {
      myFirebaseApp.auth().onAuthStateChanged(user => {
        if(!user) router.replace('/');
      });
    }
  }, [onLogout]);

  const handleShowProfile = useCallback((cancel) => {
    if(cancel) {
      setShowProfile(false);
      cancelHandler(true);
    }
  }, []);

  const onClick = useCallback((e) => {
    if(e.target.id === 'profile') {
      setShowProfile(true);
    }
    if(e.target.id === "logout") {
      setOnLogout(true);
      dispatch({ type: LOG_OUT_REQUEST });
    }
    if(e.target.id === 'exit') {
      dispatch({ type: LOG_OUT_REQUEST });
      window.open('', '_self')!.close();
    }
  }, []);

  return (
    <>
      <SettingBar>
        <li><a id="profile" onClick={onClick}>プロフィール</a></li>
        <li><a id="logout" onClick={onClick}>ログアウト</a></li>
        <li><a id="exit" onClick={onClick}>終了</a></li>
      </SettingBar>
      <Profile visible={showProfile} cancelHandler={handleShowProfile} />
    </>
  );
};

export default SettingMenu;