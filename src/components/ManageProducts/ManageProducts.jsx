"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://my-season-server.onrender.com/products");
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);

    try {
      const res = await fetch(`https://my-season-server.onrender.com/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Product deleted successfully!", { icon: "Trash Can" });
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        const error = await res.json().catch(() => ({}));
        toast.error(error.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Network error! Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        <p className="text-2xl text-gray-300 mt-6 font-medium">Loading products...</p>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">No Products</div>
        <p className="text-2xl text-gray-400 mb-4">No products found in your store</p>
        <p className="text-lg text-gray-500">
          Go to <span className="text-green-400 font-bold">"Add Product"</span> page and add some fresh fruits!
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
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-green-400/60 transition-all duration-300 shadow-xl"
          >
            <div className="flex gap-5">
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-800 shadow-2xl flex-shrink-0">
                <Image
                  src={product.image || product.image_url || "https://via.placeholder.com/400x300.png?text=No+Image"}
                  alt={product.name || product.title || "Product"}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-white line-clamp-2">
                  {product.name || product.title || "Unnamed Product"}
                </h3>
                <p className="text-green-400 text-3xl font-bold mt-2">
                  ${product.price || "0"}
                </p>
                <p className="text-gray-400 text-sm mt-3 line-clamp-3">
                  {product.shortDescription || product.description || "No description available"}
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
                    ? "bg-gray-600 cursor-not-allowed opacity-70"
                    : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white"
                }`}
              >
                {deletingId === product._id ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b-2 border-purple-500/50">
              <th className="py-6 px-6 text-gray-200 font-bold text-lg">Image</th>
              <th className="py-6 px-6 text-gray-200 font-bold text-lg">Product Name</th>
              <th className="py-6 px-6 text-gray-200 font-bold text-lg">Price</th>
              <th className="py-6 px-6 text-gray-200 font-bold text-lg">Description</th>
              <th className="py-6 px-6 text-gray-200 font-bold text-lg text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-purple-500/10 hover:bg-white/5 transition">
                <td className="py-6 px-6">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-800 shadow-xl">
                    <Image
                      src={product.image || product.image_url || "/placeholder.jpg"}
                      alt={product.name || product.title}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-6 px-6">
                  <p className="text-white font-bold text-xl">
                    {product.name || product.title || "Unknown"}
                  </p>
                </td>
                <td className="py-6 px-6">
                  <p className="text-green-400 font-bold text-3xl">৳{product.price || "0"}</p>
                </td>
                <td className="py-6 px-6 text-gray-400 max-w-md">
                  <p className="line-clamp-2">
                    {product.shortDescription || product.description || "No description"}
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
                      className={`px-8 py-4 font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 ${
                        deletingId === product._id
                          ? "bg-gray-600 cursor-not-allowed opacity-70"
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