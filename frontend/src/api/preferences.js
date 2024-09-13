import apiClient from "../utils/apiClient";
import { getToken } from "../utils/tokenUtils";

/**
 * Gets the categorie's data.
 * @returns {Promise<object>} - The response data from the API.
 */
export const getCategories = async () => {
  return apiClient("/categories", {}, null, "GET", {
    Authorization: `Bearer ${getToken("authToken")}`,
  });
};

/**
 * Gets the source's data.
 * @returns {Promise<object>} - The response data from the API.
 */
export const getSources = async () => {
  return apiClient("/sources", {}, null, "GET", {
    Authorization: `Bearer ${getToken("authToken")}`,
  });
};

/**
 * Gets the author's data.
 * @returns {Promise<object>} - The response data from the API.
 */
export const getAuthors = async () => {
  return apiClient("/authors", {}, null, "GET", {
    Authorization: `Bearer ${getToken("authToken")}`,
  });
};

/**
 * Get the user soruces.
 * @returns {Promise<object>} - The response data from the API.
 */
export const getUserSources = async () => {
  return apiClient("/user/sources", {}, null, "GET", {
    Authorization: `Bearer ${getToken("authToken")}`,
  });
};

/**
 * Get the user categories.
 * @returns {Promise<object>} - The response data from the API.
 */
export const getUserCategories = async () => {
  return apiClient("/user/categories", {}, null, "GET", {
    Authorization: `Bearer ${getToken("authToken")}`,
  });
};

/**
 * Get the user authers.
 * @returns {Promise<object>} - The response data from the API.
 */
export const getUserAuthors = async () => {
  return apiClient("/user/authors", {}, null, "GET", {
    Authorization: `Bearer ${getToken("authToken")}`,
  });
};

/**
 * Set the user preferences.
 * @returns {Promise<object>} - The response data from the API.
 */
export const setUserPreferences = async (preferencesData) => {
  return apiClient("/articles/set-preferences", {}, preferencesData, "POST", {
    Authorization: `Bearer ${getToken("authToken")}`,
  });
};
