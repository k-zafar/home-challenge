const BASE_URL = "http://localhost:8000/api";

/**
 * Function to make API requests.
 * @param {string} endpoint - The API endpoint.
 * @param {object} [params] - Optional query parameters for GET requests.
 * @param {object} [body] - Optional request body for POST requests.
 * @param {string} [method] - HTTP method (GET, POST, PUT, DELETE).
 * @returns {Promise<object>} - The response data from the API.
 */
const apiClient = async (
  endpoint,
  params = {},
  body = null,
  method = "GET"
) => {
  try {
    // Construct the URL with query parameters if provided
    const url = new URL(`${BASE_URL}${endpoint}`);
    if (method === "GET" && Object.keys(params).length) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    }

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || `HTTP error! Status: ${response.status}`;
      const validationErrors = errorData.errors || {};

      // Create a custom error object with details
      const error = new Error(errorMessage);
      error.details = validationErrors;

      throw error;
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default apiClient;
