
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FruitHub - Fresh Fruits",
  description: "Best fresh fruits delivery in Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        
          <Navbar />

         
          <main className="min-h-screen">
            {children}
          </main>

          <Footer />
        

        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#10b981",
              color: "white",
              fontWeight: "bold",
              borderRadius: "12px",
              padding: "16px 20px",
              fontSize: "16px",
            },
          }}
        />

      </body>
    </html>
  );
}