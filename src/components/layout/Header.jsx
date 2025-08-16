import { Link } from "react-router-dom";

// Navigation items
const NAVIGATION_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Crop Recommendation", href: "/crop-recommendation" },
  { label: "Fertilizer Guidance", href: "/fertilizer-guidance" },
  { label: "Disease Detection", href: "/disease-detection" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="px-6 py-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-lg font-semibold text-black">
          <Link to="/">Logo</Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-black hover:opacity-70 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
