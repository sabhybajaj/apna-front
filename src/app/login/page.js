"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css"; // Import the CSS file

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      console.log("Response status:", response.status); // Log the response status
      const data = await response.json();
      console.log("Response data:", data); // Log the response data

      if (response.ok) {
        
        localStorage.setItem("userId", data?.user?.id);
        localStorage.setItem("userName", data?.user?.username);
        alert("Login successful!");
        router.push("/profile"); // Redirect to topic or another page
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error logging in:", error); // Log the error
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
        <p className={styles.registerLink}>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}

