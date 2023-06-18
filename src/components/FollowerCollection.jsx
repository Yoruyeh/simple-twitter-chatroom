import FollowerItem from './FollowerItem'

const FollowerCollection = ({ userFollows, handleUnFollowClicked, handleFollowClicked }) => {

  if (userFollows.isEmpty) {
    return null
  } else {
    return (
    <div>
      {userFollows && userFollows.map((follow) => {
        return (
          <div className="follow-item-wrapper" key={follow.followerId || follow.followingId}>
            <FollowerItem follow={follow} followed={follow.followed || follow.isfollowed} handleFollowClicked={handleFollowClicked} handleUnFollowClicked={handleUnFollowClicked}/>
          </div>
        )
      })}
    </div>
  )
  }
};

export default FollowerCollection;