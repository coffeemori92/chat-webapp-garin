import React from 'react';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import AppLayout from '../components/AppLayout';
import { Header, LayoutDiv, MyinfoArea, MyInfoAreaMain, SearchBar } from '../styles/homeStyle';

const Home = () => {
  return (
    <>
      <AppLayout>
        <Header>
          <h1>ガリンとも</h1>
          <div><PersonAddOutlinedIcon/></div>
        </Header>
        <SearchBar>
          <div>
            <SearchOutlinedIcon/>
            <input
              placeholder="なまえ検索"
            />
          </div>
          <div></div>
        </SearchBar>
        <MyinfoArea>
          <MyInfoAreaMain>
            <img src="https://d2v9k5u4v94ulw.cloudfront.net/small_light(dw=200,dh=200,da=l,ds=s,cw=200,ch=200,cc=FFFFFF)/assets/images/3726945/original/f2c4f5ce-c69f-41d1-850f-0ddf76c82a9b?1556698179%27)/assets/images/372694" />
            <div>
              <div>이름</div>
              <div>대화명</div>
            </div>
          </MyInfoAreaMain>
          <LayoutDiv/>
        </MyinfoArea>
      </AppLayout>
    </>
  )
};

export default Home;