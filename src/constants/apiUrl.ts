export const API_URL = {
  AUTH: {
    REGISTER: "http://localhost:3000/api/v1/users/auth/register",
    LOGIN: "http://localhost:3000/api/v1/users/auth/login",
    REFRESH: "http://localhost:3000/api/v1/auth/refresh",
    LOGOUT: "http://localhost:3000/api/v1/auth/logout",
  },

  USER: {
    PROFILE: "http://localhost:3000/api/v1/users/profile",
    PASSWORD: "http://localhost:3000/api/v1/users/password",
  },

  ADMIN_USER: {
    LIST: "http://localhost:3000/api/v1/admin/users",
    DETAIL: (uuid: string) => `http://localhost:3000/api/v1/admin/users/${uuid}`,
  },
};
