import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "For patients", href: "#patients" },
  { label: "For doctors", href: "#doctors" },
  { label: "For labs", href: "#labs" },
  { label: "For pharmacies", href: "#pharmacies" },
  { label: "How it works", href: "#how-it-works" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[#E7E7E7]">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 h-16 sm:h-20">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img 
            src="/MedicPadi_logo1.png" 
            alt="Medicpadi" 
            className="w-[160px] sm:w-[212px] h-[36px] sm:h-[48px] object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[#888888] hover:text-[#150D5E] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            to="/doctor-signin"
            className="inline-flex items-center px-5 py-2.5 rounded-lg border border-[#150D5E] text-sm text-[#150D5E] hover:bg-[#F8F8FF] transition-colors font-medium"
          >
            Portal Login
          </Link>
          <Link
            to="/doctor-signup"
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#150D5E] text-sm text-white hover:bg-[#1A1170] transition-colors font-medium"
          >
            Get the app
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-[#150D5E] hover:bg-[#F8F8FF] transition-colors focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E7E7E7] bg-white px-4 pt-4 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3 mb-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#454545] hover:text-[#150D5E] py-2 border-b border-gray-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <Link
              to="/doctor-signin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-lg border border-[#150D5E] text-sm text-[#150D5E] font-semibold hover:bg-[#F8F8FF] transition-colors"
            >
              Portal Login
            </Link>
            <Link
              to="/doctor-signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-lg bg-[#150D5E] text-sm text-white font-semibold hover:bg-[#1A1170] transition-colors"
            >
              Get the app
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}