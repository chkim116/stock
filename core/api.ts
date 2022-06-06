import axios from "axios";

export const api = axios;

export const getFetcher = (url: string) => api.get(url).then((res) => res.data);
