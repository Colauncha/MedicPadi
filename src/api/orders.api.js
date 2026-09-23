export const listDrugRequisitions = async () => {
  try {
    const response = await fetch("/api/orders/drug-requisitions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    console.log("DRUG REQUISITION RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Drug Requisition failed");
    }

    return data;
  } catch (error) {
    console.error("Drug Requisition Error:", error.message);
    throw error;
  }
};

export const labStats = async () => {
  try {
    const response = await fetch("/api/orders/stats/lab", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    console.log("LAB STATS RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Lab Stats failed");
    }

    return data;
  } catch (error) {
    console.error("Lab Stats Error:", error.message);
    throw error;
  }
};