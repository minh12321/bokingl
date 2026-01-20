import axiosClient from "./axiosClient";
import { API_URL } from "@/constants/apiUrl";
import { User } from "@/model/User.model";

export const adminUserApi = {
  getList() {
    return axiosClient.get<User[]>(
      API_URL.ADMIN_USER.LIST
    );
  },

  createUser(data: {
    full_name: string;
    email: string;
    password: string;
    role_id: number;
  }) {
    return axiosClient.post<User>(
      API_URL.ADMIN_USER.LIST,
      data
    );
  },

  getDetail(uuid: string) {
    return axiosClient.get<User>(
      API_URL.ADMIN_USER.DETAIL(uuid)
    );
  },

  update(uuid: string, data: Partial<User>) {
    return axiosClient.put<User>(
      API_URL.ADMIN_USER.DETAIL(uuid),
      data
    );
  },

  delete(uuid: string) {
    return axiosClient.delete(
      API_URL.ADMIN_USER.DETAIL(uuid)
    );
  },
};
