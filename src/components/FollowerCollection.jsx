import FollowerItem from './FollowerItem'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserFollowersById, getUserFollowingsById } from '../api/user.follower'

const FollowerCollection = () => {
  const [userFollows, setUserFollows] = useState([])
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (window.location.pathname.includes('followers')) {
          result = await getUserFollowersById(id);
        } else if (window.location.pathname.includes('followings')) {
          result = await getUserFollowingsById(id);
        }
        setUserFollows(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {userFollows.map((follow) => {
        return (
          <div className="follow-item-wrapper" key={follow.followerId || follow.followingId}>
            <FollowerItem follow={follow}/>
          </div>
        )
      })}
    </div>
  )
};

export default FollowerCollection;