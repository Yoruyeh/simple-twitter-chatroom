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

export const getRepliesById = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/${id}/replies`);
    return res.data;
  } catch (error) {
    console.error('[Get Replies failed]: ', error);
  }
};


export const createReply = async (payload) => {
  const { comment } = payload;

  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets/:tweets_id/replies`, {
      comment
    });
    return res.data;
  } catch (error) {
    console.error('[Create Reply failed]: ', error);
  }
};