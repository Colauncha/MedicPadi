export const createLabTests = async (formData) => {
  try {
    const response = await fetch("/api/services/lab/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(restData),
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

    console.log("LAB TEST RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Lab Test failed");
    }

    return data;
  } catch (error) {
    console.error("Lab Test Error:", error.message);
    throw error;
  }
};

export const labTestsById = async () => { };
export const updateLabTests = async () => { };
export const deleteLabtests = async () => { };

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

export const createLabDepartments = async () => { };

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

export const labDepartmentsById = async () => { };
export const updateLabDepartments = async () => { };
export const deleteLabDepartments = async () => { };
