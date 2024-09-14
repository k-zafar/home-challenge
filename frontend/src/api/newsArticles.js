import apiClient from "../utils/apiClient";
import { getToken } from "../utils/tokenUtils";

/**
 * Gets the news articles data.
 * @returns {Promise<object>} - The response data from the API.
 */
export const getnewsArticles = async (page, filter) => {
  return apiClient(
    "/articles",
    {
      page,
      search: filter.search,
      source: filter.source,
      category: filter.category,
      from: filter.startDate,
      to: filter.endDate,
    },
    null,
    "GET",
    {
      Authorization: `Bearer ${getToken("authToken")}`,
    }
  );
};
