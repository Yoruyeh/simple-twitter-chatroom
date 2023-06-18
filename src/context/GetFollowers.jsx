// import { createContext, useContext, useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   getUserInfo,
// //   getUserTweets,
// //   getUserReplies,
// //   getUserLikes,
// // } from '../api/other.users';
// // import { useAuth } from './AuthContext';
// // import {
// //   getUserFollowersById,
// //   getUserFollowingsById,
// // } from '../api/user.follower';
// // import { getTweetById } from '../api/tweets';
// // import { useGetSelectedTweet } from './GetSelectedTweet';

// const GetUserFollowersContext = createContext(() => {});

// export const useGetFollowersTweets = () => useContext(GetUserFollowersContext);

// export const GetUserTweetsProvider = ({ children }) => {
//   // const navigate = useNavigate();
//   const [popularFollowers, setPopularFollowers] = useState([]);

//   const handleFollowClicked = async (id) => {
//     if (currentMember.id === id) {
//       return
//     }
//     try {
//       await Follow({ 
//         id: id 
//       })
//       const popularObject = await getPopularFollowers();
//       const populars = popularObject.users
//       setPopularFollowers(populars)

//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const handleUnFollowClicked = async (id) => {
//     try {
//       await UnFollow(id)
//       const popularObject = await getPopularFollowers();
//       const populars = popularObject.users
//       setPopularFollowers(populars)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   // const handleAvatarClick = async (id) => {
//   //   try {
//   //     const info = await getUserInfo(id);
//   //     setUserInfo(info);
//   //     const tweets = await getUserTweets(id);
//   //     setUserTweets(tweets);
//   //     if (currentMember.id === Number(id)) {
//   //       navigate(`/${id}`);
//   //     } else {
//   //       navigate(`/others/${id}`);
//   //     }
//   //     const replies = await getUserReplies(id);
//   //     setUserReplies(replies);
//   //     const likes = await getUserLikes(id);
//   //     setUserLikes(likes);
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   // const handleReplyIconClickedAtOther = async (id) => {
//   //   setOpenReplyModal(true);
//   //   setIsModalLoading(true);
//   //   try {
//   //     const tweet = await getTweetById(id);
//   //     setSelectedReplyItem(tweet);
//   //     setIsModalLoading(false);
//   //     navigate(`/others/${userInfo.id}/tweets/${id}/reply`);
//   //   } catch (error) {
//   //     console.error(error);
//   //     setIsModalLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   if (isAuthenticated) {
//   //     const getUserInfoAsync = async () => {
//   //       try {
//   //         const info = await getUserInfo(currentMember.id);
//   //         setCurrentMemberInfo(info);
//   //       } catch (error) {
//   //         console.error(error);
//   //       }
//   //     };
//   //     getUserInfoAsync();
//   //     const getUserFollowersByIdAsync = async () => {
//   //       try {
//   //         const followers = await getUserFollowersById(currentMember.id);
//   //         if(followers) {
//   //           setCurrentMemberFollowers(followers);
//   //         } else {
//   //           return
//   //         }
//   //       } catch (error) {
//   //         console.error(error);
//   //       }
//   //     };
//   //     getUserFollowersByIdAsync();
//   //     const getUserFollowingsByIdAsync = async () => {
//   //       try {
//   //         const followings = await getUserFollowingsById(currentMember.id);
//   //         if(followings) {
//   //           setCurrentMemberFollowings(followings);
//   //         } else {
//   //           return
//   //         }
//   //       } catch (error) {
//   //         console.error(error);
//   //       }
//   //     };
//   //     getUserFollowingsByIdAsync();
//   //   }
//   // }, [currentMember, isAuthenticated]);

//   return (
//     <GetUserFollowersContext.Provider
//       value={{}}
//     >
//       {children}
//     </GetUserFollowersContext.Provider>
//   );
// };