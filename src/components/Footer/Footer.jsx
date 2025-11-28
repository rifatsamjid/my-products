import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" backdrop-blur-xl border-t border-purple-500/20 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Logo + Description */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className=" h-11 w-36 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xl shadow-xl">
                <span className="text-2xl font-bold ">Fruit Hub</span>
              </div>
            </div>
            <p className=" text-sm leading-relaxed max-w-xs">
              FruitHub — Bangladesh’s fastest growing fresh fruit delivery
              platform. From farm to table in under 24 hours. Always fresh,
              always seasonal.{" "}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className=" font-semibold mb-5 text-lg">Product</h3>
            <ul className="space-y-3">
              {[
                "Features",
                "Pricing",
                "Integrations",
                "Changelog",
                "API Studio",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className=" hover:text-green-400 transition text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className=" font-semibold mb-5 text-lg">Company</h3>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Customers", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className=" hover:text-green-400 transition text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className=" font-semibold mb-5 text-lg">Legal</h3>
            <ul className="space-y-3">
              {["Privacy", "Terms", "Security", "Cookies", "Status"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className=" hover:text-green-400 transition text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-10 border-t border-purple-500/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © 2025 FruitHub. All rights reserved. Made with love in Bangladesh
          </p>

          <div className="flex space-x-6">
            {["Twitter", "GitHub", "Discord", "LinkedIn"].map((social) => (
              <Link
                key={social}
                href="#"
                className=" hover:text-green-400 transition transform hover:scale-110"
              >
                <span className="sr-only">{social}</span>
                {/* Simple icons using text or replace with actual SVG later */}
                <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold">
                  {social[0]}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
