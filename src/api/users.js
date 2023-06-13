import axios from 'axios'

const usersURL = 'https://young-lake-63146.herokuapp.com/api/users'

// 登入頁面
export async function login({ account, password }) {
  try {
    const { data } = await axios.post(`${usersURL}/signin`, {
      account,
      password,
    })
    const { token } = data

    if (token) {
      return { success: true, ...data }
    }
  } catch (error) {
    console.error(`Login Failed: ${error}`)
    return { success: false, error }
  }
}

// 拿到相對應 user info資料
export async function getUser(token, userId) {
  try {
    const { data } = await axios.get(`${usersURL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error) {
    console.error(`Get User Profile Failed: ${error}`)
  }
}

// 拿到某個使用者的所有推文
export async function getUserTweet(token, userId) {
  try {
    // 取得 api 回傳資料
    const { data } = await axios.get(`${usersURL}/${userId}/tweets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error) {
    console.error(`Get User Tweet Failed: ${error}`)
  }
}

// 拿到使用者回覆的tweet資料
export async function getUserReplied(token, userId) {
  try {
    // 取得 api 回傳資料
    const { data } = await axios.get(`${usersURL}/${userId}/replied_tweets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error) {
    console.error(`Get User Tweet Failed: ${error}`)
  }
}
