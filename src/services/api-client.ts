import axios, { CanceledError } from "axios";

export { CanceledError };

// const refreshCacheApiClient = axios.create({
//   baseURL: "http://localhost:3000",
//   withCredentials: true,
// });
const port = import.meta.env.VITE_PORT || '3000';
const domain = import.meta.env.VITE_DOMAIN || 'localhost';

// Construct the base URL
const baseURL = `http://${domain}:${port}`;

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
const getAccessToken = () => {
  return localStorage.getItem('ACCESS_TOKEN_KEY');
};
const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/refresh', { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    saveTokens(accessToken, newRefreshToken);
    return accessToken;

    // localStorage.setItem('accessToken', accessToken);
    // localStorage.setItem('refreshToken', newRefreshToken);

 //   apiClient.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;

  }
};
// apiClient.get('/userpost')
//   .then(response => {
//     console.log('Response data:', response.data);

//   })
//   .catch(error => {
//     if (error.response.status === 401) {
//       refreshToken();
//     }
//   });
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    //refreshToken();
    //return Promise.reject(error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return refreshToken().then((accessToken) => {
        if (accessToken) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }
      });
    }
  }
  
);

// apiClient.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
  
//       if (
//       //  error.response.status === 401 &&
//         !originalRequest._retry &&
//         !originalRequest.url.includes("/auth/login")
//       ) {
//         originalRequest._retry = true;
  
//         // try {
//         //   await refreshCacheApiClient.get("/auth/refresh");
//         //   return await axios(originalRequest);
//         // } catch (error) {
//         //   //window.location.href = "/login";
//         //   console.log("Error: ", error);
//         // }
//       }
  
//       return Promise.reject(error);
//     }
//   );
  

export default apiClient;