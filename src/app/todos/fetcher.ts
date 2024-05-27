// export const fetcher = (url: string) => fetch(url).then((res) => res.json());

import axios from "axios";

//* Set Axios Base URL
axios.defaults.baseURL = process.env.PATH_API_URL;

//* Fetcher Function
export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
