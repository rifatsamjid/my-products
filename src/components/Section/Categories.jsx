"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  {
    name: "Mango",
    img: "https://i.ibb.co.com/GQ6yn6RD/apple-mango-1674558088695.webp",
  },
  { name: "Litchi", img: "https://i.ibb.co.com/QFFFTJhF/images-23.jpg" },
  {
    name: "Guava",
    img: "https://i.ibb.co.com/9HffHByz/Guava-15d1050d22034909bfca038ef1f8aaa2.jpg",
  },
  {
    name: "Coconut",
    img: "https://i.ibb.co.com/qYt1N1Y3/shutterstock-490174816.webp",
  },
];

export default function Categories() {
  return (
    <section className="py-20 px-6 bg-black/40">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
            >
              <Image
                src={cat.img}
                alt={cat.name}
                width={400}
                height={400}
                className="object-cover w-full h-64 transition group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">
                {cat.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
