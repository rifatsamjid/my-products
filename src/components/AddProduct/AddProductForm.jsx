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

    // Validation 
    if (!formData.name || !formData.shortDescription || !formData.description || !formData.price) {
      toast.error("Please fill all required fields");
      return;
    }

    if (Number(formData.price) <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://my-season-server.onrender.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          shortDescription: formData.shortDescription.trim(),
          description: formData.description.trim(),
          price: Number(formData.price),
          image:
            formData.image.trim() ||
            "https://via.placeholder.com/400x300.png?text=Fruit+Image",
        }),
      });

      if (res.ok) {
        toast.success("Product added successfully!", {
          style: { background: "#10b981", color: "white" },
          icon: "Success",
        });

        // Reset form
        setFormData({
          name: "",
          shortDescription: "",
          description: "",
          price: "",
          image: "",
        });
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Add product error:", error);
      toast.error("Network error! Check internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-gray-200 font-medium mb-2">Product Title <span className="text-red-400">*</span></label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
          className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition disabled:opacity-70"
          placeholder="e.g. Fresh Mango"
        />
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-gray-200 font-medium mb-2">Short Description <span className="text-red-400">*</span></label>
        <input
          type="text"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          required
          disabled={loading}
          className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition disabled:opacity-70"
          placeholder="e.g. Sweet and juicy Alphonso mango"
        />
      </div>

      {/* Full Description */}
      <div>
        <label className="block text-gray-200 font-medium mb-2">Full Description <span className="text-red-400">*</span></label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
          disabled={loading}
          className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition resize-none disabled:opacity-70"
          placeholder="Write details about this fruit..."
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-gray-200 font-medium mb-2">Price ($) <span className="text-red-400">*</span></label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="1"
          step="0.01"
          disabled={loading}
          className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition disabled:opacity-70"
          placeholder="e.g. 150"
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-gray-200 font-medium mb-2">Image URL (Optional)</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          disabled={loading}
          className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-400/20 transition disabled:opacity-70"
          placeholder="https://example.com/mango.jpg"
        />
        <p className="text-sm text-gray-400 mt-2">
          Leave empty → default placeholder image
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-5 rounded-xl font-bold text-xl text-white transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3
          ${loading 
            ? "bg-gray-600 cursor-not-allowed opacity-70" 
            : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 shadow-green-500/50"
          }`}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding Product...
          </>
        ) : (
          "Add Product"
        )}
      </button>
    </form>
  );
}