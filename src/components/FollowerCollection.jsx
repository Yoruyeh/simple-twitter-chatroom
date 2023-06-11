import FollowerItem from './FollowerItem'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserFollowerById } from '../api/user.follower'

const FollowerCollection = () => {
  // const [isUnfollow, setIsUnFollow] = useState(false)

  const [userFollowers, setUserFollowers] = useState([])
  const paramsId = useParams().id

  useEffect(() => {
    const getUserFollowerByIdAsync = async () => {
      try {
        const result = await getUserFollowerById(paramsId);
        setUserFollowers(result);
      } catch (error) {
        console.error(error);
      }
    };
    getUserFollowerByIdAsync();
}, [paramsId]);

  if (userFollowers === null) {
    return <div>Loading...</div>;
  }

  // const handleClickFollow = () => {
  //   setIsUnFollow(!isUnfollow)
  // }

  return (
    <div>
      {userFollowers.map((follower) => {
        return (
          <div className="follow-item-wrapper" key={follower.followerId}>
            <FollowerItem follower={follower}/>
          </div>
        )
      })}
    </div>
  )


  // return (
  //   <>
  // <div className="follow-item-wrapper">
  //   <FollowerItem isUnfollow={isUnfollow} handleClickFollow={handleClickFollow}/>
  // </div>
  // <div className="follow-item-wrapper">
  //   <FollowerItem isUnfollow={isUnfollow} handleClickFollow={handleClickFollow}/>
  // </div>
  // <div className="follow-item-wrapper">
  //   <FollowerItem isUnfollow={isUnfollow} handleClickFollow={handleClickFollow}/>
  // </div>
  // <div className="follow-item-wrapper">
  //   <FollowerItem isUnfollow={isUnfollow} handleClickFollow={handleClickFollow}/>
  // </div>
  // <div className="follow-item-wrapper">
  //   <FollowerItem isUnfollow={isUnfollow} handleClickFollow={handleClickFollow}/>
  // </div>
  // <div className="follow-item-wrapper">
  //   <FollowerItem isUnfollow={isUnfollow} handleClickFollow={handleClickFollow}/>
  // </div>
  //   </>
  // );
};

export default FollowerCollection;