"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(168, 85, 247, 0.4), transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 text-center">
       
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-8"
        >
          <span className="px-5 py-2 bg-purple-500/20 backdrop-blur-md border border-purple-400/40 rounded-full text-sm font-medium text-purple-500 flex items-center gap-2 w-fit mx-auto">
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
            </motion.span>
            Fresh Fruits
          </span>
        </motion.div>

        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-400 to-pink-200"
        >
          Buy the freshest fruits directly from
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
             the farmers.
          </span>
        </motion.h1>

        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Fast Delivery & Best Quality
          <br />
          <span>
            List your fruits and start selling in minutes & We ensure top-grade quality for every purchase.
          </span>
        </motion.p>

       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/get-started"
              className="px-8 py-4 bg-white text-black font-semibold rounded-full shadow-2xl hover:shadow-purple-500/50 transition"
            >
              Get Started →
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/docs"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20  rounded-full flex items-center gap-3 hover:bg-white/20 transition"
            >
              <span>Read the docs</span>
            </Link>
          </motion.div>
        </motion.div>

        
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute w-2 h-2 bg-purple-400/60 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: "20%",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}