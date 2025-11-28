import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: { default: "FruitHub - Fresh Fruits", template: "%s | FruitHub" },
  description: "Best fresh fruits delivery in Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-gradient-to-b from-[#0f0c29] via-purple-900/20 to-[#0f0c29] text-white font-sans">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}