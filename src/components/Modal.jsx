import styled from 'styled-components';
import { OutlinedClose, OutlinedAddPhoto } from '../assets/icons';
import { InputButton } from './common/button.styled';
import { TweetModalInput, TweetReplyInput } from './TweetInput';
import { TweetItemInReply } from './TweetItem';
import AuthInput from './AuthInput';
import { useGetTweets } from '../context/GetTweets';
import { useGetSelectedTweet } from '../context/GetSelectedTweet';
import { useNavigate } from 'react-router-dom';

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
  position: relative;
  .reply-modal-account {
    font-size: 13px;
    color: var(--default);
    margin-top: 10px;
    margin-left: 82px;
    & > span {
      color: var(--main);
    }
  }
  .edit-name-count {
    font-size: 12px;
    color: var(--dark-80);
    position: absolute;
    top: 138px;
    right: 16px;
  }
  .edit-intro-count {
    font-size: 12px;
    color: var(--dark-80);
    position: absolute;
    top: 317px;
    right: 16px;
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
  grid-template-rows: 56px 1fr min-content 2fr 56px;
  position: relative;
  z-index: 2;

  &::after {
    content: '';
    width: 2px;
    height: 80px;
    background-color: var(--gray2);
    position: absolute;
    top: 135px;
    left: 48px;
    z-index: 99;
  }
`;

const StyledEditModalContainer = styled.div`
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
  background-image: url(${({ image }) => (image ? image : '')});
  background-size: cover;
  position: relative;
  .add-cover-button {
    position: absolute;
    top: 50%;
    left: 45%;
    transform: translate(-50%, -50%);
    & > path {
      fill: var(--dark-0);
    }
  }
  .delete-cover-button {
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    & > path {
      fill: var(--dark-0);
    }
  }
`;

const StyledEditAvatar = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 4px solid var(--dark-0);
  background-image: url(${({ image }) => (image ? image : '')});
  background-size: cover;
  position: absolute;
  top: 181px;
  left: 16px;
  .add-avatar-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    & > path {
      fill: var(--dark-0);
    }
  }
`;

const TweetModal = ({ placeholder, handleOpenTweetModal, currentMember }) => {
  const { tweetModalValue, handleClickTweetModal } = useGetTweets();
  return (
    <>
      <StyledTweetModalContainer>
        <StyledModalHeader>
          <OutlinedClose
            className="close-button"
            onClick={handleOpenTweetModal}
          />
        </StyledModalHeader>
        <StyledModalBody>
          <TweetModalInput
            placeholder={placeholder}
            currentMember={currentMember}
          />
        </StyledModalBody>
        <StyledModalFooter>
          {tweetModalValue.length > 140 && <p>字數不可超過140字</p>}
          <InputButton
            onClick={() => {
              handleClickTweetModal();
              handleOpenTweetModal();
            }}
          >
            推文
          </InputButton>
        </StyledModalFooter>
      </StyledTweetModalContainer>
    </>
  );
};

const ReplyModal = ({ selectedReplyItem, handleOpenReplyModal, currentMember }) => {
  const {replyInputValue, handleClickReplyInput} = useGetSelectedTweet()
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
            }}
          />
        </StyledModalHeader>
        <StyledModalBody>
          <TweetItemInReply selectedReplyItem={selectedReplyItem} />
        </StyledModalBody>
        <StyledModalBody>
          <p className="reply-modal-account">
            回覆給<span>@{selectedReplyItem.User.account}</span>
          </p>
        </StyledModalBody>
        <StyledModalBody>
          <TweetReplyInput
            placeholder={'推你的回覆'}
            currentMember={currentMember}
          />
        </StyledModalBody>
        <StyledModalFooter>
          {replyInputValue.length === 0 && <p>內容不可空白</p>}
          <InputButton 
          onClick={() => {
            handleClickReplyInput()
            handleOpenReplyModal()
            }}>回覆</InputButton>
        </StyledModalFooter>
      </StyledReplyModalContainer>
    </>
  );
};

const EditModal = () => {
  return (
    <>
      <StyledEditModalContainer>
        <StyledModalHeader>
          <OutlinedClose className="close-button" />
          <h5>編輯個人資料</h5>
          <InputButton className="save-button">儲存</InputButton>
        </StyledModalHeader>
        <StyledModalBody>
          <StyledEditCover
            image={
              'https://images.unsplash.com/photo-1685948595028-3c5023244556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
            }
          >
            <OutlinedAddPhoto className="add-cover-button" />
            <OutlinedClose className="delete-cover-button" />
          </StyledEditCover>
        </StyledModalBody>
        <StyledModalBody>
          <AuthInput
            placeholder={'John Doe'}
            label={'名稱'}
            className={'edit-modal-name'}
          />
          <p className="edit-name-count">8/50</p>
          <AuthInput
            placeholder={'John Doe'}
            label={'自我介紹'}
            className={'edit-modal-introduction'}
          />
          <p className="edit-intro-count">0/160</p>
        </StyledModalBody>
        <StyledEditAvatar
          image={
            'https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=601&q=80'
          }
        >
          <OutlinedAddPhoto className="add-avatar-button" />
        </StyledEditAvatar>
      </StyledEditModalContainer>
    </>
  );
};

export { TweetModal, ReplyModal, EditModal };