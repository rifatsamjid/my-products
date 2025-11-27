"use client";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Ayesha Khan",
    text: "Best mangoes I've ever had! Delivered in 2 hours.",
    rating: 5,
  },
  {
    name: "Rahim Mia",
    text: "Fresh litchi, reasonable price. Highly recommend!",
    rating: 5,
  },
  {
    name: "Fatima Akter",
    text: "Jackfruit was perfectly ripe. Will order again!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
          Happy Customers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-8 hover:border-green-400/50 transition-all duration-300"
            >
            
              <div className="flex justify-center mb-4 gap-1">
                {[...Array(r.rating)].map((_, index) => (
                  <span key={index} className="text-yellow-400 text-2xl">
                    ⭐
                  </span>
                ))}
              </div>

              <p className="text-gray-200 italic mb-6 leading-relaxed">
                "{r.text}"
              </p>
              <p className="text-white font-semibold text-lg">- {r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
