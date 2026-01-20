export const API_URL = {
  AUTH: {
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    REFRESH: "/api/v1/auth/refresh",
    LOGOUT: "/api/v1/auth/logout",
  },

  USER: {
    PROFILE: "/api/v1/users/profile",
    PASSWORD: "/api/v1/users/password",
  },

  ADMIN_USER: {
    LIST: "/api/v1/admin/users",
    DETAIL: (uuid: string) => `/api/v1/admin/users/${uuid}`,
  },
};
