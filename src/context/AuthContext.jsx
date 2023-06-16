import { createContext, useState, useEffect, useContext } from 'react';
import { login } from '../api/users';
import { checkPermission } from '../api/checkPermission';
import jwt_decode from 'jwt-decode';

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  // register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState({
    id: 14,
    name: 'user1',
    email: 'user1@example.com',
    account: 'user1',
    role: 'user',
    avatar: 'https://loremflickr.com/320/240/man/?random=18.718352068923494',
    cover: 'https://loremflickr.com/1440/480/city/?random=67.32648393466276',
    introduction: 'hi',
  });

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }
      try {
        const result = await checkPermission(token);
        if (result) {
          setIsAuthenticated(true);
          const tempPayload = jwt_decode(token);
          setPayload(tempPayload);
        } else {
          setIsAuthenticated(false);
          setPayload(null);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkTokenIsValid();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload,
        // register: async (data) => {
        //   const { success, authToken } = await register({
        //     username: data.username,
        //     email: data.email,
        //     password: data.password,
        //   });
        //   const tempPayload = jwt.decode(authToken);
        //   if (tempPayload) {
        //     setPayload(tempPayload);
        //     setIsAuthenticated(true);
        //     localStorage.setItem('authToken', authToken);
        //   } else {
        //     setPayload(null);
        //     setIsAuthenticated(false);
        //   }
        //   return success;
        // },
        login: async (data) => {
          const { success, token } = await login({
            account: data.account,
            password: data.password,
          });
          const tempPayload = jwt_decode(token);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('token', token);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        logout: () => {
          localStorage.removeItem('token');
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};