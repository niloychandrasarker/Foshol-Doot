import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Leaf,
  ChevronDown,
  Bot,
  Zap,
  Shield,
  MessageSquare,
} from "lucide-react";

//--> Navigation items with icons
const NAVIGATION_ITEMS = [
  { label: "Home", href: "/", icon: Leaf },
  { label: "Crop Recommendation", href: "/crop-recommendation", icon: Zap },
  { label: "Fertilizer Guidance", href: "/fertilizer-guidance", icon: Shield },
  {
    label: "Disease Detection",
    href: "/disease-detection",
    icon: MessageSquare,
  },
  // { label: "AgriGPT", href: "/agri-gpt", icon: Bot },
];

const SECONDARY_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  //--> Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <>
      {/* Modern Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    FosolDoot
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">
                    Smart Farming
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {NAVIGATION_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveLink(item.href);
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-emerald-100 text-emerald-700 shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}

              {/* More Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 px-4 py-2 rounded-xl font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                >
                  <span className="text-sm">More</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/60 py-2 z-10">
                    {SECONDARY_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/agri-gpt"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center space-x-2"
              >
                <Bot className="w-5 h-5" />
                <span> AgriGPT</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={closeMobileMenu}
        >
          <div className="fixed top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-xl">
            <div className="px-4 py-6 space-y-3">
              {/* Mobile Navigation Items */}
              {NAVIGATION_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveLink(item.href);
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="border-t border-slate-200 my-3"></div>

              {/* Secondary Items */}
              {SECONDARY_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={closeMobileMenu}
                  className="block px-4 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4">
                <Link
                  to="/agri-gpt"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg w-full"
                >
                  <Bot className="w-5 h-5" />
                  <span>Try AgriGPT</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
