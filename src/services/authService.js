import { axiosInstance } from './axiosConfig';
import { clearTokens, saveTokens, getAccessToken } from './tokenService';

// authService.js
const authService = {
  isAuthenticated: getAccessToken() !== null,
  userType: localStorage.getItem('userType') || null,
  // eslint-disable-next-line no-unused-vars
  login: async (email, password) => {
    const response = await axiosInstance.post('/user/login', { email, password });

    if (response.status === 200) {
      // Save tokens to local storage
      saveTokens({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token
      });

      console.log(response.data);

      authService.isAuthenticated = true;
      authService.userType = response.data.user_type;
      localStorage.setItem('userType', response.data.user_type);
      return response.data;
    }

    throw new Error('Login failed');
  },
  logout: () => {
    clearTokens();
    authService.isAuthenticated = false;
    authService.userType = null;
    localStorage.removeItem('userType');
  }
};

export default authService;
