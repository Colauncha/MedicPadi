import { apiUrl } from "./apiUrl";

export const listTransactions = async (page = 1, limit = 10) => {
  try {
    const query = new URLSearchParams();
    if (page) query.append("page", page);
    if (limit) query.append("limit", limit);
    const queryString = query.toString() ? `?${query.toString()}` : "";

    const response = await fetch(apiUrl(`/api/transactions${queryString}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    console.log("LIST TRANSACTION RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "List transaction failed");
    }

    return data;
  } catch (error) {
    console.error("List transaction Error:", error.message);
    throw error;
  }
};
