"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductsCard({ product }) {
  const { title, full_description, price, date, image_url } = product;

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/30 transition-all duration-500"
    >

      <div className="relative h-56 overflow-hidden">
        <Image
          src={image_url || "/api-placeholder.jpg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-purple-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
          {date}
        </div>
      </div>

    
      <div className="p-6 lg:p-8">
        <h3 className="text-2xl font-bold  mb-3 group-hover:text-green-400 transition">
          {title}
        </h3>
        
        <p className=" text-sm leading-relaxed mb-6 line-clamp-3">
          {full_description}
        </p>

        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              ${price}
            </span>
            <span className="text-gray-400 text-sm ml-1">/kilogram</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-full shadow-lg transition"
          >
            Choose Plan
          </motion.button>
        </div>
      </div>

      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-3xl" />
      </div>
    </motion.div>
  );
}