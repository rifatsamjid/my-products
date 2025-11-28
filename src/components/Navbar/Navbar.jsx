"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { auth } from "../../../firebase.config";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  // Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isActive = (path) => pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Cart", path: "/cart" },
  ];

  const adminItems = user
    ? [
        { name: "Add Product", path: "/add-product" },
        { name: "Manage Products", path: "/manage-products" },
      ]
    : [];

  const allNavItems = [...navItems, ...adminItems];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      setIsDropdownOpen(false);
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isDropdownOpen) return;
    const close = () => setIsDropdownOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [isDropdownOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/80 border-b border-purple-500/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-28 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-xl shadow-2xl hover:shadow-purple-500/50 transition">
              Fruit<span className="hidden sm:inline ml-1">Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {allNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-5 py-3 rounded-xl font-medium text-lg transition-all duration-300 ${
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

          {/* Right Side: Profile / Login */}
          <div className="flex items-center gap-4">
            {/* Logged In User */}
            {user ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="relative w-11 h-11 rounded-full overflow-hidden ring-4 ring-purple-500/30 hover:ring-purple-500/60 transition shadow-lg"
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="User"
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                      {user.displayName?.[0] || user.email?.[0] || "U"}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-black/95 backdrop-blur-2xl border border-purple-500/40 rounded-2xl shadow-2xl p-6 z-50">
                    <div className="space-y-4">
                      <div>
                        <p className="text-white font-bold text-lg">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-gray-400 text-sm truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-purple-500/30">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center gap-3 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-xl transition transform hover:scale-105 shadow-xl"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : loading ? (
              <div className="w-11 h-11 rounded-full bg-gray-700 animate-pulse"></div>
            ) : (
              /* Not Logged In */
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  href="/login"
                  className="px-6 py-2 text-gray-300 hover:text-white transition"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-7 py-2 rounded-full font-bold shadow-xl transition transform hover:scale-105"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 rounded-xl hover:bg-white/10 transition"
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-t border-purple-500/30 shadow-2xl">
          <div className="px-6 py-6 space-y-4">
            {allNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-6 py-4 rounded-xl text-xl font-medium transition-all ${
                  isActive(item.path)
                    ? "text-green-400 bg-gradient-to-r from-green-500/20 to-emerald-500/20 shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-6 border-t border-purple-500/30 space-y-4">
              {user ? (
                <>
                  <div className="px-6">
                    <p className="text-white font-bold text-xl">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xl rounded-xl shadow-xl"
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
