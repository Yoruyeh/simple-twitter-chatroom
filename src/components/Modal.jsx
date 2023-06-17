import styled from 'styled-components';
import { useState, useRef } from 'react'
import { OutlinedClose, OutlinedAddPhoto } from '../assets/icons';
import { InputButton } from './common/button.styled';
import { TweetModalInput, TweetReplyInput } from './TweetInput';
import { TweetItemInReply } from './TweetItem';
import { AuthInput, TextAreaInput } from './AuthInput';
import { useGetTweets } from '../context/GetTweets';
import { useGetSelectedTweet } from '../context/GetSelectedTweet';
import { useNavigate } from 'react-router-dom';
import { editPersonalInfo, uploadFile } from '../api/setting'
import { getUserInfo } from '../api/other.users'
import { useGetUserTweets } from '../context/GetUserTweets';

const StyledModalHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid var(--gray1);
  position: relative;
  .close-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 19px;

    & > path {
      fill: var(--main);

      &:hover {
        cursor: pointer;
      }
    }
  }

  .save-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
  }

  h5 {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 70px;
  }
`;

const StyledModalBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .tweet-item-wrapper{
    height: 50%;

    & p {
    position: absolute;
    z-index: 2;
    top: 45%;
    font-size: 13px;
    color: var(--default);
    margin: 0 30px 0 82px;

    & > span {
      color: var(--main);
    }
  }
  }
  .tweet-input-wrapper {
    height: 50%;
  }
`;

const StyledModalFooter = styled.footer`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 16px;
  p {
    font-size: 15px;
    color: var(--danger);
    margin-right: 20px;
  }
`;

const StyledTweetModalContainer = styled.div`
  background-color: var(--dark-0);
  width: 600px;
  height: 300px;
  border-radius: 14px;
  border: 1px solid var(--gray1);
  display: grid;
  grid-template-rows: 56px 1fr 56px;
  position: relative;
  z-index: 2;
`;

const StyledReplyModalContainer = styled.div`
  background-color: var(--dark-0);
  width: 600px;
  height: 450px;
  border-radius: 14px;
  border: 1px solid var(--gray1);
  display: grid;
  grid-template-rows: 56px 1fr 56px;
  position: relative;
  z-index: 2;

  &::after {
    content: '';
    width: 2px;
    height: 86px;
    background-color: var(--gray2);
    position: absolute;
    top: 139px;
    left: 48px;
    z-index: 99;
  }
`;

const StyledEditModalContainer = styled.div`
  background-color: var(--dark-0);
  width: 634px;
  height: 610px;
  border-radius: 14px;
  border: 1px solid var(--gray1);
  display: grid;
  grid-template-rows: 56px 200px 1fr;
  position: relative;
  z-index: 2;
`;

const StyledEditCover = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .add-cover-button {
    position: absolute;
    top: 50%;
    left: 45%;
    transform: translate(-50%, -50%);
    z-index: 5;

    & svg > path {
      fill: var(--dark-0);
      z-index: 4;
    }
    :hover {
      cursor: pointer;
    }
  }
  .delete-cover-button {
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    z-index: 5;

    & svg > path {
      z-index: 4;
      fill: var(--dark-0);
    }
    :hover {
      cursor: pointer;
    }
  }
`;

const StyledEditAvatar = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 4px solid var(--dark-0);
  position: absolute;
  top: 181px;
  left: 16px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  .add-avatar-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    & svg > path {
      fill: var(--dark-0);
      z-index: 4;
    }
    :hover {
      cursor: pointer;
    }
  }
`;

const StyledPersonalInfoForm = styled.form`
  margin: 80px 16px 40px 16px;
  height: 100%;
  display: flex;
  flex-direction: column;

  .edit-name-count, .edit-intro-count {
    color: var(--dark-80);
    font-size: 12px;
    text-align: end;
    margin: 8px 0;
  }
`


const TweetModal = ({ placeholder, handleOpenTweetModal, currentMemberInfo }) => {
  const { tweetModalValue, handleClickTweetModal, setTweetModalValue } = useGetTweets();
  return (
    <>
      <StyledTweetModalContainer>
        <StyledModalHeader>
          <OutlinedClose
            className="close-button"
            onClick={() => {
            handleOpenTweetModal()
            setTweetModalValue('')
            }}
          />
        </StyledModalHeader>
        <StyledModalBody>
          <TweetModalInput
            placeholder={placeholder}
            currentMemberInfo={currentMemberInfo}
          />
        </StyledModalBody>
        <StyledModalFooter>
          {tweetModalValue.trim().length === 0 && <p>內容不可空白</p>}
          {tweetModalValue.length > 140 && <p>字數不可超過140字</p>}
          <InputButton
            onClick={() => {
              handleClickTweetModal();
            }}
          >
            推文
          </InputButton>
        </StyledModalFooter>
      </StyledTweetModalContainer>
    </>
  );
};

