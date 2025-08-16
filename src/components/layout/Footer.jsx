import { Facebook, Twitter, Linkedin } from "lucide-react";

// Footer links data
const FOOTER_LINKS = {
  whatWeDo: [
    "Crop Recommendation",
    "Fertilizer Guidance",
    "Disease Detection",
    "Weather Analysis",
    "Soil Testing",
  ],
  contact: [
    "Email: info@fooldoot.com",
    "Phone: +880 1234 567890",
    "Address: Dhaka, Bangladesh",
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
    <footer className="px-6 py-12 text-white bg-[#2c7c48]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Fosol Doot</h3>
            <p className="text-sm leading-relaxed opacity-90">
              We aim to help farmers and make the cultivation process easier by
              following up on the atmospheric environmental changes. We sensors,
              Alive we able to controlling the amount of water for irrigation,
              fertilizers, and early detection of plant and soil diseases.
            </p>
            <div className="flex space-x-4 mt-6">
              <Facebook className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity" />
              <Twitter className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity" />
              <Linkedin className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity" />
            </div>
          </div>

          {/* What We Do */}
          <div>
            <h4 className="font-semibold mb-4">What We Do</h4>
            <ul className="space-y-2 text-sm opacity-90">
              {FOOTER_LINKS.whatWeDo.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:opacity-70 transition-opacity">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-90">
              {FOOTER_LINKS.contact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm opacity-90">
              {FOOTER_LINKS.support.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:opacity-70 transition-opacity">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-sm opacity-75">Copyright © 2024 Hyperparameter</p>
        </div>
      </div>
    </footer>
  );
}
