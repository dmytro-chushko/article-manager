import axios, { AxiosError } from 'axios';
import 'dotenv/config';

export const axiosClient = axios.create({
  baseURL: process.env.NEWS_DATA_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // paramsSerializer: (params: Record<string, string>) =>
  //   qs.stringify({ ...params }),
});
console.log(process.env.NEWS_DATA_API_BASE_URL);
axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error: AxiosError) => {
    throw error;
  },
);
