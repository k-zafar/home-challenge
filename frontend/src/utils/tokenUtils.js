import Cookies from "js-cookie";

/**
 * Retrieves the token from Cookies.
 * @param {string} name - The name of the cookie.
 * @returns {string} - The auth token.
 */
export const getToken = (name) => {
  return Cookies.get(name) || "";
};

/**
 * Sets the token in Cookies.
 * @param {string} name - The name of the cookie.
 * @param {string} token - The auth token to set.
 * @param {number} [expires=1] - Optional number of days until the cookie expires. Default is 1 day.
 */
export const setToken = (name, token, expires = 1) => {
  Cookies.set(name, token, { expires });
};

/**
 * Removes the auth token from Cookies.
 * @param {string} name - The name of the cookie.
 */
export const removeToken = (name) => {
  Cookies.remove(name);
};
