"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  getCart,
  removeFromCart,
  updateQuantity,
} from "../../../my-season-shop/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());

    const handleStorageChange = () => setCart(getCart());
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleStorageChange);
    };
  }, []);

  const handleUpdate = () => {
    setCart(getCart());
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-purple-900/20 to-[#0f0c29] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Your Cart is Empty
        </h1>
        <Link
          href="/"
          className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xl font-bold rounded-full shadow-2xl hover:scale-105 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-purple-900/20 to-[#0f0c29] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-white mb-10">
          Your Cart
        </h1>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6">
                {/* Image */}
                <div className="w-full sm:w-32 h-32 sm:h-28 flex-shrink-0">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base mt-1">
                    ${item.price} /kg
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => {
                      updateQuantity(item._id, -1);
                      handleUpdate();
                      toast.success("Quantity updated!");
                    }}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500/20 hover:bg-red-500/40 rounded-full text-white text-xl sm:text-2xl font-bold transition"
                  >
                    -
                  </button>
                  <span className="text-2xl sm:text-3xl font-bold text-white w-12 sm:w-16 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => {
                      updateQuantity(item._id, +1);
                      handleUpdate();
                      toast.success("Added one more!");
                    }}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 hover:bg-green-500/40 rounded-full text-white text-xl sm:text-2xl font-bold transition"
                  >
                    +
                  </button>
                </div>

                {/* Price & Remove */}
                <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
                  <p className="text-xl sm:text-2xl font-bold text-green-400">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => {
                      removeFromCart(item._id);
                      handleUpdate();
                      toast.error(`${item.title} removed!`);
                    }}
                    className="text-red-400 hover:text-red-300 text-sm sm:text-base font-medium underline-offset-4 hover:underline transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total & Checkout */}
        <div className="mt-12 bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-center sm:text-left">
              <p className="text-2xl sm:text-3xl font-bold text-white">
                Total Amount
              </p>
              <p className="text-4xl sm:text-5xl font-bold text-green-400 mt-2">
                ${total.toFixed(2)}
              </p>
            </div>
            <button className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white text-xl sm:text-2xl font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-300">
              Proceed to Checkout (WhatsApp)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
