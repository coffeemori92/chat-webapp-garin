import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { useRouter } from 'next/router';

import AppLayout from '../components/AppLayout';
import AddFriend from '../components/AddFriend';
import { FriendArea, FriendLayoutDiv, FriendMainArea, FriendsContainer, FriendsNumArea, Header, LayoutDiv, MyinfoArea, MyInfoAreaMain, SearchBar } from '../styles/homeStyle';
import { dbService, myFirebaseApp } from '../util/firebase';
import { LOAD_MY_INFO_REQUEST } from '../store/constants/user';
import { LOAD_CHATROOM_REQUEST } from '../store/constants/chat';

const Home = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [myFriendsInfo, setmyFriendsInfo] = useState(null);
  const friendAreaEl = useRef(null);

  const router = useRouter();

  const { me, loadMyInfoDone, addFriendDone, addedNewFriend } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!me) {
      myFirebaseApp.auth().onAuthStateChanged(user => {
        if(user) {
          dispatch({ type: LOAD_MY_INFO_REQUEST, data: { email: user.email }});
        }
      });
    }
  }, [me]);

  useEffect(() => {
    if(addedNewFriend) {
      dbService.collection('users')
        .doc(me.email)
        .onSnapshot((snapshot) => {
          const user = snapshot.data();
          console.log('users', user);
          const myFriendsInfo = user!.friends;
          setmyFriendsInfo(myFriendsInfo);
        });
    }
  }, [addedNewFriend]);
  
  const handleShowSignup = useCallback((cancel) => {
    if(cancel) {
      setShowAddFriend(false);
    }
  }, []);

  const onClickAddFriend = useCallback((e) => {
    setShowAddFriend(true);
  }, []);

  const onDoubleClick = useCallback((e) => {
    const email = e.target.id;
    dispatch({ type: LOAD_CHATROOM_REQUEST, data: email})
  }, []);

  const onClicked = useCallback((e) => {
    const id = e.target.id;
    const className = e.target.className;
    if(friendAreaEl.current) {
      const friendsDiv = document.getElementsByClassName(className);
      const clickedDiv = document.getElementById(id);
      [].forEach.call(friendsDiv, v => {
        v.style.backgroundColor = '';
      });
      if(clickedDiv) {
        clickedDiv!.style.backgroundColor = '#ECECED';
      }
    }
  }, []);

  return (
    <>
      <AppLayout>
        <Header>
          <h1>ガリンとも</h1>
          <div onClick={onClickAddFriend}><PersonAddOutlinedIcon/></div>
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
              <div>{me && me.nickname}</div>
              {
                me &&
                me.shortMsg &&
                <div>{me.shortMsg}</div>
              }
            </div>
          </MyInfoAreaMain>
          <LayoutDiv/>
        </MyinfoArea>
        <FriendsContainer>
          <FriendsNumArea>友達 210</FriendsNumArea>
          {
            me &&
            myFriendsInfo === null &&
            me.friends.map((v: any, i: string) => {
              return (
                <FriendArea key={v.uid}>
                  <FriendMainArea 
                    onClick={onClicked} 
                    ref={friendAreaEl} 
                    onDoubleClick={onDoubleClick} 
                    id={v.email}>
                    <img src="https://d2v9k5u4v94ulw.cloudfront.net/small_light(dw=200,dh=200,da=l,ds=s,cw=200,ch=200,cc=FFFFFF)/assets/images/3726945/original/f2c4f5ce-c69f-41d1-850f-0ddf76c82a9b?1556698179%27)/assets/images/372694" />
                    <div>
                      <div>{v.nickname}</div>
                      { 
                        v.shortMsg &&
                        <div>{v.shortMsg}</div>
                      }
                    </div>
                  </FriendMainArea>
                  <FriendLayoutDiv/>
                </FriendArea>
              )
            })
          }
          {
            me &&
            myFriendsInfo &&
            myFriendsInfo!.map((v: any) => {
              return (
                <FriendArea key={v.uid}>
                  <FriendMainArea 
                    onClick={onClicked} 
                    ref={friendAreaEl}
                    onDoubleClick={onDoubleClick} 
                    id={v.email}>
                    <img src="https://d2v9k5u4v94ulw.cloudfront.net/small_light(dw=200,dh=200,da=l,ds=s,cw=200,ch=200,cc=FFFFFF)/assets/images/3726945/original/f2c4f5ce-c69f-41d1-850f-0ddf76c82a9b?1556698179%27)/assets/images/372694" />
                    <div>
                      <div>{v.nickname}</div>
                      { 
                        v.shortMsg &&
                        <div>{v.shortMsg}</div>
                      }
                    </div>
                  </FriendMainArea>
                  <FriendLayoutDiv/>
                </FriendArea>
              )
            })
          }
        </FriendsContainer>
      </AppLayout>
      <AddFriend visible={showAddFriend} cancelHandler={handleShowSignup} />
    </>
  )
};

export default Home;