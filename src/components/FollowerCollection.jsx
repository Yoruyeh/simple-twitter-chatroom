import FollowerItem from './FollowerItem'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserFollowerById } from '../api/user.follower'

const FollowerCollection = () => {
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
};

export default FollowerCollection;