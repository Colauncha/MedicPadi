import { Link } from "react-router";
import logo from "../../assets/mediclogo.svg";

const NAV_LINKS = [
  { label: "For patients", href: "#patients" },
  { label: "For doctors", href: "#doctors" },
  { label: "For labs", href: "#labs" },
  { label: "For pharmacies", href: "#pharmacies" },
  { label: "How it works", href: "#how-it-works" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[#ECECEC]">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Medicpadi" className="h-7 w-auto" />
          <span className="text-lg font-semibold tracking-tight text-[#150D5E]">
            MEDICPADI
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[#454545] hover:text-[#150D5E] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/doctor-signin"
            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-lg border border-[#150D5E] text-sm text-[#150D5E] hover:bg-[#F8F8FF] transition-colors"
          >
            Portal Login
          </Link>
          <Link
            to="/doctor-signup"
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#150D5E] text-sm text-white hover:bg-[#1A1170] transition-colors"
          >
            Get the app
          </Link>
        </div>
      </div>
    </header>
  );
}