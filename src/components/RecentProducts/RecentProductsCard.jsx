"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function RecentProductsCard({ products }) {
  const { title, image_url, date, price, short_description } = products;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md border border-purple-500/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={image_url}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Date Badge */}
        <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
          {formatDate(date)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-green-400 transition">
          {title}
        </h3>

        <p className="text-gray-300 text-sm line-clamp-2 mb-4">
          {short_description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              ${price}
            </span>
            <span className="text-gray-400 text-sm">/kg</span>
          </div>

          {/* Hover Button */}
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-lg"
          >
            View Details
          </motion.div>
        </div>
      </div>

      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      </div>
    </motion.div>
  );
}
