const BASE = "/api/orders/appointments";

function authHeaders(extra = {}) {
  const token = localStorage.getItem("token");
  return {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...extra,
  };
}

async function handleResponse(response, fallbackMessage) {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || fallbackMessage);
  }
  return data;
}

export const listAppointments = async (params = {}) => {
  try {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null),
    ).toString();

    const response = await fetch(`${BASE}${query ? `?${query}` : ""}`, {
      method: "GET",
      headers: authHeaders(),
    });

    return await handleResponse(response, "Failed to load appointments");
  } catch (error) {
    console.error("List Appointments Error:", error.message);
    throw error;
  }
};

// GET /api/orders/appointments/{id}
export const getAppointment = async (id) => {
  try {
    const response = await fetch(`${BASE}/${id}`, {
      method: "GET",
      headers: authHeaders(),
    });

    return await handleResponse(response, "Appointment not found");
  } catch (error) {
    console.error("Get Appointment Error:", error.message);
    throw error;
  }
};

// PATCH /api/orders/appointments/{id} 
export const updateAppointment = async (id, updates) => {
  try {
    const response = await fetch(`${BASE}/${id}`, {
      method: "PATCH",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(updates),
    });

    return await handleResponse(response, "Failed to update appointment");
  } catch (error) {
    console.error("Update Appointment Error:", error.message);
    throw error;
  }
};

// DELETE /api/orders/appointments/{id} 
export const cancelAppointment = async (id) => {
  try {
    const response = await fetch(`${BASE}/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    return await handleResponse(response, "Failed to cancel appointment");
  } catch (error) {
    console.error("Cancel Appointment Error:", error.message);
    throw error;
  }
};

// GET /api/orders/appointments/{id}/accept 
export const acceptAppointment = async (id) => {
  try {
    const response = await fetch(`${BASE}/${id}/accept`, {
      method: "GET",
      headers: authHeaders(),
    });

    return await handleResponse(response, "Failed to accept appointment");
  } catch (error) {
    console.error("Accept Appointment Error:", error.message);
    throw error;
  }
};

// GET /api/orders/appointments/{id}/complete 
export const completeAppointment = async (id) => {
  try {
    const response = await fetch(`${BASE}/${id}/complete`, {
      method: "GET",
      headers: authHeaders(),
    });

    return await handleResponse(response, "Failed to complete appointment");
  } catch (error) {
    console.error("Complete Appointment Error:", error.message);
    throw error;
  }
};

// GET /api/orders/appointments/{id}/signature 
export const getAppointmentSignature = async (id) => {
  try {
    const response = await fetch(`${BASE}/${id}/signature`, {
      method: "GET",
      headers: authHeaders(),
    });

    return await handleResponse(response, "Could not get meeting signature");
  } catch (error) {
    console.error("Get Appointment Signature Error:", error.message);
    throw error;
  }
};