import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://calm-tan-bighorn-sheep-tutu.cyclic.app',
});

export default api;
