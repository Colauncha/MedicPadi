import { apiUrl } from "./apiUrl";
import { Fetch } from "./Fetch";

export const createLabTests = async (formData) => {
  try {
    const response = await Fetch(apiUrl("/api/services/lab/tests"), {
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
    const response = await Fetch(apiUrl("/api/services/lab/tests"), {
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
    const response = await Fetch(apiUrl(`/api/services/lab/tests/${id}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to Fetch lab test");
    }

    return data;
  } catch (error) {
    console.error("Fetch Lab Test Error:", error.message);
    throw error;
  }
};

export const updateLabTests = async (id, formData) => {
  try {
    const response = await Fetch(apiUrl(`/api/services/lab/tests/${id}`), {
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
    const response = await Fetch(apiUrl(`/api/services/lab/tests/${id}`), {
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
    const { category: _, ...restData } = formData;

    const response = await Fetch(apiUrl("/api/services/pharmacy/drugs"), {
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
    const response = await Fetch(apiUrl("/api/services/pharmacy/drugs"), {
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

export const pharmacyDrugsById = async (id) => {
  try {
    const response = await Fetch(apiUrl(`/api/services/pharmacy/drugs/${id}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to Fetch pharmacy drug");
    }

    return data;
  } catch (error) {
    console.error("Fetch pharmacy drug Error:", error.message);
    throw error;
  }
};

export const updatePharmacyDrugs = async (id, formData) => {
  try {
    const { category: _, ...restData } = formData;

    let response = await Fetch(apiUrl(`/api/services/pharmacy/drugs/${id}`), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(restData),
    });

    if (response.status === 404 || response.status === 405) {
      response = await Fetch(apiUrl(`/api/services/pharmacy/drugs/${id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(restData),
      });
    }

    const data = await response.json();

    console.log("UPDATE PHARMACY DRUG RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Update Pharmacy Drug failed");
    }

    return data;
  } catch (error) {
    console.error("Update Pharmacy Drug Error:", error.message);
    throw error;
  }
};

export const deletePharmacyDrugs = async (id) => {
  try {
    const response = await Fetch(apiUrl(`/api/services/pharmacy/drugs/${id}`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Delete Pharmacy Drug failed");
    }

    return data;
  } catch (error) {
    console.error("Delete Pharmacy Drug Error:", error.message);
    throw error;
  }
};

export const drugUploadPicture = async (id, formData) => {
  try {
    const body =
      formData instanceof FormData
        ? formData
        : formData instanceof File
          ? (() => {
              const fd = new FormData();
              fd.append("file", formData);
              fd.append("image", formData);
              return fd;
            })()
          : formData;

    const response = await Fetch(apiUrl(`/api/services/pharmacy/drugs/${id}/image`), {
      method: "POST",
      credentials: "include",
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to upload drug image");
    }

    return data;
  } catch (error) {
    console.error("Upload drug image Error:", error.message);
    throw error;
  }
};

export const createLabDepartments = async (formData) => {
  try {
    const response = await Fetch(apiUrl("/api/services/lab/departments"), {
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
    const response = await Fetch(apiUrl("/api/services/lab/departments"), {
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
    const response = await Fetch(apiUrl(`/api/services/lab/departments/${id}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to Fetch lab department");
    }

    return data;
  } catch (error) {
    console.error("Fetch Lab Department Error:", error.message);
    throw error;
  }
};

export const updateLabDepartments = async (id, formData) => {
  try {
    const response = await Fetch(apiUrl(`/api/services/lab/departments/${id}`), {
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
    const response = await Fetch(apiUrl(`/api/services/lab/departments/${id}`), {
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

export const createDrugCategory = async (formData) => {
  try {
    const response = await Fetch(apiUrl("/api/services/pharmacy/categories"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log("ADD DRUG CATEGORY RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Add Drug Category failed");
    }

    return data;
  } catch (error) {
    console.error("Add Drug Category Error:", error.message);
    throw error;
  }
};

export const listDrugCategories = async () => {
  try {
    const response = await Fetch(apiUrl("/api/services/pharmacy/categories"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    console.log("DRUG CATEGORIES RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Drug Categories failed");
    }

    return data;
  } catch (error) {
    console.error("Drug Categories Error:", error.message);
    throw error;
  }
};

export const pharmacyDrugCategoriesById = async (id) => {
  try {
    const response = await Fetch(apiUrl(`/api/services/pharmacy/categories/${id}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to Fetch drug categories");
    }

    return data;
  } catch (error) {
    console.error("Fetch drug categories Error:", error.message);
    throw error;
  }
};

export const updateDrugCategory = async (id, formData) => {
  try {
    let response = await Fetch(apiUrl(`/api/services/pharmacy/categories/${id}`), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    // If PATCH is not supported, fallback to PUT
    if (response.status === 404 || response.status === 405) {
      response = await Fetch(apiUrl(`/api/services/pharmacy/categories/${id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Update Drug Category failed");
    }

    return data;
  } catch (error) {
    console.error("Update Drug Category Error:", error.message);
    throw error;
  }
};

export const deleteDrugCategory = async (id) => {
  try {
    const response = await Fetch(apiUrl(`/api/services/pharmacy/categories/${id}`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Delete Drug Category failed");
    }

    return data;
  } catch (error) {
    console.error("Delete Drug Category Error:", error.message);
    throw error;
  }
};
