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
  }
}

// 根據 token 拿到相對應 user資料
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
