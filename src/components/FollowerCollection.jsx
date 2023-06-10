import FollowerItem from './FollowerItem'
import { useState } from 'react';

const FollowerCollection = () => {
  const [isUnfollow, setIsUnFollow] = useState(false)

  const handleClickFollow = () => {
    setIsUnFollow(!isUnfollow)
  }

  return (
    <>
  <div className="follow-item-wrapper">
    <FollowerItem isUnfollow={isUnfollow} handleClickFollow={handleClickFollow}/>
  </div>
  <div className="follow-item-wrapper">
    <FollowerItem isUnfollow={isUnfollow} handleClickFollow={handleClickFollow}/>
  </div>
  <div className="follow-item-wrapper">
    <FollowerItem isUnfollow={isUnfollow} handleClickFollow={handleClickFollow}/>
  </div>
  <div className="follow-item-wrapper">
    <FollowerItem isUnfollow={isUnfollow} handleClickFollow={handleClickFollow}/>
  </div>
  <div className="follow-item-wrapper">
    <FollowerItem isUnfollow={isUnfollow} handleClickFollow={handleClickFollow}/>
  </div>
  <div className="follow-item-wrapper">
    <FollowerItem isUnfollow={isUnfollow} handleClickFollow={handleClickFollow}/>
  </div>
    </>
  );
};

export default FollowerCollection;