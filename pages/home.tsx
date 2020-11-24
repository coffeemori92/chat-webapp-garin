import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { useRouter } from 'next/router';

import AppLayout from '../components/AppLayout';
import AddFriend from '../components/AddFriend';
import { FriendArea, FriendLayoutDiv, FriendMainArea, FriendsContainer, FriendsNumArea, Header, LayoutDiv, MyinfoArea, MyInfoAreaMain, SearchBar } from '../styles/homeStyle';
import { myFirebaseApp } from '../util/firebase';
import { LOAD_MY_INFO_REQUEST } from '../store/constants/user';
import { SEARCH_CHATROOM_REQUEST } from '../store/constants/chat';

const Home = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [searchNickname, setSearchNickname] = useState('');
  const friendAreaEl = useRef(null);

  const router = useRouter();

  const { me } = useSelector((state: any) => state.user);
  const { searchChatRoomDone, chatRoomId } = useSelector((state: any) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    myFirebaseApp.auth().onAuthStateChanged(user => {
      if(user) {
        if(!me) {
          dispatch({ type: LOAD_MY_INFO_REQUEST, data: { email: user.email }});
        }
      } else {
        // 돌려보내기.
      }
    })
  }, [me]);

  useEffect(() => {
    if(searchChatRoomDone) {
      router.push({
        pathname: '/chatroom/[id]',
        query: { id: chatRoomId },
      });
    }
  }, [searchChatRoomDone]);

  // useEffect(() => {
  //   if(addedNewFriend) {
  //     dbService.collection('users')
  //       .doc(me.email)
  //       .onSnapshot((snapshot) => {
  //         const user = snapshot.data();
  //         console.log('users', user);
  //         const myFriendsInfo = user!.friends;
  //         setmyFriendsInfo(myFriendsInfo);
  //       });
  //   }
  //   return () => setmyFriendsInfo(null);
  // }, [addedNewFriend]);
  
  const handleShowSignup = useCallback((cancel) => {
    if(cancel) {
      setShowAddFriend(false);
    }
  }, []);

  const onClickAddFriend = useCallback((e) => {
    setShowAddFriend(true);
  }, []);

  const onChange = useCallback((e) => {
    const name = e.target.name;
    const value = e.target.value;
    if(name === 'searchNickname') {
      setSearchNickname(value);
    }
  }, []);

  const onDoubleClick = useCallback((e) => {
    console.log('page', e.target.id);
    const email = e.target.id;
    dispatch({ type: SEARCH_CHATROOM_REQUEST, data: { email: email }})
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
              name="searchNickname"
              onChange={onChange}
              placeholder="なまえ検索"
              value={searchNickname}
            />
          </div>
          <div></div>
        </SearchBar>
        <MyinfoArea>
          <MyInfoAreaMain>
            {
              me &&
              <img src={me.photoURL} />
            }
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
          <FriendsNumArea>友達 {
                me &&
                me.friends.length
              }
          </FriendsNumArea>
          {
            me && !searchNickname &&
            me.friends.map((v: any, i: string) => {
              return (
                <FriendArea key={v.uid}>
                  <FriendMainArea 
                    onClick={onClicked} 
                    ref={friendAreaEl} 
                    onDoubleClick={onDoubleClick} 
                    id={v.email}>
                    <img src={v.photoURL} />
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
            me && searchNickname &&
            me.friends.map((v: any, i: string) => {
              const typedNickname = searchNickname.split('');
              const nickname = (v.nickname).split('');
              for(let i = 0; i < nickname.length; i++) {
                for(let j = 0; j < typedNickname.length; j++) {
                  if(nickname[0] === typedNickname[j]) {
                    return (
                      <FriendArea key={v.uid}>
                        <FriendMainArea 
                          onClick={onClicked} 
                          ref={friendAreaEl} 
                          onDoubleClick={onDoubleClick} 
                          id={v.email}>
                          <img src={v.photoURL} />
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
                  }
                }
              }
            })
          }
        </FriendsContainer>
      </AppLayout>
      <AddFriend visible={showAddFriend} cancelHandler={handleShowSignup} />
    </>
  )
};

export default Home;