import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Leaf,
} from "lucide-react";

// Footer links data
const FOOTER_LINKS = {
  whatWeDo: [
    "Crop Recommendation",
    "Fertilizer Guidance",
    "Disease Detection",
    "AgriGPT Assistant",
    "Weather Analysis",
  ],
  contact: [
    { icon: Mail, text: "info@fosoldoot.com" },
    { icon: Phone, text: "+880 1234 567890" },
    { icon: MapPin, text: "Dhaka, Bangladesh" },
  ],
  support: [
    "Help Center",
    "Documentation",
    "Community Forum",
    "Contact Support",
  ],
};

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">FosolDoot</h3>
                <p className="text-sm text-slate-400">
                  Smart Farming Solutions
                </p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
              We aim to help farmers and make the cultivation process easier by
              following up on atmospheric environmental changes. Using smart
              sensors and AI, we provide intelligent solutions for irrigation,
              fertilizers, and early detection of plant diseases.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 hover:bg-emerald-600 rounded-xl flex items-center justify-center transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 hover:bg-emerald-600 rounded-xl flex items-center justify-center transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 hover:bg-emerald-600 rounded-xl flex items-center justify-center transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* What We Do */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.whatWeDo.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.contact.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-slate-300 text-sm">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-slate-400 text-sm">
                © 2024 FosolDoot. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a
                  href="#"
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <span>Made with</span>
              <span className="text-red-400">❤️</span>
              <span>for farmers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
