export const NAV_ITEMS = [
  { id: "dashboard",    label: "Dashboard",    icon: "dashboard"    },
  { id: "patient",      label: "Patient",      icon: "patient"      },
  { id: "profile",      label: "My Profile",   icon: "profile"      },
  { id: "appointments", label: "Appointments", icon: "appointments" },
  { id: "reports",      label: "Reports",      icon: "reports"      },
];

export const HELP_ITEMS = [
  { id: "policy",   label: "Policy",      icon: "policy"   },
  { id: "help",     label: "Help Center", icon: "help"     },
  { id: "settings", label: "Settings",    icon: "settings" },
];

export const STAT_CARDS = [
  {
    label: "Total Patients",
    value: "230",
    sub: "15% from last week",
    icon: "users",
    accent: "bg-[#150D5E]",
  },
  {
    label: "Total Treatment",
    value: "230",
    sub: "15% rise from last week",
    icon: "activity",
    accent: "bg-indigo-500",
  },
  {
    label: "Appointments Scheduled",
    value: "230",
    sub: "25% Attended",
    icon: "appointments",
    accent: "bg-violet-500",
  },
];

export const APPOINTMENTS = [
  { name: "Sarah John", gender: "Female", time: "02:00 PM" },
  { name: "Sarah John", gender: "Female", time: "02:00 PM" },
  { name: "Sarah John", gender: "Female", time: "02:00 PM" },
];

export const REQUESTS = [
  { name: "Sarah John", type: "Consultation", date: "26 February, 10:00 AM" },
  { name: "Sarah John", type: "Consultation", date: "26 February, 10:00 AM" },
  { name: "Sarah John", type: "Consultation", date: "26 February, 10:00 AM" },
  { name: "Sarah John", type: "Consultation", date: "26 February, 10:00 AM" },
];

export const NEXT_PATIENT = {
  name: "Sarah John",
  gender: "Female",
  condition: "Concussion",
  age: "50yrs",
  weight: "70kg",
  height: "175cm",
  sex: "Female",
};

export const INITIAL_MESSAGES = [
  {
    from: "You",
    text: "How can brain cause problems if not managed properly?",
    isAi: false,
  },
  {
    from: "Al Padi",
    text: "Brain problems can manifest in various ways, and symptoms may include headaches, memory issues, changes in mood or behaviour, difficulty concentrating...",
    isAi: true,
  },
];