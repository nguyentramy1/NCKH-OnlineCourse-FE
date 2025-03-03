import Axios from "axios";

export const baseURL = process.env.REACT_APP_BASE_URL;

const Api = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60 * 1000,
  validateStatus: (status) => {
    return status >= 200 && status < 400;
  },
});

export const setTokenHeader = (accessToken: string | null) => {
  Api.defaults.headers["Authorization"] = accessToken
    ? `Bearer ${accessToken}`
    : null;
  if (accessToken) sessionStorage.setItem("token", accessToken);
  else sessionStorage.removeItem("token");
};

Api.interceptors.response.use(
  // Trả về data cho client
  (response) => {
    return response.data;
  },

  (error) => {
    if (!!error.response) {
      return Promise.reject(error.response.data.message);
    }
    return Promise.reject(error);
  },
);

export default Api;
