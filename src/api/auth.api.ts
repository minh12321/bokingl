import axiosClient from "./axiosClient";
import { API_URL } from "@/constants/apiUrl";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "@/model/Auth.model";

export const authApi = {
  register(data: RegisterRequest) {
    return axiosClient.post<AuthResponse>(
      API_URL.AUTH.REGISTER,
      data
    );
  },

  login(data: LoginRequest) {
    return axiosClient.post<AuthResponse>(
      API_URL.AUTH.LOGIN,
      data
    );
  },

  refresh() {
    return axiosClient.post<{ accessToken: string }>(
      API_URL.AUTH.REFRESH
    );
  },

  logout() {
    return axiosClient.post(API_URL.AUTH.LOGOUT);
  },
};
