import { Header } from "./Header";
import { Footer } from "./Footer";
import AgriGPTPopup from "../AgriGPTPopup";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <main className="relative">{children}</main>
      <Footer />

      {/* Global AgriGPT Popup */}
      <AgriGPTPopup />
    </div>
  );
}
