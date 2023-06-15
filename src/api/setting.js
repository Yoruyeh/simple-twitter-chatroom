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

export const editAccountInfo = async ({ id, payload }) => {
  const { userData } = payload
  try {
    const res = await axiosInstance.put(`${baseUrl}/users/${id}/setting`, {
      userData
    });
    return res.data;
  } catch (error) {
    console.error('[Edit Account failed]: ', error);
  }
};
