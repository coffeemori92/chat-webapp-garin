import React from 'react';

import { AppLayoutFlexbox } from '../styles/AppLayoutStyle';
import SideMenu from './SideMenu';

const AppLayout = ({ children }) => {
  return (
    <>
      <AppLayoutFlexbox>
        <SideMenu/>
        { children }
      </AppLayoutFlexbox>
    </>
  );
};

export default AppLayout;