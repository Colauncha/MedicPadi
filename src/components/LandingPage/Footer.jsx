import { Link } from "react-router";
import logo from "../../assets/mediclogo.svg";

const COLUMNS = [
  {
    heading: "Products",
    links: [
      { label: "For patients", to: "/" },
      { label: "How it works", to: "/#how-it-works" },
      { label: "Download the app", to: "/doctor-signup" },
    ],
  },
  {
    heading: "For Professionals",
    links: [
      { label: "Doctor portal", to: "/doctor-signup" },
      { label: "Lab portal", to: "/laboratory-signup" },
      { label: "Pharmacy portal", to: "/pharmacy-signup" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Contacts", to: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#150D5E]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-12">
          <div>
            <img src={logo} alt="Medicpadi" className="h-7 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-white/60 leading-6 max-w-xs">
              One connected line of care between patients, doctors, labs,
              and pharmacies.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-sm font-medium text-white mb-4">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/15">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Medicpadi. All right reserved
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-white/50 hover:text-white">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-white/50 hover:text-white">
              Terms
            </Link>
            <Link to="/licensing" className="text-xs text-white/50 hover:text-white">
              Licensing
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}