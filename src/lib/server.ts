import type { AxiosResponse } from 'axios';
import axios from 'axios';

export const BASE_API_URL = process.env.API_URL;

export const API = axios.create({
  baseURL: BASE_API_URL,
});

API.interceptors.response.use((response: AxiosResponse) => {
  return response;
});
