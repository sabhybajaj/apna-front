"use client";

import { useEffect, useState } from "react";
import Header from "../topic/Header"; // Import the Header component
import styles from "../progress/progress.module.css";
import { useRouter } from "next/navigation";

export default function Progress() {
  const [progress, setProgress] = useState({});
  const router = useRouter();

  // Retrieve the user ID dynamically (e.g., from localStorage or context)
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const userName = typeof window !== "undefined" ? localStorage.getItem("userName") : null;

  useEffect(() => {
    if (!userId) {
        router.push('/login')
      return;
    }

  }, [userId]);


  const handleClick = ()=>{
    router.push('/topic')
    
  }




  return (
    <div>
  <Header /> {/* Add the Header component */}
  <div className={styles.container}>
    <h1 className={styles.title}>Welcome, {userName}</h1>
    <div className={styles.description}>Go through our DSA topics and start your learning journey.
        <div>
        <button className={styles.button} onClick={()=>handleClick()}>
      Go to Topics Page
    </button>
        </div>
    </div>

  </div>
</div>

  );
}