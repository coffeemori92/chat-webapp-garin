import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import { MenuBar } from '../styles/SideMenuStyle';
import SettingMenu from './SettingMenu';

const SideMenu = () => {
  const [showSetting, setShowSetting] = useState(false);

  const onClick = useCallback((e) => {
    if(e.target.id === 'setting') setShowSetting(prev => !prev);
  }, []);
  return (
    <>
      <MenuBar>
        <li>
          <Link href="/home">
            <a><HomeIcon/></a>
          </Link>
        </li>
        <li>
          <Link href="/chat">
            <a><ModeCommentOutlinedIcon /></a>
          </Link>
        </li>
        <li>
          <SettingsOutlinedIcon 
            id="setting"
            onClick={onClick}
          />
        </li>
        
      </MenuBar>
      {
        showSetting 
        ? <SettingMenu/>
        : null
      }
    </>
  );
};

export default SideMenu;