const ReplyModal = ({ selectedReplyItem, handleOpenReplyModal, currentMemberInfo }) => {
  const {replyInputValue, handleClickReplyInput, setReplyInputValue} = useGetSelectedTweet()
  const navigate = useNavigate()

  return (
    <>
      <StyledReplyModalContainer>
        <StyledModalHeader>
          <OutlinedClose
            className="close-button"
            onClick={() => {
              handleOpenReplyModal()
              navigate(-1)
              setReplyInputValue('')
            }}
          />
        </StyledModalHeader>
        <StyledModalBody>
          <div className="tweet-item-wrapper">
            <TweetItemInReply selectedReplyItem={selectedReplyItem} />
            <p>
              回覆給<span>@{selectedReplyItem.User.account}</span>
            </p>
          </div>
            <div className="tweet-input-wrapper">  
            <TweetReplyInput
            placeholder={'推你的回覆'}
            currentMemberInfo={currentMemberInfo}/>
            </div>   
        </StyledModalBody>
        <StyledModalFooter>
          {replyInputValue.trim().length > 140 && <p>字數不可超過140字</p>}
          {replyInputValue.trim().length === 0 && <p>內容不可空白</p>}
          <InputButton 
          onClick={() => {
            handleClickReplyInput()
            }}>回覆</InputButton>
        </StyledModalFooter>
      </StyledReplyModalContainer>
    </>
  );
};

const EditModal = ({ handleOpenEditModal }) => {
  const { currentMemberInfo, setCurrentMemberInfo } = useGetUserTweets()
  const coverInputRef = useRef(null)
  const avatarInputRef = useRef(null)
  const [editNameValue, setEditNameValue] = useState(currentMemberInfo.name)
  const [editIntroValue, setEditIntroValue] = useState(currentMemberInfo.introduction)
  const [cover, setCover] = useState('')
  const [avatar, setAvatar] = useState('')
  const [realAvatarUrl, setRealAvatarUrl] = useState('')
  const [realCoverUrl, setRealCoverUrl] = useState('')

  // 加入這一行來觸發隱藏的 input 的點擊事件
  const handleUploadCover = () => {
    coverInputRef.current.click(); 
  };

  const handleUploadAvatar = () => {
    avatarInputRef.current.click(); 
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('cover', file); 
    const imageURL = URL.createObjectURL(file)
    setCover(imageURL)

    try {
        const response = await uploadFile(currentMemberInfo.id, formData)
        setRealCoverUrl(response.updatedUser.cover)
    } catch (err) {
        console.error(err);
    }
  }


const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file); 
    const imageURL = URL.createObjectURL(file)
    setAvatar(imageURL)

    try {
        const response = await uploadFile(currentMemberInfo.id, formData)
        setRealAvatarUrl(response.updatedUser.avatar)
    } catch (err) {
        console.error(err);
    }
};



const handleNameChange = (value) => {
  setEditNameValue(value)
}

  const handleIntroChange = (value) => {
    setEditIntroValue(value)
  }

//   const handleRemoveImage = (e) => {
//     URL.revokeObjectURL(image.url)
//     setCover(null)
//     if (inputRef.current) {
//       inputRef.current.value = ""
//   }
// }

 const handleSaveClick = async () => {
    const userData = {
      name: editNameValue,
      introduction: editIntroValue,
      avatar: realAvatarUrl,
      cover: realCoverUrl,
    }
    try {
      await editPersonalInfo(currentMemberInfo.id, {
        userData
      });
      const newInfo = await getUserInfo(currentMemberInfo.id);
      setCurrentMemberInfo(newInfo);
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      <StyledEditModalContainer>
        <StyledModalHeader>
          <OutlinedClose className="close-button" 
          onClick={() => {
            handleOpenEditModal()
          }}/>
          <h5>編輯個人資料</h5>
          <InputButton className="save-button" 
          onClick={() => {
            handleSaveClick()
            handleOpenEditModal()
          }}
          >
            儲存</InputButton>
        </StyledModalHeader>
        <StyledModalBody>
          <StyledEditCover>
            <input type="file" id="cover-input" accept="image/*" style={{display: "none"}} name="cover"
            ref={coverInputRef} onChange={handleCoverChange}/>
          <img
            alt="user-cover"
            src={cover ? cover : currentMemberInfo.cover}/>
            <span className="add-cover-button" onClick={handleUploadCover}><OutlinedAddPhoto/></span>
            <span className="delete-cover-button"><OutlinedClose/></span>
          </StyledEditCover>
        </StyledModalBody>
        <StyledModalBody>
          <StyledPersonalInfoForm>
          <AuthInput label='名稱' 
          value={editNameValue ? editNameValue : currentMemberInfo.name} 
          onChange={(e) => {
            handleNameChange(e.target.value)}}/>
          <p className="edit-name-count">{editNameValue ? editNameValue.length : 0}/50</p>
          <TextAreaInput label='自我介紹'
          onChange={(e) => {
            handleIntroChange(e.target.value)}}
            value={editIntroValue} />
          <p className="edit-intro-count">{editIntroValue ? editIntroValue.length : 0}/160</p>
          </StyledPersonalInfoForm>
        </StyledModalBody>
        <StyledEditAvatar>
          <input type="file" id="avatar-input" accept="image/*" style={{display: "none"}} name="avatar"
          ref={avatarInputRef} onChange={handleAvatarChange}/>
          <img
            alt="user-avatar"
            src={avatar ? avatar : currentMemberInfo.avatar}/>
          <span className="add-avatar-button" onClick={handleUploadAvatar}><OutlinedAddPhoto /></span>
        </StyledEditAvatar>
      </StyledEditModalContainer>
    </>
  );
};

export { TweetModal, ReplyModal, EditModal }