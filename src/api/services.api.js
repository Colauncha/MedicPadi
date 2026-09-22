export const createLabTests = async (formData) => {
  try {
    const response = await fetch("/api/services/lab/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log("ADD LAB TEST RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Add Lab Test failed");
    }

    return data;
  } catch (error) {
    console.error("Add Lab Test Error:", error.message);
    throw error;
  }

};

export const listLabTests = async () => {
  try {
    const response = await fetch("/api/services/lab/tests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();


    if (!response.ok) {
      throw new Error(data.message || "Lab Test failed");
    }

    return data;
  } catch (error) {
    console.error("Lab Test Error:", error.message);
    throw error;
  }
};

export const labTestsById = async (id) => {
  try {
    const response = await fetch(`/api/services/lab/tests/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch lab test");
    }

    return data;
  } catch (error) {
    console.error("Fetch Lab Test Error:", error.message);
    throw error;
  }
};

export const updateLabTests = async (id, formData) => {
  try {
    const response = await fetch(`/api/services/lab/tests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Update Lab Test failed");
    }

    return data;
  } catch (error) {
    console.error("Update Lab Test Error:", error.message);
    throw error;
  }
};

export const deleteLabtests = async (id) => {
  try {
    const response = await fetch(`/api/services/lab/tests/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Delete Lab Test failed");
    }

    return data;
  } catch (error) {
    console.error("Delete Lab Test Error:", error.message);
    throw error;
  }
};


export const addPharmacyDrugs = async (formData) => {
  try {
    const { category: _, composition: __, ...restData } = formData;

    const response = await fetch("/api/services/pharmacy/drugs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(restData),
    });

    const data = await response.json();

    console.log("ADD PHARMACY DRUG RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Add Pharmacy Drug failed");
    }

    return data;
  } catch (error) {
    console.error("Add Pharmacy Drug Error:", error.message);
    throw error;
  }
};

export const listPharmacyDrugs = async () => {
  try {
    const response = await fetch("/api/services/pharmacy/drugs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    console.log("PHARMACY DRUG RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Pharmacy Drug failed");
    }

    return data;
  } catch (error) {
    console.error("Pharmacy Drug Error:", error.message);
    throw error;
  }
};

export const PharmacyDrugsById = async () => { };
export const updatePharmacyDrugs = async () => { };
export const deletePharmacyDrugs = async () => { };

export const createLabDepartments = async (formData) => {
  try {
    const response = await fetch("/api/services/lab/departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log("ADD LAB DEPARTMENT RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Add Lab Department failed");
    }

    return data;
  } catch (error) {
    console.error("Add Lab Test Error:", error.message);
    throw error;
  }

};

export const listLabDepartments = async () => {
  try {
    const response = await fetch("/api/services/lab/departments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    console.log("LAB DEPARTMENTS RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Lab Departments failed");
    }

    return data;
  } catch (error) {
    console.error("Lab Departments Error:", error.message);
    throw error;
  }
};

export const labDepartmentsById = async (id) => {
  try {
    const response = await fetch(`/api/services/lab/departments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch lab department");
    }

    return data;
  } catch (error) {
    console.error("Fetch Lab Department Error:", error.message);
    throw error;
  }
};

export const updateLabDepartments = async (id, formData) => {
  try {
    const response = await fetch(`/api/services/lab/departments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Update Lab Department failed");
    }

    return data;
  } catch (error) {
    console.error("Update Lab Department Error:", error.message);
    throw error;
  }
};

export const deleteLabDepartments = async (id) => {
  try {
    const response = await fetch(`/api/services/lab/departments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Delete Lab Department failed");
    }

    return data;
  } catch (error) {
    console.error("Delete Lab Department Error:", error.message);
    throw error;
  }
};
