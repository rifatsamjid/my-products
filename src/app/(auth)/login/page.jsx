"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-purple-900/50 to-pink-900/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-purple-500/30 p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Welcome Back
            </h1>
            <p className="text-gray-300 text-lg">
              Log in to your FruitHub account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  className="mr-2 rounded text-green-500"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-purple-400 hover:text-green-400 transition"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-xl font-bold text-xl text-white transition-all duration-300 transform hover:scale-105 shadow-xl
                ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 shadow-green-500/50"
                }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-purple-500/30"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-purple-500/30"></div>
          </div>

          {/* Social Login (Optional) */}
          <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-purple-500/50 rounded-xl text-white font-medium transition flex items-center justify-center gap-3">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.033s2.701-6.033,6.033-6.033c1.879,0,3.552,0.871,4.658,2.237l1.034-1.034C16.357,6.051,14.522,5,12.545,5C8.529,5,5.333,8.196,5.333,12.173c0,3.977,3.196,6.824,7.212,6.824c4.411,0,6.866-3.124,6.866-7.522c0-0.504-0.056-0.891-0.125-1.274H12.545z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-gray-300 mt-8">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-green-400 font-bold hover:text-green-300 transition"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
