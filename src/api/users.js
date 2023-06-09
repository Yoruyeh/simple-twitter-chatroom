import axios from 'axios'

const usersURL = 'https://young-lake-63146.herokuapp.com/api/users'

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
