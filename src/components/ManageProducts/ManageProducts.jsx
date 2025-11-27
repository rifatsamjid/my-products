"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://my-season-server.onrender.com/products");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);

    try {
      const res = await fetch(
        `https://my-season-server.onrender.com/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Product deleted successfully!");
        setProducts(products.filter((p) => p._id !== id));
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "Failed to delete product");
      }
    } catch (error) {
      toast.error("Network error!");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-400"></div>
        <p className="text-xl text-gray-300 mt-4">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-gray-400">No products found</p>
        <p className="text-gray-500 mt-2">
          Go to "Add Product" page and add some fresh fruits!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Mobile Card View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-green-400 transition-all duration-300"
          >
            <div className="flex gap-4">
              <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-800 shadow-lg flex-shrink-0">
                <Image
                  src={
                    product.image_url ||
                    "https://via.placeholder.com/400x300/10b981/ffffff?text=FruitHub"
                  }
                  alt={product.title || "Product"}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-white line-clamp-2">
                  {product.title || "No Title"}
                </h3>
                <p className="text-green-400 text-2xl font-bold mt-2">
                  ৳{product.price || "0"}
                </p>
                <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                  {product.short_description ||
                    product.full_description ||
                    "No description available"}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-semibold transition transform hover:scale-105 shadow-lg">
                View
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                disabled={deletingId === product._id}
                className={`flex-1 py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-lg ${
                  deletingId === product._id
                    ? "bg-gray-600 cursor-not-allowed opacity-70"
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white"
                }`}
              >
                {deletingId === product._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <table className="hidden lg:table w-full border-collapse">
        <thead>
          <tr className="text-left border-b-2 border-purple-500/50">
            <th className="py-5 px-6 text-gray-200 font-bold text-lg">Image</th>
            <th className="py-5 px-6 text-gray-200 font-bold text-lg">
              Product Name
            </th>
            <th className="py-5 px-6 text-gray-200 font-bold text-lg">Price</th>
            <th className="py-5 px-6 text-gray-200 font-bold text-lg">
              Description
            </th>
            <th className="py-5 px-6 text-gray-200 font-bold text-lg text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="border-b border-purple-500/10 hover:bg-white/5 transition-all duration-200"
            >
              <td className="py-6 px-6">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-800 shadow-xl">
                  <Image
                    src={
                      product.image_url ||
                      "https://via.placeholder.com/400x300/10b981/ffffff?text=No+Image"
                    }
                    alt={product.title || "Product"}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="py-6 px-6">
                <p className="text-white font-semibold text-lg">
                  {product.title || "Unknown Product"}
                </p>
              </td>
              <td className="py-6 px-6">
                <p className="text-green-400 font-bold text-2xl">
                  ৳{product.price || "0"}
                </p>
              </td>
              <td className="py-6 px-6 text-gray-400 max-w-md">
                <p className="line-clamp-2">
                  {product.short_description ||
                    product.full_description ||
                    "No description"}
                </p>
              </td>
              <td className="py-6 px-6 text-center">
                <div className="flex gap-4 justify-center">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl transition transform hover:scale-105 shadow-lg">
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                    className={`px-6 py-3 font-bold rounded-xl transition transform hover:scale-105 shadow-lg ${
                      deletingId === product._id
                        ? "bg-gray-600 cursor-not-allowed opacity-70"
                        : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white"
                    }`}
                  >
                    {deletingId === product._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}