"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { auth } from "../../../firebase.config";
import AddProductForm from "./AddProductForm";

export default function AddProductClient() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        toast.error("Login required!");
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-purple-900/50 to-pink-900/30 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Add New Product</h1>
          <p className="text-xl text-gray-300">Share fresh fruits with everyone!</p>
        </div>
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-purple-500/30 p-8">
          <AddProductForm />
        </div>
      </div>
    </div>
  );
}