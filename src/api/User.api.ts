import axiosClient from "./axiosClient";
import { API_URL } from "@/constants/apiUrl";
import { User } from "@/model/User.model";

export const userApi = {
  getProfile() {
    return axiosClient.get<User>(API_URL.USER.PROFILE);
  },

  updateProfile(data: Partial<User>) {
    return axiosClient.put<User>(
      API_URL.USER.PROFILE,
      data
    );
  },

  changePassword(data: {
    old_password: string;
    new_password: string;
  }) {
    return axiosClient.put(
      API_URL.USER.PASSWORD,
      data
    );
  },
};
