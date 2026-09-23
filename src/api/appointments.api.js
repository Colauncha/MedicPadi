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

// GET /api/orders/appointments 
export const listAppointmentsByStatus = async (status) => {
  try {
    const response = await fetch(`${BASE}?status=${encodeURIComponent(status)}`, {
      method: "GET",
      headers: authHeaders(),
    });

    const data = await handleResponse(response, `Failed to load ${status} appointments`);
    if (Array.isArray(data)) return data;
    return data?.data || data?.items || data?.results || [];
  } catch (error) {
    console.error(`List Appointments (${status}) Error:`, error.message);
    throw error;
  }
};

export const listAppointmentsByStatuses = async (statuses) => {
  const results = await Promise.all(statuses.map((s) => listAppointmentsByStatus(s)));
  return results.flat();
};

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