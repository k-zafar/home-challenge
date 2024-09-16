import apiClient from "../utils/apiClient";
import { getToken } from "../utils/tokenUtils";

/**
 * Gets the news articles data.
 * @returns {Promise<object>} - The response data from the API.
 */
export const getnewsArticles = async (page, path = "/home", filter = null) => {

  const params = { page, path };

  if (filter) {
    params.to = filter.endDate;
    params.source = filter.source;
    params.search = filter.search;
    params.from = filter.startDate;
    params.category = filter.category;
  }

  return apiClient(
    "/articles",
    params,
    null,
    "GET",
    {
      Authorization: `Bearer ${getToken("authToken")}`,
    }
  );
};


/**
 * Gets the news article by id.
 * @returns {Promise<object>} - The response data from the API.
 */
export const getNewsArticle = async (id) => {
  return apiClient(
    `/article/${id}`, {}, null, "GET",
    {
      Authorization: `Bearer ${getToken("authToken")}`,
    }
  );
};