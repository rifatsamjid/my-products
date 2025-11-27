"use client";
import { motion } from "framer-motion";

const features = [
  { icon: "Fast Delivery", title: "Same Day Delivery", desc: "Dhaka city within 3 hours" },
  { icon: "Leaf", title: "100% Fresh & Organic", desc: "Direct from farms, no middleman" },
  { icon: "Shield", title: "Quality Guaranteed", desc: "Not fresh? Full refund" },
  { icon: "Clock", title: "Open 24/7", desc: "Order anytime, we deliver" },
];

export default function Features() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12, scale: 1.05 }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-purple-600 to-pink-600  h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl shadow-xl group-hover:shadow-purple-500/50 transition">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
              <p className="text-gray-300">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}