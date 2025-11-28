"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://my-season-server.onrender.com/products");
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`https://my-season-server.onrender.com/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Product deleted successfully!");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error("Failed to delete product");
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
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        <p className="text-2xl text-gray-300 mt-6">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-6xl mb-6 text-white">No Products Found</h1>
        <p className="text-xl text-gray-400">
          Go to <span className="text-green-400 font-bold">"Add Product"</span> and add some fresh items!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Mobile View - Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden mt-10 gap-6 pb-10">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-purple-500/30 hover:border-green-400/60 transition-all shadow-xl"
          >
            <div className="flex gap-5">
              <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={product.image_url || "/placeholder.jpg"}
                  alt={product.title}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-white line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-green-400 text-3xl font-bold mt-2">
                  ${product.price}
                </p>
                <p className="text-gray-400 text-sm mt-3 line-clamp-3">
                  {product.short_description || "No description available"}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition transform hover:scale-105">
                View Details
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                disabled={deletingId === product._id}
                className={`flex-1 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 ${
                  deletingId === product._id
                    ? "bg-gray-600 opacity-70"
                    : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white"
                }`}
              >
                {deletingId === product._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden lg:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b-2 border-purple-500/50">
              <th className="py-6 px-6 text-gray-200 font-bold text-lg">Image</th>
              <th className="py-6 px-6 text-gray-200 font-bold text-lg">Name</th>
              <th className="py-6 px-6 text-gray-200 font-bold text-lg">Price</th>
              <th className="py-6 px-6 text-gray-200 font-bold text-lg">Description</th>
              <th className="py-6 px-6 text-gray-200 font-bold text-lg text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-purple-500/10 hover:bg-white/5 transition">
                <td className="py-6 px-6">
                  <div className="w-24 h-24 rounded-xl overflow-hidden">
                    <Image
                      src={product.image_url || "/placeholder.jpg"}
                      alt={product.title}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-6 px-6">
                  <p className="text-white font-bold text-xl">{product.title}</p>
                </td>
                <td className="py-6 px-6">
                  <p className="text-green-400 font-bold text-3xl">${product.price}</p>
                </td>
                <td className="py-6 px-6 text-gray-400 max-w-md">
                  <p className="line-clamp-3">
                    {product.short_description || product.full_description || "No description"}
                  </p>
                </td>
                <td className="py-6 px-6 text-center">
                  <div className="flex gap-4 justify-center">
                    <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition transform hover:scale-105">
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      disabled={deletingId === product._id}
                      className={`px-8 py-4 font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 ${
                        deletingId === product._id
                          ? "bg-gray-600 opacity-70"
                          : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white"
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
    </div>
  );
}