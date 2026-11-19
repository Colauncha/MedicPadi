
import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
  Bell,
  BellRing,
  CheckCheck,
  CircleCheck,
  Inbox,
  CalendarDays,
  Trash2,
  UserRound,
  FileText,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../../../api/notifications.api";

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({
    total: 0,
    total_pages: 1,
    page: 1,
    limit: 10,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  // Fetch notifications and unread count
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [notificationResponse, unreadResponse] =
        await Promise.all([
          getNotifications({
            limit: 10,
            page,
            unreadOnly: false,
            order: "desc",
          }),
          getUnreadNotificationCount(),
        ]);

      setNotifications(notificationResponse?.data || []);

      setMeta(
        notificationResponse?.meta || {
          total: 0,
          total_pages: 1,
          page: 1,
          limit: 10,
        }
      );

      setUnreadCount(unreadResponse?.count || 0);
    } catch (err) {
      setError(
        err.message || "Unable to load notifications."
      );
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Notification filtering
  const filteredNotifications = notifications.filter(
    (notification) => {
      if (activeTab === "unread") {
        return !notification.is_read;
      }

      if (activeTab === "read") {
        return notification.is_read;
      }

      return true;
    }
  );

  const totalCount = meta.total || 0;
  const readCount = Math.max(totalCount - unreadCount, 0);

  // Mark one notification as read
  const handleMarkAsRead = async (id) => {
    try {
      setActionLoading(id);

      await markNotificationAsRead(id);

      await fetchNotifications();
    } catch (err) {
      setError(err.message || "Unable to update notification.");
    } finally {
      setActionLoading("");
    }
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;

    try {
      setActionLoading("all");

      await markAllNotificationsAsRead();

      await fetchNotifications();
    } catch (err) {
      setError(err.message || "Unable to mark all as read.");
    } finally {
      setActionLoading("");
    }
  };

  // Delete notification
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notification?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(id);

      await deleteNotification(id);

      // If the last item on a page is deleted, go back one page.
      if (notifications.length === 1 && page > 1) {
        setPage((previousPage) => previousPage - 1);
      } else {
        await fetchNotifications();
      }
    } catch (err) {
      setError(err.message || "Unable to delete notification.");
    } finally {
      setActionLoading("");
    }
  };

  // Notification icon
  const getNotificationIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "appointment":
        return {
          icon: CalendarDays,
          background: "bg-blue-50",
          color: "text-blue-600",
        };

      case "patient":
        return {
          icon: UserRound,
          background: "bg-green-50",
          color: "text-green-600",
        };

      case "report":
        return {
          icon: FileText,
          background: "bg-purple-50",
          color: "text-purple-600",
        };

      default:
        return {
          icon: Bell,
          background: "bg-[#150D5E]/5",
          color: "text-[#150D5E]",
        };
    }
  };

  // Format notification date
  const formatDate = (date) => {
    if (!date) return "";

    const notificationDate = new Date(date);

    if (Number.isNaN(notificationDate.getTime())) {
      return "";
    }

    return notificationDate.toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const tabs = [
    { id: "all", label: "All", count: totalCount },
    { id: "unread", label: "Unread", count: unreadCount },
    { id: "read", label: "Read", count: readCount },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-7">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#150D5E]">
                Notifications
              </h1>

              {unreadCount > 0 && (
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700">
                  {unreadCount} new
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Stay informed about your activities and important updates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchNotifications}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0 || actionLoading === "all"}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#150D5E] text-white hover:bg-[#21167D] text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CheckCheck size={17} />
              {actionLoading === "all"
                ? "Updating..."
                : "Mark all as read"}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600">
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle size={18} />
              {error}
            </div>

            <button
              type="button"
              onClick={() => setError("")}
              className="text-sm font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Total notifications
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">
                  {totalCount}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#150D5E]/10 flex items-center justify-center">
                <Bell className="text-[#150D5E]" size={21} />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Unread notifications
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">
                  {unreadCount}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <BellRing className="text-blue-600" size={21} />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Read notifications
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">
                  {readCount}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                <CircleCheck className="text-green-600" size={21} />
              </div>
            </div>
          </div>

        </div>

        {/* Notification List */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

          {/* Tabs */}
          <div className="flex items-center gap-6 px-5 sm:px-6 border-b border-gray-100 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setPage(1);
                }}
                className={`flex items-center gap-2 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#150D5E] text-[#150D5E]"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}

                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? "bg-[#150D5E]/10 text-[#150D5E]"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <RefreshCw className="w-7 h-7 text-[#150D5E] animate-spin" />
              <p className="text-sm text-gray-500 mt-3">
                Loading notifications...
              </p>
            </div>
          ) : filteredNotifications.length === 0 ? (

            /* Empty State */
            <div className="px-5 py-16 sm:py-20 flex flex-col items-center text-center">

              <div className="w-20 h-20 rounded-2xl bg-[#150D5E]/5 flex items-center justify-center mb-5">
                <Inbox
                  className="w-9 h-9 text-[#150D5E]"
                  strokeWidth={1.5}
                />
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                {activeTab === "unread"
                  ? "You're all caught up!"
                  : activeTab === "read"
                    ? "No read notifications yet"
                    : "No notifications yet"}
              </h2>

              <p className="text-sm text-gray-500 mt-2 max-w-sm leading-relaxed">
                {activeTab === "unread"
                  ? "You have no unread notifications. We'll let you know when something needs your attention."
                  : activeTab === "read"
                    ? "Notifications you have read will appear here."
                    : "Your appointment updates, patient activities and other important alerts will appear here."}
              </p>

            </div>

          ) : (

            /* Notification Items */
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => {
                const iconDetails = getNotificationIcon(
                  notification.type
                );

                const NotificationIcon = iconDetails.icon;

                return (
                  <div
                    key={notification.id}
                    className={`p-5 sm:px-6 flex gap-4 transition-colors ${
                      !notification.is_read
                        ? "bg-blue-50/30"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconDetails.background}`}
                    >
                      <NotificationIcon
                        className={iconDetails.color}
                        size={21}
                      />
                    </div>

                    {/* Notification Content */}
                    <div className="flex-1 min-w-0">

                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {notification.title}
                        </h3>

                        {!notification.is_read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600" />
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {notification.body}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="text-xs text-gray-400">
                          {formatDate(
                            notification.sent_at ||
                            notification.createdAt
                          )}
                        </span>

                        <span className="text-gray-300">•</span>

                        <span className="text-xs text-gray-400 capitalize">
                          {notification.type?.replaceAll("_", " ")}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4 mt-3">

                        {!notification.is_read && (
                          <button
                            type="button"
                            onClick={() =>
                              handleMarkAsRead(notification.id)
                            }
                            disabled={actionLoading === notification.id}
                            className="text-xs font-medium text-[#150D5E] hover:underline disabled:opacity-50"
                          >
                            Mark as read
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(notification.id)
                          }
                          disabled={actionLoading === notification.id}
                          className="inline-flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700 disabled:opacity-50"
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>

                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {!loading && meta.total_pages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 sm:px-6 py-4 border-t border-gray-100">

              <p className="text-xs text-gray-500">
                Page {meta.page} of {meta.total_pages}
                {" · "}
                {meta.total} notifications
              </p>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setPage((previousPage) => previousPage - 1)
                  }
                  disabled={page <= 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setPage((previousPage) => previousPage + 1)
                  }
                  disabled={page >= meta.total_pages}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight size={16} />
                </button>

              </div>
            </div>
          )}

        </div>

        <p className="text-xs text-gray-400 text-center">
          MedicPadi Notifications
        </p>

      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
