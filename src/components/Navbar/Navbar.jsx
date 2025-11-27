"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isActive = (path) => pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Cart", path: "/cart" },
  ];

  const protectedItems = session
    ? [
        { name: "Add Product", path: "/add-product" },
        { name: "Manage Products", path: "/manage-products" },
      ]
    : [];

  const allNavItems = [...navItems, ...protectedItems];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    toast.success("Logged out successfully!");
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/80 border-b border-purple-500/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-28 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-xl shadow-2xl hover:shadow-purple-500/50 transition">
                Fruit<span className="hidden sm:inline ml-1">Hub</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {allNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-5 py-3 rounded-xl font-medium text-lg transition-all duration-300
                  ${
                    isActive(item.path)
                      ? "text-green-400 bg-white/10 shadow-lg shadow-green-500/20"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-green-400 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Auth / User Section */}
          <div className="hidden lg:flex items-center space-x-6">
            {status === "loading" ? (
              <div className="text-gray-400">Loading...</div>
            ) : session ? (
              <div className="flex items-center gap-4">
                {/* User Profile */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                    {session.user?.name?.[0] || session.user?.email?.[0] || "U"}
                  </div>
                  <span className="text-white font-medium">
                    {session.user?.name || session.user?.email?.split("@")[0]}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition transform hover:scale-105 shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-7 py-3 rounded-xl font-medium text-gray-300 hover:text-white transition"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:shadow-purple-500/50 transition transform hover:scale-105"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-xl hover:bg-white/10 transition"
            >
              {isOpen ? (
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-t border-purple-500/30 shadow-2xl">
          <div className="px-6 py-6 space-y-4">
            {allNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-6 py-4 rounded-xl text-xl font-medium transition-all
                  ${
                    isActive(item.path)
                      ? "text-green-400 bg-gradient-to-r from-green-500/20 to-emerald-500/20 shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="pt-6 border-t border-purple-500/30 space-y-4">
              {session ? (
                <>
                  <div className="flex items-center gap-4 px-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {session.user?.name?.[0] || "U"}
                    </div>
                    <div>
                      <p className="text-white font-medium">Hi,</p>
                      <p className="text-gray-300 text-sm">
                        {session.user?.name || session.user?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xl rounded-xl shadow-xl"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block text-center py-4 text-xl font-medium text-gray-300 hover:text-white"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="block text-center py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-xl shadow-xl"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
