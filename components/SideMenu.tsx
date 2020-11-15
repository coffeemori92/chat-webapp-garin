import React from 'react';
import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import { MenuBar } from '../styles/SideMenuStyle';

const SideMenu = () => {
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
          <SettingsOutlinedIcon/>
        </li>
      </MenuBar>
    </>
  );
};

export default SideMenu;