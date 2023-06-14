import axios from 'axios';

const baseUrl = 'https://young-lake-63146.herokuapp.com/api';

const axiosInstance = axios.create({
  baseUrl: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);

export const getUserFollowersById = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}/followers`);
    return res.data;
  } catch (error) {
    console.error('[Get User Followers failed]: ', error);
  }
};

export const getUserFollowingsById = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}/followings`);
    return res.data;
  } catch (error) {
    console.error('[Get User Followings failed]: ', error);
  }
};

export const Follow = async (payload) => {
  const { id } = payload;

  try {
    const res = await axiosInstance.post(`${baseUrl}/followships`, {
      id
    });
    return res.data;
  } catch (error) {
    console.error('[Create Follow failed]: ', error);
  }
};

export const UnFollow = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/followships/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Delete Follow failed]: ', error);
  }
};