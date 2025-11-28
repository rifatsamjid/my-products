"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { auth } from "../../../../firebase.config";


export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Email & Password Registration
  const handleEmailRegister = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("Please fill in all fields!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update Firebase profile with name & phone
      await updateProfile(user, {
        displayName: name,
        phoneNumber: phone,
      });

      toast.success("Account created successfully!");

      // Sign in with NextAuth (creates session)
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Auto login failed. Please log in manually.");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("An account with this email already exists!");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak!");
      } else {
        toast.error("Registration failed! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In 
  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/",
      });
      
    } catch (error) {
      toast.error("Google sign in failed!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-purple-900/60 to-pink-900/40 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-purple-500/40 p-8 sm:p-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Create Account
            </h1>
            <p className="text-gray-300 text-lg">Join FruitHub today!</p>
          </div>

          {/* Email Registration Form */}
          <form onSubmit={handleEmailRegister} className="space-y-5">
            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition"
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition"
                placeholder="+880 1xxxxxxxxx"
                required
              />
            </div>

            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition"
                placeholder="At least 6 characters"
                required
              />
            </div>

            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-xl font-bold text-xl text-white transition-all duration-300 transform hover:scale-105 shadow-2xl
                ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-purple-500/50"
                }`}
            >
              {loading ? "Creating Account..." : "Register Now"}
            </button>
          </form>

          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-purple-500/30"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-purple-500/30"></div>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleRegister}
            disabled={loading}
            className="w-full py-4 bg-white/10 hover:bg-white/20 border border-purple-500/50 rounded-xl text-white font-medium transition flex items-center justify-center gap-3 disabled:opacity-60"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-gray-300 mt-8 text-lg">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-400 font-bold hover:text-green-300 transition underline"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
