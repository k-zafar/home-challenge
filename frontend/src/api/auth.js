import apiClient from "../utils/apiClient";
import { getToken } from "../utils/tokenUtils";

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

/**
 * Gets the current user's data.
 * @returns {Promise<object>} - The response data from the API.
 */
export const getUser = async () => {
  return apiClient("/user", {}, null, "GET", {
    Authorization: `Bearer ${getToken("authToken")}`,
  });
};

/**
 * Updates the current user's data.
 * @param {object} userData - The user data to update.
 * @returns {Promise<object>} - The response data from the API.
 */
export const updateUser = async (userData) => {
  return apiClient("/user/update", {}, userData, "POST", {
    Authorization: `Bearer ${getToken("authToken")}`,
  });
};

/**
 * Resets the user's password.
 * @param {object} passwordData - The current and new password data.
 * @returns {Promise<object>} - The response data from the API.
 */
export const resetPassword = async (passwordData) => {
  return apiClient("/user/reset-password", {}, passwordData, "POST", {
    Authorization: `Bearer ${getToken("authToken")}`,
  });
};

