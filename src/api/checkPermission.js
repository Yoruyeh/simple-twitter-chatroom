import axios from 'axios'

const userURL = 'https://young-lake-63146.herokuapp.com/api/user'

export async function checkPermission(token) {
  try {
    // 根據傳入的 token 驗證取得回傳資料
    const { data } = await axios.get(userURL, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    // return 取得資料
    return data
  } catch (error) {
    console.error('Check Permission Failed:', error)
  }
}
