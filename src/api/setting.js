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

export const editAccountInfo = async (id, payload) => {
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

export const editPersonalInfo = async (id, payload) => {
  const { userData } = payload
  try {
    const res = await axiosInstance.put(`${baseUrl}/users/${id}`, {
      ...userData
    });
    return res.data;
  } catch (error) {
    console.error('[Edit Personal failed]: ', error);
  }
};

// export const uploadAvatar = async (id, formData) => {
//   try {
//     const res = await axiosInstance.put(`${baseUrl}/users/${id}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     return res.data;
//   } catch (error) {
//     console.error('[Upload Avatar failed]: ', error);
//   }
// };

export const uploadAvatar = async (id, formData) => {
  try {
    const res = await axiosInstance.put(`${baseUrl}/users/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
      console.log('from api:', res.data)
      return res.data;
  } catch (error) {
    console.error('[Upload Avatar failed]: ', error);
  }
};
