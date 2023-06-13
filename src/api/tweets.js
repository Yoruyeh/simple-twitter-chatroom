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

export const getTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets`);
    return res.data;
  } catch (error) {
    console.error('[Get Tweets failed]: ', error);
  }
};

export const getTweetById = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Get The Tweet failed]: ', error);
  }
};

export const createTweet = async (payload) => {
  const { description } = payload;

  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets`, {
      description
    });
    return res.data;
  } catch (error) {
    console.error('[Create Tweet failed]: ', error);
  }
};