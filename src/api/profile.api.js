const BASE = "/api/profile";

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

// POST /api/profile 
export const createProfile = async (profileData) => {
  try {
    const response = await fetch(BASE, {
      method: "POST",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(profileData),
    });
    return await handleResponse(response, "Failed to save profile information");
  } catch (error) {
    console.error("Profile Creation Error:", error.message);
    throw error;
  }
};

// GET /api/profile/retrieve 
export const retrieveProfile = async () => {
  try {
    const response = await fetch(`${BASE}/retrieve`, {
      method: "GET",
      headers: authHeaders(),
    });
    return await handleResponse(response, "Failed to retrieve profile");
  } catch (error) {
    console.error("Retrieve Profile Error:", error.message);
    throw error;
  }
};

// PATCH /api/profile 
export const updateProfile = async (profileData) => {
  try {
    const response = await fetch(BASE, {
      method: "PATCH",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(profileData),
    });
    return await handleResponse(response, "Failed to update profile");
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    throw error;
  }
};

// DELETE /api/profile 
export const deleteProfile = async () => {
  try {
    const response = await fetch(BASE, {
      method: "DELETE",
      headers: authHeaders(),
    });
    return await handleResponse(response, "Failed to delete profile");
  } catch (error) {
    console.error("Delete Profile Error:", error.message);
    throw error;
  }
};

// GET /api/profile/{id}?role=consultant 
export const getProfileById = async (id, role) => {
  try {
    const query = role ? `?role=${encodeURIComponent(role)}` : "";
    const response = await fetch(`${BASE}/${id}${query}`, {
      method: "GET",
      headers: authHeaders(),
    });
    return await handleResponse(response, "Profile not found");
  } catch (error) {
    console.error("Get Profile By ID Error:", error.message);
    throw error;
  }
};

// GET /api/profile/doctors/speciality
export const getDoctorSpecialities = async () => {
  try {
    const response = await fetch(`${BASE}/doctors/speciality`, {
      method: "GET",
      headers: authHeaders(),
    });
    return await handleResponse(response, "Failed to retrieve specialities");
  } catch (error) {
    console.error("Get Doctor Specialities Error:", error.message);
    throw error;
  }
};

// POST /api/profile/profile-picture 
export const uploadProfilePicture = async (file) => {
  try {
    const imageForm = new FormData();
    imageForm.append("image", file);

    const response = await fetch(`${BASE}/profile-picture`, {
      method: "POST",
      headers: authHeaders(),
      body: imageForm,
    });

    if (!response.ok) {
      const raw = await response.text();
      let message = `Upload failed (${response.status})`;
      if (response.status === 413) {
        message = "That image is too large -- please use a file under 2MB.";
      } else {
        try {
          message = JSON.parse(raw).message || message;
        } catch {
          // raw wasn't JSON either -- keep the generic message above
        }
      }
      throw new Error(message);
    }

    return await response.json();
  } catch (error) {
    console.error("Upload Profile Picture Error:", error.message);
    throw error;
  }
};

// PATCH /api/profile/settings 
export const updateSettings = async (settings) => {
  try {
    const response = await fetch(`${BASE}/settings`, {
      method: "PATCH",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(settings),
    });
    return await handleResponse(response, "Failed to update settings");
  } catch (error) {
    console.error("Update Settings Error:", error.message);
    throw error;
  }
};

// PATCH /api/profile/education 
export const updateEducation = async (education) => {
  try {
    const response = await fetch(`${BASE}/education`, {
      method: "PATCH",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ education }),
    });
    return await handleResponse(response, "Failed to update education");
  } catch (error) {
    console.error("Update Education Error:", error.message);
    throw error;
  }
};

// PATCH /api/profile/business-hours
export const updateBusinessHours = async (businessHours) => {
  try {
    const response = await fetch(`${BASE}/business-hours`, {
      method: "PATCH",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(businessHours),
    });
    return await handleResponse(response, "Failed to update business hours");
  } catch (error) {
    console.error("Update Business Hours Error:", error.message);
    throw error;
  }
};

// GET /api/profile/reviews 
export const listReviews = async (params = {}) => {
  try {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null),
    ).toString();

    const response = await fetch(`${BASE}/reviews${query ? `?${query}` : ""}`, {
      method: "GET",
      headers: authHeaders(),
    });
    return await handleResponse(response, "Failed to load reviews");
  } catch (error) {
    console.error("List Reviews Error:", error.message);
    throw error;
  }
};

// GET /api/profile/reviews/{id}
export const getReviewById = async (id) => {
  try {
    const response = await fetch(`${BASE}/reviews/${id}`, {
      method: "GET",
      headers: authHeaders(),
    });
    return await handleResponse(response, "Review not found");
  } catch (error) {
    console.error("Get Review By ID Error:", error.message);
    throw error;
  }
};