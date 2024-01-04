import Cookies from "js-cookie";
import { ROLE_TOKEN_KEY, TOKEN_KEY } from "./constant";

export const setAuthToken = (token) => {
  if (token !== undefined && token !== null) {
    Cookies.set(TOKEN_KEY, token, {
      expires: 7,
    });
  }
};
export const setAuthTokenRole = (token) => {
  if (token !== undefined && token !== null) {
    Cookies.set(ROLE_TOKEN_KEY, token, {
      expires: 7,
    });
  }
};

export const getAuthToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeAuthToken = () => {
  Cookies.remove(TOKEN_KEY);
};
