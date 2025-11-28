"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  getCart,
  removeFromCart,
  updateQuantity,
  getCartTotal,
} from "../../../my-season-shop/lib/cart";
// import {
//   getCart,
// removeFromCart,
// updateQuantity,
// getCartTotal,
// } from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [isClient, setIsClient] = useState(false); //

  useEffect(() => {
    setIsClient(true);
    const initialCart = getCart();
    setCart(initialCart);

    const handleCartChange = () => {
      setCart(getCart());
    };

    window.addEventListener("storage", handleCartChange);
    window.addEventListener("cartUpdated", handleCartChange);

    return () => {
      window.removeEventListener("storage", handleCartChange);
      window.removeEventListener("cartUpdated", handleCartChange);
    };
  }, []);

  const refreshCart = () => {
    setCart(getCart());
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-purple-900/20 to-[#0f0c29] flex items-center justify-center">
        <div className="text-white text-3xl">Loading cart...</div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-purple-900/20 to-[#0f0c29] flex flex-col items-center justify-center px-6 text-center pt-24">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Your Cart is Empty
        </h1>
        <Link
          href="/"
          className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white text-xl font-bold rounded-full shadow-2xl hover:scale-105 transition transform"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-purple-900/20 to-[#0f0c29] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-white mb-12">
          Your Cart
        </h1>

        <div className="grid gap-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/40 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6">
                {/* Image */}
                <div className="w-full sm:w-32 h-32 sm:h-32 flex-shrink-0">
                  <Image
                    src={item.image || item.image_url || "/placeholder.jpg"}
                    alt={item.name || item.title || "Product"}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">
                    {item.name || item.title}
                  </h3>
                  <p className="text-gray-300 mt-1">
                    ${item.price} {item.unit || "/kg"}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      updateQuantity(item._id, -1);
                      refreshCart();
                    }}
                    className="w-12 h-12 bg-red-600/30 hover:bg-red-600/50 rounded-full text-white text-2xl font-bold transition"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-3xl font-bold text-white w-16 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => {
                      updateQuantity(item._id, +1);
                      refreshCart();
                    }}
                    className="w-12 h-12 bg-green-600/30 hover:bg-green-600/50 rounded-full text-white text-2xl font-bold transition"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Price & Remove */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => {
                      removeFromCart(item._id);
                      refreshCart();
                      toast.error(
                        `${item.name || item.title} removed from cart`
                      );
                    }}
                    className="text-red-400 hover:text-red-300 font-medium mt-2 underline-offset-4 hover:underline transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-12 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/40 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            <div>
              <p className="text-3xl font-bold text-white">Total Amount</p>
              <p className="text-5xl font-extrabold text-green-400 mt-3">
                ${total.toFixed(2)}
              </p>
            </div>
            <a
              href={`https://wa.me/8801XXXXXXXXX?text=${encodeURIComponent(
                `Hello! I want to order:\n\n${cart
                  .map(
                    (i) =>
                      `• ${i.name} × ${i.quantity} = $${(
                        i.price * i.quantity
                      ).toFixed(2)}`
                  )
                  .join("\n")}\n\nTotal: $${total.toFixed(2)}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white text-2xl font-bold rounded-full shadow-2xl hover:scale-110 transition-all duration-300 text-center"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
