import axios from 'axios'

const adminURL = 'https://young-lake-63146.herokuapp.com/api/admin'

// 後台登入
export async function adminLogin(account, password) {
  try {
    const { data } = await axios.post(`${adminURL}/signin`, {
      account,
      password,
    })
    const { token } = data.data

    if (token) {
      return { success: true, ...data.data }
    }
    return data
  } catch (error) {
    console.error(`Admin Login Failed: ${error}`)
    return { success: false, error }
  }
}

// 所有tweet
export async function adminGetTweets(token) {
  try {
    const { status, data } = await axios.get(`${adminURL}/tweets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return { status, data }
  } catch (error) {
    console.error(`Admin Get User Failed: ${error}`)
    return { status: error.response.status }
  }
}

// 所有使用者
export async function adminGetUsers(token) {
  try {
    const { status, data } = await axios.get(`${adminURL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return { status, data }
  } catch (error) {
    console.error(`Admin Get User Failed: ${error}`)
    return { status: error.response.status }
  }
}

// 刪除指定tweet
export async function adminDeleteTweet(token, tweetID) {
  try {
    const { status } = await axios.delete(`${adminURL}/tweets/${tweetID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return status
  } catch (error) {
    console.log(`Delete Admin Tweet Faild: ${error}`)
    return error.response.status
  }
}
