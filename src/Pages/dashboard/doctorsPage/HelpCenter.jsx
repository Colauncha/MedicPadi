
import { useMemo, useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  Search,
  UserRound,
  Users,
  CalendarDays,
  FileText,
  ShieldCheck,
  Settings,
  Headset,
  ChevronDown,
  Mail,
  MessageCircle,
  BookOpen,
} from "lucide-react";

const categories = [
  { name: "Account & Profile", icon: UserRound },
  { name: "Patient Management", icon: Users },
  { name: "Appointments", icon: CalendarDays },
  { name: "Reports & Records", icon: FileText },
  { name: "Privacy & Security", icon: ShieldCheck },
  { name: "Technical Support", icon: Settings },
];

const faqs = [
  {
    category: "Account & Profile",
    question: "How do I update my profile?",
    answer:
      "Open My Profile from your dashboard. Review your information, make the necessary changes and save your updates.",
  },
  {
    category: "Account & Profile",
    question: "What should I do if I forget my password?",
    answer:
      "Go to the sign-in page, select Forgot Password and follow the password recovery instructions.",
  },
  {
    category: "Patient Management",
    question: "How do I add a new patient?",
    answer:
      "Open the Patient section of your dashboard and use the available option to register a new patient.",
  },
  {
    category: "Patient Management",
    question: "How can I view patient information?",
    answer:
      "Navigate to Patients and select the patient whose information you want to review.",
  },
  {
    category: "Appointments",
    question: "Where can I see my appointments?",
    answer:
      "Open Appointments from your dashboard to view your appointment information.",
  },
  {
    category: "Appointments",
    question: "Can I manage my appointments?",
    answer:
      "Visit the Appointments section to view the appointment management options available to your account.",
  },
  {
    category: "Reports & Records",
    question: "How do I access medical reports?",
    answer:
      "Open Reports from your dashboard to view the medical reports available to your account.",
  },
  {
    category: "Privacy & Security",
    question: "How does MedicPadi protect patient information?",
    answer:
      "MedicPadi's privacy policy explains how personal and health information is collected, used, shared and protected. Visit the Policy section for more information.",
  },
  {
    category: "Technical Support",
    question: "What should I do if I cannot access my account?",
    answer:
      "Check your internet connection and sign-in details. If the problem continues, contact the MedicPadi support team.",
  },
];

export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" ||
        faq.category === activeCategory;

      const matchesSearch =
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase()) ||
        faq.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-8">

        {/* Welcome section */}
        <section className="bg-[#F3F4FF] rounded-2xl p-6 md:p-10">
          <span className="text-xs font-semibold tracking-wider text-[#150D5E]">
            MEDICPADI SUPPORT
          </span>

          <h1 className="text-2xl md:text-3xl font-semibold text-[#150D5E] mt-3">
            How can we help you?
          </h1>

          <p className="text-sm text-gray-600 mt-3 max-w-xl">
            Find answers to your questions, explore helpful guides
            and get assistance with your MedicPadi account.
          </p>

          <div className="mt-6 bg-white rounded-xl flex items-center gap-3 px-4 py-3 border border-gray-200">
            <Search size={20} className="text-gray-400 shrink-0" />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpenFaq(null);
              }}
              placeholder="Search for help..."
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-lg font-semibold text-[#333333] mb-5">
            Browse by category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const selected = activeCategory === category.name;

              return (
                <button
                  key={category.name}
                  onClick={() => {
                    setActiveCategory(
                      selected ? "All" : category.name
                    );
                    setOpenFaq(null);
                  }}
                  className={`flex items-center gap-4 p-5 rounded-xl border text-left transition-all ${
                    selected
                      ? "border-[#150D5E] bg-[#F3F4FF]"
                      : "border-gray-200 bg-white hover:border-[#150D5E]"
                  }`}
                >
                  <div className="w-11 h-11 rounded-lg bg-[#F3F4FF] flex items-center justify-center text-[#150D5E] shrink-0">
                    <Icon size={21} />
                  </div>

                  <span className="text-sm font-semibold text-[#333333]">
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white border border-gray-100 rounded-xl p-5 md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-[#333333]">
                Frequently Asked Questions
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Find quick answers to common questions.
              </p>
            </div>

            <button
              onClick={() => {
                setActiveCategory("All");
                setSearch("");
                setOpenFaq(null);
              }}
              className="text-sm text-[#150D5E] font-medium hover:underline"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-[#F8F8FF]"
                  >
                    <div>
                      <span className="text-xs text-[#150D5E]">
                        {faq.category}
                      </span>

                      <p className="text-sm font-medium text-[#333333] mt-1">
                        {faq.question}
                      </p>
                    </div>

                    <ChevronDown
                      size={19}
                      className={`shrink-0 text-[#150D5E] transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-sm text-gray-600 leading-7 border-t border-gray-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <BookOpen
                  size={35}
                  className="mx-auto text-gray-300 mb-3"
                />

                <h3 className="font-semibold text-[#333333]">
                  No results found
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Try another search or select a different category.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Contact Support */}
        <section className="bg-[#F3F4FF] rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#150D5E] mb-4">
                <Headset size={25} />
              </div>

              <h2 className="text-xl font-semibold text-[#150D5E]">
                Still need assistance?
              </h2>

              <p className="text-sm text-gray-600 mt-2 max-w-lg">
                Our support team can help with questions,
                account issues and technical difficulties.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="mailto:support@medicpadi.com"
                className="flex items-center justify-center gap-2 bg-[#150D5E] text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-[#24178A] transition-colors"
              >
                <Mail size={17} />
                Email Support
              </a>

              <a
                href="mailto:support@medicpadi.com"
                className="flex items-center justify-center gap-2 border border-[#150D5E] text-[#150D5E] px-5 py-3 rounded-lg text-sm font-medium hover:bg-white transition-colors"
              >
                <MessageCircle size={17} />
                Get in Touch
              </a>
            </div>
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
