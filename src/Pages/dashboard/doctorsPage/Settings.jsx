
import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  Languages,
  ShieldCheck,
  Smartphone,
  Monitor,
  Mail,
  Megaphone,
  ChevronRight,
} from "lucide-react";

export default function Settings() {
  const [language, setLanguage] = useState("English");

  const [preferences, setPreferences] = useState({
    twoFactor: false,
    mobilePush: true,
    desktopNotification: true,
    emailNotification: true,
  });

  const [showNotice, setShowNotice] = useState(false);

  const togglePreference = (key) => {
    setPreferences((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const notificationSettings = [
    {
      key: "twoFactor",
      title: "Two-factor Authentication",
      description: "Keep your account secure by enabling 2FA via email.",
      icon: ShieldCheck,
    },
    {
      key: "mobilePush",
      title: "Mobile Push Notifications",
      description: "Receive push notifications on mobile.",
      icon: Smartphone,
    },
    {
      key: "desktopNotification",
      title: "Desktop Notification",
      description: "Receive push notifications on desktop.",
      icon: Monitor,
    },
    {
      key: "emailNotification",
      title: "Email Notification",
      description: "Receive email notifications.",
      icon: Mail,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Page Heading */}
        <div>
          <h1 className="text-3xl font-semibold text-[#3D3D3D]">
            Settings
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Manage your account preferences and notifications.
          </p>
        </div>

        {/* Language */}
        <section className="bg-white rounded-xl border border-gray-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#F3F4FF] flex items-center justify-center text-[#150D5E]">
              <Languages size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-[#333333]">
                Language
              </h2>
              <p className="text-xs text-gray-500">
                Choose your preferred language.
              </p>
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-600 mb-2">
            Select your language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full md:w-1/2 border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#333333] outline-none focus:border-[#150D5E]"
          >
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Portuguese">Portuguese</option>
          </select>
        </section>

        {/* Notification and Security Preferences */}
        <section className="bg-white rounded-xl border border-gray-100 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-[#333333] mb-2">
            Notification and Security Preferences
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Manage how you receive notifications and protect your account.
          </p>

          <div className="divide-y divide-gray-100">
            {notificationSettings.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-4 py-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F3F4FF] flex items-center justify-center text-[#150D5E] shrink-0">
                      <Icon size={20} />
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-[#333333]">
                        {item.title}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={preferences[item.key]}
                    aria-label={item.title}
                    onClick={() => togglePreference(item.key)}
                    className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
                      preferences[item.key]
                        ? "bg-[#150D5E]"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        preferences[item.key]
                          ? "translate-x-7"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Notice and Articles */}
        <section className="bg-white rounded-xl border border-gray-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#F3F4FF] flex items-center justify-center text-[#150D5E]">
              <Megaphone size={21} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#333333]">
                Notice & Articles
              </h2>
              <p className="text-xs text-gray-500">
                Important announcements and platform updates.
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h3 className="font-semibold text-[#150D5E]">
                Upcoming Maintenance
              </h3>

              <span className="text-xs bg-[#F3F4FF] text-[#150D5E] px-3 py-1 rounded-full">
                Announcement
              </span>
            </div>

            <p className="text-xs text-gray-400 mb-3">
              Published: 28-Nov-2026
            </p>

            <p className="text-sm text-gray-600 leading-relaxed">
              We will perform system maintenance on 30-Dec-2026
              from 12 AM to 5 AM. Expect temporary downtime.
            </p>

            {showNotice && (
              <div className="mt-4 p-4 rounded-lg bg-[#F8F8FF] text-sm text-gray-600 leading-relaxed">
                During this maintenance period, some MedicPadi
                services may be temporarily unavailable. Please
                complete any important activities ahead of the
                scheduled maintenance window.
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowNotice(!showNotice)}
              className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#150D5E] hover:underline"
            >
              {showNotice ? "Read Less" : "Read More"}
              <ChevronRight
                size={16}
                className={showNotice ? "rotate-90" : ""}
              />
            </button>
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
