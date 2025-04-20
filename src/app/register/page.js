"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../login/login.module.css"; // Reuse the same CSS file as login

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://apna-api.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! Please log in.");
        router.push("/login"); // Redirect to login page
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Register</h1>
        <form onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Set password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Register
          </button>
        </form>
        <p className={styles.registerLink}>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}