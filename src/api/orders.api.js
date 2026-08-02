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
