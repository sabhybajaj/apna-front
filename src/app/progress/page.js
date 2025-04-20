"use client";

import { useEffect, useState } from "react";
import Header from "../topic/Header"; // Import the Header component
import styles from "./progress.module.css";

export default function Progress() {
  const [progress, setProgress] = useState({});

  // Retrieve the user ID dynamically (e.g., from localStorage or context)
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }


    const fetchProgressCheck = async () => {
      try{
        const response = await fetch(`https://apna-api.onrender.com/api/progress/progress-check/${userId}`);
        const data = await response.json();
        console.log("data.progress",data.progress)
        setProgress(data.progress);
        // return data.progress;
      }catch (error) {
        console.error("Error fetching progress:", error);
      }
    }

    fetchProgressCheck();
  }, [userId]);

  if (!progress) {
    return <div>Loading...</div>;
  }


    const easyKeys = [11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43, 51, 52, 53, 61, 62, 63];
    const mediumKeys = [14, 24, 34, 44, 54, 64];
    const hardKeys = [15, 25, 35, 45, 55, 65];
  
    const calculate = (keys) => {
      const total = keys.length;
      const doneCount = keys.filter((key) => progress[key] === 'Done').length;
      return Math.round((doneCount / total) * 100);
    };


  return (
    <div>
      <Header /> {/* Add the Header component */}
      <div className={styles.container}>
        <h1 className={styles.title}>Progress Report</h1>
        <div className={styles.progress}>
          <p className={styles.progressText}>
            EASY: {calculate(easyKeys)}%
          </p>
          <p className={styles.progressText}>
            MEDIUM: {calculate(mediumKeys)}%
          </p>
          <p className={styles.progressText}>
            HARD: {calculate(hardKeys)}%
          </p>
        </div>
      </div>
    </div>
  );
}