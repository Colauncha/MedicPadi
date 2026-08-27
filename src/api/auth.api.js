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

export const resetPassword = async ({ email, otp, newPassword }) => {
  try {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp, newPassword }),
    });
 
    const data = await response.json();
 
    if (!response.ok) {
      throw new Error(data.message || "Password reset failed");
    }
 
    return data;
  } catch (error) {
    console.error("Password Reset Error:", error.message);
    throw error;
  }
};

export const sendVerificationMail = async (email) => {
  try {
    const response = await fetch("/api/auth/send-verification-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
 
    const data = await response.json();
 
    if (!response.ok) {
      throw new Error(data.message || "Could not send verification email");
    }
 
    return data;
  } catch (error) {
    console.error("Send Verification Mail Error:", error.message);
    throw error;
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await fetch(
      `/api/auth/verify-email?token=${encodeURIComponent(token)}`,
      { method: "GET" },
    );
 
    const data = await response.json();
 
    if (!response.ok) {
      throw new Error(data.message || "Email verification failed");
    }
 
    return data;
  } catch (error) {
    console.error("Verify Email Error:", error.message);
    throw error;
  }
};

export const updateAccount = async (updates) => {
  try {
    const token = localStorage.getItem("token");
 
    const response = await fetch("/api/auth/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(updates),
    });
 
    const data = await response.json();
 
    if (!response.ok) {
      throw new Error(data.message || "Account update failed");
    }
 
    return data;
  } catch (error) {
    console.error("Update Account Error:", error.message);
    throw error;
  }
};

export const adminUpdateAccount = async (userId, updates) => {
  try {
    const token = localStorage.getItem("token");
 
    const response = await fetch("/api/auth/admin/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ userId, ...updates }),
    });
 
    const data = await response.json();
 
    if (!response.ok) {
      throw new Error(data.message || "Admin update failed");
    }
 
    return data;
  } catch (error) {
    console.error("Admin Update Account Error:", error.message);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
 
    const response = await fetch("/api/auth/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ userId }),
    });
 
    const data = await response.json();
 
    if (!response.ok) {
      throw new Error(data.message || "Delete user failed");
    }
 
    return data;
  } catch (error) {
    console.error("Delete User Error:", error.message);
    throw error;
  }
};

export const getUserWallet = async () => {
  try {
    const token = localStorage.getItem("token");
 
    const response = await fetch("/api/auth/wallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
 
    const data = await response.json();
 
    if (!response.ok) {
      throw new Error(data.message || "Could not retrieve wallet");
    }
 
    return data;
  } catch (error) {
    console.error("Get Wallet Error:", error.message);
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

export const retrieveProfile = async () => {
  try {
    const token = localStorage.getItem("token");
 
    const response = await fetch("/api/profile/retrieve", {
      method: "GET",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
 
    const data = await response.json();
 
    if (!response.ok) {
      throw new Error(data.message || "Failed to retrieve profile");
    }
 
    return data;
  } catch (error) {
    console.error("Retrieve Profile Error:", error.message);
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem("token");
 
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(profileData),
    });
 
    const data = await response.json();
 
    if (!response.ok) {
      throw new Error(data.message || "Failed to update profile");
    }
 
    return data;
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    throw error;
  }
};

export const uploadProfilePicture = async (file) => {
  try {
    const token = localStorage.getItem("token");
    const imageForm = new FormData();
    imageForm.append("image", file);
 
    const response = await fetch("/api/profile/profile-picture", {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: imageForm,
    });
 
    const data = await response.json();
 
    if (!response.ok) {
      throw new Error(data.message || "Image upload failed");
    }
 
    return data;
  } catch (error) {
    console.error("Upload Profile Picture Error:", error.message);
    throw error;
  }
};
