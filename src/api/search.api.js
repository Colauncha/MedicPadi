
import { apiUrl } from "./apiUrl";

export const globalSearch = async (query) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please log in to continue.");
  }

  const params = new URLSearchParams({
    q: query,
    limit: "5",
  });

  const response = await fetch(apiUrl(`/api/search?${params}`), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Search failed.");
  }

  return data;
};
