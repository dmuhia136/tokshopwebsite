import axios from "axios";

// export const baseUrl = "http://localhost:5000";
export const baseUrl = "http://34.209.43.223:3000";
export const imgUrl = "http://34.209.43.223:3000/public/img";

export const Axios = axios.create({
  baseURL: baseUrl,
});
