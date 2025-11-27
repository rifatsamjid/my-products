"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCart, removeFromCart, updateQuantity } from "../../../my-season-shop/lib/cart";

export default function CartPage() {
  const cart = getCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Your Cart is Empty</h1>
          <Link href="/" className="px-8 py-4 bg-green-500 text-white rounded-full text-xl hover:bg-green-400 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] to-purple-900/20 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-12">Your Cart</h1>

        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item._id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex gap-6 items-center border border-purple-500/30">
              <Image src={item.image_url} alt={item.title} width={120} height={120} className="rounded-xl" />

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-gray-300">${item.price} /kg</p>
              </div>

              <div className="flex items-center gap-4">
                <button onClick={() => updateQuantity(item._id, -1)} className="w-10 h-10 bg-red-500/20 hover:bg-red-500/40 rounded-full text-white text-xl">-</button>
                <span className="text-2xl text-white w-12 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, +1)} className="w-10 h-10 bg-green-500/20 hover:bg-green-500/40 rounded-full text-white text-xl">+</button>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-green-400">${(item.price * item.quantity).toFixed(2)}</p>
              </div>

              <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-300 text-xl">Remove</button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-right">
          <p className="text-4xl font-bold text-white mb-8">
            Total: <span className="text-green-400">${total.toFixed(2)}</span>
          </p>
          <button className="px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-2xl font-bold rounded-full hover:scale-105 transition shadow-2xl">
            Proceed to Checkout (WhatsApp)
          </button>
        </div>
      </div>
    </div>
  );
}