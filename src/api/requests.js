import axios from "axios";

// const API_URL = 'http://10.8.88.91:8000/';
const API_URL = "http://10.8.99.171:8000/";
// const API_URL = 'http://10.8.18.31:8000/';
const TOKEN_KEY = "token";
// const REFRESH_TOKEN_KEY = 'refresh_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export const axiosInstance = axios.create({
  baseURL: API_URL,
});

// export const API_BASE_URL = 'http://10.8.88.91:8000/api/';
export const API_BASE_URL = "http://10.8.99.171:8000/api/";
// export const API_BASE_URL = 'http://10.8.18.31:8000/api/';

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         console.log('TOKEN SET', token);
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

axiosInstance.interceptors.request.use(
  (config) => {
    // Check for a custom flag to skip adding the Authorization header
    if (!config.headers["Skip-Auth"]) {
      const token = localStorage.getItem("token");
      console.log("TOKEN SET", token);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } else {
      // Remove the custom header before sending the request
      delete config.headers["Skip-Auth"];
      console.log("Skipping Authorization header for:", config.url);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//           const refreshToken = getRefreshToken();
//           const response = await axios.post(`${API_URL}/api/token/refresh/`, { refresh: refreshToken });
//           const { access } = response.data;
//           setToken(access, refreshToken);
//           originalRequest.headers.Authorization = `Bearer ${access}`;
//           return axiosInstance(originalRequest);
//         } catch (refreshError) {
//             clearToken();
//           return Promise.reject(refreshError);
//         }
//       }
//       return Promise.reject(error);
//     }
//   );

export const REQUESTS = {

  mainCalendarScreen: {
    getMainCalendarScreen: (params) =>
      axiosInstance.get("/api/main-screen-data/", {
        headers: {
          "Skip-Auth": true,
        },
        params: params, // Include the params here
      }),
  },

  analysisScreenOne: {
    getAnalysisScreenOne: (params) =>
      axiosInstance.get("/api/get-all-incomes/", {
        headers: {
          "Skip-Auth": true,
        },
        params: params,
      }),
  },
  auth: {
    login: (formData) => axiosInstance.post("/api/login/", formData),
    register: (username, password) =>
      axiosInstance.post("/register/", { username, password }),
    logout: () => axiosInstance.post("/logout/"),
  },
  user: {
    getUser: () => axiosInstance.get("/api/employees/"),
  },
  live: {
    getLive: () => axiosInstance.get("/api/daily-visitors"),
  },
  realtimelive: {
    getRealTimeLive: () => axiosInstance.get("/api/daily-visitors"),
  },
  
  // data: {
  //   getData: (date) => axiosInstance.get('/api/work-log/', { params: { date } }), // Adjust endpoint
  //   addData: (newData) => axiosInstance.post('/api/work-log/', newData),
  //   editData: (id, updatedData) => axiosInstance.put(`/api/work-log/${id}/`, updatedData),
  //   deleteData: (id) => axiosInstance.delete(`/api/work-log/${id}/`),
  //   sendAllData: (data) => axiosInstance.post('/api/work-log/', data),
  // },

  data: { 
    getData: (date) => axiosInstance.get('/api/work-log/', { params: { date } }), // Adjust endpoint
    addData: (newData) => axiosInstance.post('/api/work-log/', newData),
    editData: (id, updatedData) => axiosInstance.put(`/api/work-log/${id}/`, updatedData),
    deleteData: (id) => axiosInstance.delete(`/api/work-log/${id}/`),
    // Updated sendAllData to accept tableNumber and date
    sendAllData: (tableNumber, date, data) => axiosInstance.post(`/api/work-log/${tableNumber}/${date}/`, data),
  },
};
// console.log(getToken(), "get token");
// console.log(getRefreshToken(),'ok refresh')

