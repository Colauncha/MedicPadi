
import { apiUrl } from "./apiUrl";

const getToken = () => localStorage.getItem("token");

const request = async (endpoint, options = {}) => {
  const response = await fetch(apiUrl(endpoint), {
    ...options,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Notification request failed"
    );
  }

  return result;
};

// Get paginated notifications
export const getNotifications = ({
  limit = 10,
  page = 1,
  unreadOnly = false,
  search,
  role,
  order = "desc",
} = {}) => {
  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    order,
    unreadOnly: String(unreadOnly),
  });

  if (search) params.set("search", search);
  if (role) params.set("role", role);

  return request(`/api/notifications?${params.toString()}`);
};

// Get unread notification count
export const getUnreadNotificationCount = () =>
  request("/api/notifications/unread-count");

// Get one notification
export const getNotificationById = (id) =>
  request(`/api/notifications/${id}`);

// Mark one notification as read
export const markNotificationAsRead = (id) =>
  request(`/api/notifications/${id}/read`, {
    method: "PATCH",
  });

// Mark all notifications as read
export const markAllNotificationsAsRead = () =>
  request("/api/notifications/read-all", {
    method: "PATCH",
  });

// Delete notification
export const deleteNotification = (id) =>
  request(`/api/notifications/${id}`, {
    method: "DELETE",
  });

// List registered devices
export const getNotificationDevices = () =>
  request("/api/notifications/devices");

// Register a device
export const registerNotificationDevice = (data) =>
  request("/api/notifications/devices", {
    method: "POST",
    body: JSON.stringify(data),
  });

// Unregister a device
export const unregisterNotificationDevice = (token) =>
  request("/api/notifications/devices", {
    method: "DELETE",
    body: JSON.stringify({ token }),
  });
