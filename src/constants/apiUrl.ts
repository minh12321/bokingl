

const url = import.meta.env.VITE_URL_LOADOUT;
if (!url) {
  throw new Error("VITE_URL_LOADOUT is not defined");
}
export const API_URL = {
  AUTH: {
    REGISTER: `${url}/api/v1/users/auth/register`,
    LOGIN: `${url}/api/v1/users/auth/login`,
    REFRESH: `${url}/api/v1/users/refresh`,
    LOGOUT: `${url}/api/v1/users/logout`,
  },

  USER: {
    PROFILE: `${url}/api/v1/users/profile`,
    PASSWORD: `${url}/api/v1/users/password`,
  },

  ADMIN_USER: {
    LIST: `${url}/api/v1/users/admin/users`,
    DETAIL: (uuid: string) => `${url}/api/v1/users/admin/users/${uuid}`,
  },
};
