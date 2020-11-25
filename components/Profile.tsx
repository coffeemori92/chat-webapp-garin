import React, { useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import { DarkBackground, ImageArea, Label, ProfileForm, ProfileLayout, StyledCloseIcon } from '../styles/ProfileStyle';
import { EDIT_PROFILE_REQUEST } from '../store/constants/user';

interface Profile {
  visible: boolean;
  cancelHandler(cancel: boolean): void;
};

const Profile = ({ visible, cancelHandler }: Profile) => {
  
  if(!visible) return null;

  const { me } = useSelector((state: any) => state.user);
  const [attachmentImage, setAttachmentImage] = useState(null);
  const [nickname, setNickname] = useState(me.nickname);
  const [shortMsg, setShortMst] = useState(me.shortMsg);
  const dispatch = useDispatch();
  const imageUpload = useRef(null);
  
  const onClick = useCallback((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    cancelHandler(true);
  }, []);

  const onClickCameraButton = useCallback(e => {
    if(imageUpload.current) {
      imageUpload.current.click();
    }
  }, []);

  const onChange = useCallback(e => {
    const name = e.target.name;
    const value = e.target.value;
    if(name === 'nickname') setNickname(value);
    if(name === 'shortMsg') setShortMst(value);
  }, []);

  const onChangeImage = useCallback(e => {
    if(e.target.files.length) {
      const theFile = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const result = e.currentTarget.result;
        setAttachmentImage(result);
      }
      reader.readAsDataURL(theFile);
    }
  }, []);

  const onSubmit = useCallback(e => {
    e.preventDefault();
    if(attachmentImage) {
      dispatch({
        type: EDIT_PROFILE_REQUEST, 
        data: { nickname, shortMsg, attachmentImage } 
      });
    } else {
      dispatch({
        type: EDIT_PROFILE_REQUEST, 
        data: { nickname, shortMsg } 
      });
    }
    cancelHandler(true);
  }, [nickname, shortMsg, attachmentImage]);

  return (
    <>
      <DarkBackground>
        <ProfileLayout>
          <Label>プロフィール</Label>
          <StyledCloseIcon onClick={onClick}/>
          <ProfileForm onSubmit={onSubmit}>
            <ImageArea>
              <input 
                type="file" 
                name="image"
                accept="image/*"
                ref={imageUpload}
                onChange={onChangeImage}
                hidden
                />
              {
                !attachmentImage &&
                <img src={me.photoURL} />
              }
              {
                attachmentImage &&
                <img src={attachmentImage} />
              }
              <CameraAltOutlinedIcon onClick={onClickCameraButton}/>
            </ImageArea>
            <input
              name="nickname"
              type="text"
              placeholder="なまえ"
              onChange={onChange}
              value={nickname}
              required
            />
            <input
              name="shortMsg"
              type="text"
              placeholder="ショットメッセージ"
              onChange={onChange}
              value={shortMsg}
            />
            <button>確認</button>
          </ProfileForm>
        </ProfileLayout>
      </DarkBackground>
    </>
  );
};

export default Profile;