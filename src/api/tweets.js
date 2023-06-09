import axios from 'axios';

const baseUrl = 'https://young-lake-63146.herokuapp.com/api';

export const getTweets = async () => {
  try {
    const res = await axios.get(`${baseUrl}/tweets`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE0LCJuYW1lIjoidXNlcjUiLCJlbWFpbCI6InVzZXI1QGV4YW1wbGUuY29tIiwiYWNjb3VudCI6InVzZXI1Iiwicm9sZSI6InVzZXIiLCJhdmF0YXIiOiJodHRwczovL2xvcmVtZmxpY2tyLmNvbS8zMjAvMjQwL21hbi8_cmFuZG9tPTE5LjA0MzczNzUxNzE3ODg0NyIsImNvdmVyIjoiaHR0cHM6Ly9sb3JlbWZsaWNrci5jb20vMTQ0MC80ODAvY2l0eS8_cmFuZG9tPTI1LjQ2MzgzODk0NzUxMTM4NCIsImludHJvZHVjdGlvbiI6IkNvbnNlcXV1bnR1ciB2b2x1cHRhdGlidXMgYWxpYXMgcmVpY2llbmRpcyBkb2xvcmUgZXN0IG1vbGVzdGlhZSBldCB2aXRhZS4gUXVpIGVzdCBtb2xlc3RpYXMgdm9sdXB0YXQiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTA4VDA2OjI4OjExLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTA4VDA2OjI4OjExLjAwMFoiLCJpYXQiOjE2ODYyMTUxNjQsImV4cCI6MTY4ODgwNzE2NH0._KK4Ro0ofKOD6Vr8b1HIiIAGtjr4lVMSbaJVZzQ1Q9A',
      },
    });
    return res.data;
  } catch (error) {
    console.error('[Get Tweets failed]: ', error);
  }
};
