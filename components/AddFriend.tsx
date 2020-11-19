import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_FRIEND_REQUEST, INIT_ADD_FRIEND_STATE } from '../store/constants/user';
import { AddFriendForm, DarkBackground, Label, SignupLayout, StyledCloseIcon, ErrorMsg } from '../styles/AddFriend';

interface AddFriend {
  visible: boolean;
  cancelHandler(cancel: boolean): void;
};

const AddFriend = ({ visible, cancelHandler }: AddFriend) => {

  if(!visible) return null;

  const [email, setEmail] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);
  
  const { addFriendError, addFriendDone } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(addFriendDone) {
      dispatch({ type: INIT_ADD_FRIEND_STATE });
      cancelHandler(true);
    }
  }, [addFriendDone]);

  useEffect(() => {
    if(addFriendError === true) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
  }, [addFriendError]);
  
  useEffect(() => {
    if(inputEl.current) {
      inputEl.current.focus();
    }
  }, []);

  const onClick = useCallback((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    dispatch({ type: INIT_ADD_FRIEND_STATE });
    cancelHandler(true);
  }, []);

  const onChange = useCallback((e) => {
    const name = e.target.name;
    const value = e.target.value;
    if(name === 'email') setEmail(value);
  }, []);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(email) {
      dispatch({
        type: ADD_FRIEND_REQUEST,
        data: { email }
      });
    }
  }, [email]);

  return (
    <>
      <DarkBackground>
        <SignupLayout>
          <Label>ガリンとも追加</Label>
          <StyledCloseIcon onClick={onClick}/>
          <AddFriendForm onSubmit={onSubmit}>
            <input
              name="email"
              type="email"
              placeholder="メール"
              value={email}
              onChange={onChange}
              ref={inputEl}
              required
            />
            {
              showErrorMessage &&
              <ErrorMsg>
                <div>該当のユーザを</div>
                <div>探せませんでした。</div>
              </ErrorMsg>
            }
          <button>追加</button>
        </AddFriendForm>
        </SignupLayout>
      </DarkBackground>
    </>
  );
};

export default AddFriend;