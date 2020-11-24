import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ChatIcon from '@material-ui/icons/Chat';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import { MenuBar } from '../styles/SideMenuStyle';
import SettingMenu from './SettingMenu';

const SideMenu = () => {
  const [showSetting, setShowSetting] = useState(false);
  const [filledHomeIcon, setFilledHomeIcon] = useState(false);
  const [filledChatIcon, setFilledChatIcon] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(router.pathname === '/home') {
      setFilledHomeIcon(true);
      setFilledChatIcon(false);
    } 
    if(router.pathname === '/chat') {
      setFilledHomeIcon(false);
      setFilledChatIcon(true);
    }
  }, []);

  const onClick = useCallback((e) => {
    if(e.target.id === 'setting' && showSetting) {
      setShowSetting(false);
    } if(e.target.id === 'setting' && !showSetting) {
      setShowSetting(true);
    }
  }, [showSetting]);

  const handleShowSetting = useCallback((cancel) => {
    if(cancel) {
      setShowSetting(false);
    }
  }, []);

  return (
    <>
      <MenuBar>
        <li>
          {
            filledHomeIcon 
            ? (
              <HomeIcon/>
            )
            : (
              <Link href="/home">
                <a><HomeOutlinedIcon/></a>
              </Link>
            )
          }
        </li>
        <li>
          {
            filledChatIcon
            ? (
              <ChatIcon/>
            )
            : (
              <Link href="/chat">
                <a><ChatBubbleOutlineOutlinedIcon /></a>
              </Link>
            )
          }
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
        ? <SettingMenu cancelHandler={handleShowSetting}/>
        : null
      }
    </>
  );
};

export default SideMenu;