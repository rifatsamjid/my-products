"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-purple-800 to-pink-800">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-white mb-8"
        >
          Ready to Taste Freshness?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-200 mb-10"
        >
          Order now and get same-day delivery in Dhaka!
        </motion.p>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/products"
            className="inline-block px-12 py-5 bg-white text-purple-700 font-bold text-xl rounded-full shadow-2xl hover:shadow-purple-500/50 transition"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
