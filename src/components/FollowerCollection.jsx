import FollowerItem from './FollowerItem'

const FollowerCollection = ({ userFollows }) => {

  return (
    <div>
      {userFollows && userFollows.map((follow) => {
        return (
          <div className="follow-item-wrapper" key={follow.followerId || follow.followingId}>
            <FollowerItem follow={follow} followed={follow.followed || follow.isfollowed}/>
          </div>
        )
      })}
    </div>
  )
};

export default FollowerCollection;