
"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AuthPage() {
  const [mode, setMode] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAuth() {
    if (!supabase) {
      setMessage("Supabase configuration missing.");
      return;
    }

    if (!email.trim() || password.length < 6) {
      setMessage("Enter a valid email and password (minimum 6 characters).");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result =
        mode === "signup"
          ? await supabase.auth.signUp({ email, password })
          : await supabase.auth.signInWithPassword({ email, password });

      if (result.error) throw result.error;

      setMessage(
        mode === "signup"
          ? "Signup successful. Check your email for confirmation."
          : "Login successful!"
      );
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#090914",
      color: "white",
      display: "grid",
      placeItems: "center",
      padding: 20,
      fontFamily: "Arial"
    }}>
      <section style={{
        width: "100%",
        maxWidth: 400,
        background: "#17152b",
        padding: 25,
        borderRadius: 16,
        border: "1px solid #373052"
      }}>
        <h1 style={{ color: "#a78bfa" }}>NOXCLIP AI</h1>
        <h2>{mode === "signup" ? "Create Account" : "Welcome Back"}</h2>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={field}
        />

        <input
          type="password"
          placeholder="Password (minimum 6 characters)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={field}
        />

        <button onClick={handleAuth} disabled={loading} style={button}>
          {loading
            ? "Please wait..."
            : mode === "signup"
              ? "Sign Up"
              : "Login"}
        </button>

        <p style={{ color: "#c4b5fd" }}>{message}</p>

        <button
          onClick={() => {
            setMode(mode === "signup" ? "login" : "signup");
            setMessage("");
          }}
          style={{ ...button, background: "#373052" }}
        >
          {mode === "signup"
            ? "Already have an account? Login"
            : "Create a new account"}
        </button>
      </section>
    </main>
  );
}

const field = {
  width: "100%",
  boxSizing: "border-box",
  padding: 14,
  marginTop: 14,
  background: "#24213b",
  color: "white",
  border: "1px solid #55477b",
  borderRadius: 8
};

const button = {
  width: "100%",
  padding: 14,
  marginTop: 18,
  background: "#8b5cf6",
  color: "white",
  border: 0,
  borderRadius: 9,
  fontWeight: "bold",
  cursor: "pointer"
};
            
