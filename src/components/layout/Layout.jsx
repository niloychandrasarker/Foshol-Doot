import { Header } from "./Header";
import { Footer } from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#e3f6e4]">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
