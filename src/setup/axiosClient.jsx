import axios from "axios";

const createAxiosInstance = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const instance = axios.create({
    baseURL: apiUrl,
  });
  instance.interceptors.request.use(async (config) => {
    const SITE_ID = "9";
    config.headers["Companyid"] = SITE_ID;
    return config;
  });

  return instance;
};

const client = createAxiosInstance();
export default client;
