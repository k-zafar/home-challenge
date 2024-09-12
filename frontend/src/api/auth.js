import apiClient from "../utils/apiClient";

/**
 * Registers a new user.
 * @param {object} userData - The user data to send in the request body.
 * @returns {Promise<object>} - The response data from the API.
 */
export const registerUser = async (userData) => {
  return apiClient("/register", {}, userData, "POST");
};

/**
 * Logs in a user.
 * @param {object} credentials - The login credentials (email and password).
 * @returns {Promise<object>} - The response data from the API.
 */
export const loginUser = async (credentials) => {
  return apiClient("/login", {}, credentials, "POST");
};
