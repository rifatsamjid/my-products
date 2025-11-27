
"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://my-season-server.onrender.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          shortDescription: formData.shortDescription,
          description: formData.description,
          price: Number(formData.price),
          image: formData.image || "https://via.placeholder.com/400x300.png?text=Fruit+Image",
        }),
      });

      if (res.ok) {
        toast.success("Product added successfully!", {
          style: { background: "#10b981", color: "white" },
        });
        
        setFormData({
          name: "",
          shortDescription: "",
          description: "",
          price: "",
          image: "",
        });
      } else {
        toast.error("Failed to add product. Try again.");
      }
    } catch (error) {
      toast.error("Network error! Check your connection.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-gray-200 font-medium mb-2">Product Title</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition"
          placeholder="e.g. Fresh Mango"
        />
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-gray-200 font-medium mb-2">Short Description</label>
        <input
          type="text"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          required
          className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition"
          placeholder="e.g. Sweet and juicy Alphonso mango"
        />
      </div>

      {/* Full Description */}
      <div>
        <label className="block text-gray-200 font-medium mb-2">Full Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
          className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition resize-none"
          placeholder="Write details about this fruit..."
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-gray-200 font-medium mb-2">Price ($)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="1"
          className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition"
          placeholder="e.g. 150"
        />
      </div>

      {/* Image URL (Optional) */}
      <div>
        <label className="block text-gray-200 font-medium mb-2">Image URL (Optional)</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition"
          placeholder="https://example.com/mango.jpg"
        />
        <p className="text-sm text-gray-400 mt-2">
          Leave empty for default placeholder image
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-5 rounded-xl font-bold text-xl text-white transition-all duration-300 transform hover:scale-105 shadow-xl
          ${loading 
            ? "bg-gray-600 cursor-not-allowed" 
            : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 shadow-green-500/50"
          }`}
      >
        {loading ? "Adding Product..." : "Add Product"}
      </button>
    </form>
  );
}