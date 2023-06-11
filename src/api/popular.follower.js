import axios from 'axios';

const baseUrl = 'https://young-lake-63146.herokuapp.com/api';

export const getPopularFollowers = async () => {
  try {
    const res = await axios.get(`${baseUrl}/followships?top=10`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsIm5hbWUiOiJ1c2VyMSIsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJhY2NvdW50IjoidXNlcjEiLCJyb2xlIjoidXNlciIsImF2YXRhciI6Imh0dHBzOi8vbG9yZW1mbGlja3IuY29tLzMyMC8yNDAvbWFuLz9yYW5kb209NzguNTI2ODYwMTEwMDk4ODIiLCJjb3ZlciI6Imh0dHBzOi8vbG9yZW1mbGlja3IuY29tLzE0NDAvNDgwL2NpdHkvP3JhbmRvbT04Mi43MjA0ODY1MTMzODU5MSIsImludHJvZHVjdGlvbiI6IkVzdCBtYWduaSBldCBxdWlhIHZvbHVwdGF0aWJ1cyBtYWduaSBtYWlvcmVzLiBDdW1xdWUgYmxhbmRpdGlpcyBhcGVyaWFtIHJhdGlvbmUgc3VudCBhc3Blcm5hdHVyIHZlbCAiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTEwVDA5OjM5OjUyLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTEwVDA5OjM5OjUyLjAwMFoiLCJpYXQiOjE2ODYzOTc4NTEsImV4cCI6MTY4ODk4OTg1MX0.LVqU2eqODThDxILlJ_0Bjwcs276VCRzx42OBHQYavso',
      },
    });
    return res.data;
  } catch (error) {
    console.error('[Get Popular Followers failed]: ', error);
  }
};