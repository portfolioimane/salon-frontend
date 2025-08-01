"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { login, checkAuth } from "@/store/authSlice";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();

      // After login succeeds, fetch the user info again to be sure
      const user = await dispatch(checkAuth()).unwrap();

      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-gradient-to-br from-yellow-200 via-pink-200 to-rose-300 rounded-3xl p-10 shadow-xl space-y-6"
    >
      <h2 className="text-3xl font-extrabold text-rose-600 text-center mb-6">
        Welcome Back
      </h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-semibold text-rose-700">
          Email:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-lg border border-rose-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent shadow-sm"
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-semibold text-rose-700">
          Password:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded-lg border border-rose-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent shadow-sm"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 text-white font-bold py-3 rounded-full shadow-lg hover:shadow-2xl hover:from-rose-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-300"
      >
        Login
      </button>

      {error && (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      )}

      <div className="text-center text-rose-700">

        <p className="mt-3">
          <a
            href="/forgotpassword"
            className="underline font-semibold hover:text-rose-900"
          >
            Forgot your password?
          </a>
        </p>
      </div>
    </form>
  );
}
