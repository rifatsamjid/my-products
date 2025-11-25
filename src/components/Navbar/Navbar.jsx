"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="z-50 backdrop-blur-xl border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg shadow-lg">
                A
              </div>
              <span className="text-xl font-bold  hidden sm:block">
                API Shield
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className=" hover:text-green-500 hover:bg-white/10 px-4 py-2 rounded-xl transition"
            >
              Home
            </Link>
            <Link
              href="/products"
              className=" hover:text-green-500 hover:bg-white/10 px-4 py-2 rounded-xl transition"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className=" hover:text-green-500 hover:bg-white/10 px-4 py-2 rounded-xl transition"
            >
              Categories
            </Link>
            <Link
              href="/cart"
              className=" hover:text-green-500 hover:bg-white/10 px-4 py-2 rounded-xl transition"
            >
              Cart
            </Link>
            <Link
              href="/Contact"
              className=" hover:text-green-500 hover:bg-white/10 px-4 py-2 rounded-xl transition"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/signin"
              className=" hover:text-green-500 px-6 py-2.5 text-sm font-medium transition"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-7 py-2.5 rounded-full text-sm font-semibold transition shadow-xl"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg  hover:text-green-500 hover:bg-white/10 transition"
            >
              {isOpen ? (
                <svg
                  className="w-7 h-7"
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
                  className="w-7 h-7"
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
        <div className="lg:hidden backdrop-blur-  border-t">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link
              href="/#about"
              className="block  hover:text-green-500 hover:bg-white/10 px-4 py-3 rounded-xl text-lg font-medium transition"
            >
              About
            </Link>
            <Link
              href="/#integrations"
              className="block  hover:text-green-500 hover:bg-white/10 px-4 py-3 rounded-xl text-lg font-medium transition"
            >
              Integrations
            </Link>
            <Link
              href="/pricing"
              className="block  hover:text-green-500 hover:bg-white/10 px-4 py-3 rounded-xl text-lg font-medium transition"
            >
              Pricing南
            </Link>
            <Link
              href="/#customers"
              className="block  hover:text-green-500 hover:bg-white/10 px-4 py-3 rounded-xl text-lg font-medium transition"
            >
              Customers
            </Link>
            <Link
              href="/changelog"
              className="block  hover:text-green-500 hover:bg-white/10 px-4 py-3 rounded-xl text-lg font-medium transition"
            >
              Changelog
            </Link>

            <div className="pt-6 border-t border-purple-500/30 space-y-4">
              <Link
                href="/signin"
                className="block  hover:text-green-500 text-center py-3 text-lg font-medium"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500  text-center py-3.5 rounded-full font-bold text-lg shadow-xl"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
