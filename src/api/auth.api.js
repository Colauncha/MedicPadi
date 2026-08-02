export const createUser = async (userData) => {
  try {
    const { confirmPassword: _, ...restData } = userData;

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restData),
    });

    const data = await response.json();

    console.log("BACKEND RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return data;
  } catch (error) {
    console.error("Failed API Call:", error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    console.log("LOGIN RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log("LOGOUT RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Logout failed");
    }

    return data;
  } catch (error) {
    console.error("Logout Error:", error.message);
    throw error;
  }
};

export const requestPasswordReset = async (email) => {
  if (typeof email !== "string" || !email.trim()) {
    throw new Error("Email is required and must be a valid string.");
  }

  try {
    const response = await fetch("/api/auth/request-password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Password reset request failed");
    }

    return data;
  } catch (error) {
    console.error("Password Reset Request Error:", error.message);
    throw error;
  }
};

export const createProfile = async (profileData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save profile information");
    }

    return data;
  } catch (error) {
    console.error("Profile Creation Error:", error.message);
    throw error;
  }
};
