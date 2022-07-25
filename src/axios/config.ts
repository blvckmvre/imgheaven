import axios from "axios";
import { IUserData } from "../types/auth";

export const baseURL =
  process.env.REACT_APP_URL || "http://localhost:3001";

export const $req = axios.create({
  baseURL,
  withCredentials: true,
});

$req.interceptors.request.use((config) => {
  config.headers!.Authorization = "Bearer " + localStorage.getItem("access");
  return config;
});

$req.interceptors.response.use(
  (res) => res,
  async (e) => {
    try {
      if (!e.config || e.config.repeats || e.response.status !== 401) throw e;
      e.config.repeats = true;
      const res = await axios.get<IUserData>(baseURL + "/auth/refresh", {
        withCredentials: true,
      });
      localStorage.setItem("access", res.data.accessToken);
      return $req.request(e.config);
    } catch (e) {
      throw e;
    }
  }
);
