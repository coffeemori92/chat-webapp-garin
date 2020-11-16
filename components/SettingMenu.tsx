import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../store/constants/user';

import { SettingBar } from '../styles/SettingMenuStyle';

const SettingMenu = () => {
  const dispatch = useDispatch();
  const onClick = useCallback((e) => {
    if(e.target.id === "exit") dispatch({ type: LOG_OUT_REQUEST });
    
  }, []);
  return (
    <SettingBar>
      <li>プロフィール</li>
      <li>ログアウト</li>
      <li><a id="exit" onClick={onClick}>終了</a></li>
    </SettingBar>
  );
};

export default SettingMenu;