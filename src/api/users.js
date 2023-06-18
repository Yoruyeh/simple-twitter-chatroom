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
      return { success: true, ...data, token }
    }
  } catch (error) {
    console.error(`Login Failed: ${error}`)
    return { success: false, error }
  }
}

// settin 頁面
export async function settingPage({
  token,
  userid,
  name,
  account,
  email,
  password,
}) {
  try {
    const { data } = await axios.put(
      `${usersURL}/${userid}/setting`,
      {
        account,
        name,
        email,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return { success: true, message: data.message }
  } catch (error) {
    let message = ''
    console.error(`Setting Profile Filed: ${error.response.data.message}`)
    if (error.response.data.message.includes('信箱')) {
      message = '信箱已被註冊過 !'
    } else if (error.response.data.message.includes('帳號')) {
      message = '帳號已被註冊過 !'
    }
    return { success: false, message }
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

// 註冊
export async function registerAccount(
  username,
  account,
  email,
  password,
  checkPassword
) {
  try {
    const { data } = await axios.post(`${usersURL}`, {
      name: username,
      account,
      email,
      password,
      checkPassword,
    })

    return { success: true, ...data }
  } catch (error) {
    console.error(`Register Failed: ${error}`)
    return { success: false, error }
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
    console.error(`Get User Realied Tweets Failed: ${error}`)
  }
}

// 拿到使用者喜歡的tweet資料
export async function getUserLikes(token, userId) {
  try {
    // 取得 api 回傳資料
    const { data } = await axios.get(`${usersURL}/${userId}/likes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error) {
    console.error(`Get User Likes Tweets  Failed: ${error}`)
  }
}
