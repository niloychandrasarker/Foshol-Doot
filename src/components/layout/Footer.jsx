import {
  LuLeaf,
  LuFacebook,
  LuTwitter,
  LuLinkedin,
  LuMail,
  LuPhone,
  LuMapPin,
  LuHandHeart,
} from "react-icons/lu";

//--> Footer links data
const FOOTER_LINKS = {
  whatWeDo: [
    "Crop Recommendation",
    "Fertilizer Guidance",
    "Disease Detection",
    "AgriGPT Assistant",
    "Weather Analysis",
  ],
  contact: [
    { icon: LuMail, text: "info@fosoldoot.com" },
    { icon: LuPhone, text: "+880 1234 567890" },
    { icon: LuMapPin, text: "Dhaka, Bangladesh" },
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
      <div className="max-w-7xl mx-auto px-4 py-6 md:p-8">
        <hr className="border-slate-500 py-3" />

        {/* Company Info */}
        <div className="grid md:grid-cols-4 gap-12 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <LuLeaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">FosolDoot</h3>
                <p className="text-sm text-slate-400">
                  Smart Farming Solutions
                </p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4 max-w-md">
              We aim to help farmers and make the cultivation process easier by
              following up on atmospheric environmental changes. Using smart
              sensors and AI, we provide intelligent solutions for irrigation,
              fertilizers, and early detection of plant diseases.
            </p>
            <div className="flex space-x-5">
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <LuFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <LuTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <LuLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* What We Do */}
          <div>
            <h4 className="font-bold text-xl mb-4 md:my-4 text-white">
              Services
            </h4>
            <ul className="space-y-2">
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
            <h4 className="font-bold text-xl mb-4 md:my-4 text-white">
              Contact Us
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.contact.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-slate-300 text-sm">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <hr className="border-slate-500 py-3" />

        {/* Bottom Section */}
        <div>
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
              <LuHandHeart className="w-4 h-4 text-red-400" />
              <span>for farmers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
