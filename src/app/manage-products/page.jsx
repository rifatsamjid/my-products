"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ManageProducts from "@/components/ManageProducts/ManageProducts";
import toast from "react-hot-toast";
import { auth } from "../../../firebase.config";

export const metadata = {
  title: "Manage Products - FruitHub",
  description: "View and delete products from your store",
};

export default function ManageProductsPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        toast.error("Login required to manage products");
        router.push("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

 
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-purple-900/50 to-pink-900/30 flex items-center justify-center">
        <div className="text-white text-3xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-purple-900/50 to-pink-900/30 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Manage Products
          </h1>
          <p className="text-xl text-gray-300">
            View and delete products from your store
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-purple-500/30 p-6 sm:p-8">
          <ManageProducts />
        </div>
      </div>
    </div>
  );
}