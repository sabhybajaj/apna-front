"use client";

import { useEffect, useState } from "react";
import Header from "./Header"; // Import the Header component
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const [topics, setTopics] = useState([]);
  const [checkProgress, setCheckProgress] = useState({});
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null; // Fetch userId from localStorage


  const fetchProgressCheck = async () => {
    try{
      const response = await fetch(`http://localhost:5000/api/progress/progress-check/${userId}`);
      const data = await response.json();
      setCheckProgress(data.progress);
      // return data.progress;
    }catch (error) {
      console.error("Error fetching progress:", error);
    }
  }


  // Fetch DSA topics from the API
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dsa-topics");
        const data = await response.json();
        setTopics(data);
        
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
 
    fetchTopics();
    fetchProgressCheck();
  }, []);

  const handleCheckboxChange = async (topicId, subTopicId, status) => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    console.log("Checkbox toggled:", { topicId, subTopicId, status }); // Debug log
    try {
      const response = await fetch("http://localhost:5000/api/progress/update-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, topicId, subTopicId, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      console.log("Status updated successfully", response); // Debug log
      // Refetch progress to update the UI
      // fetchProgressCheck();
      // const updatedProgress = await fetchProgress();
      const data = await response.json();
      if(data?.progress)setCheckProgress(data.progress);

    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
console.log("topics",topics, checkProgress)
  return (
    <div>
      <Header /> {/* Add the Header component */}
      <div className={styles.container}>
        <h1 className={styles.title}>Topics</h1>
        <h2 className={styles.subtitle}>Explore these exciting topics!</h2>
        {topics.map((topic) => (
          <div key={topic._id} className={styles.topic}>
            <div className={styles.topicHeader}>
              <h3>{topic.mainTopic}</h3>
              <span className={styles.status}>{checkProgress && checkProgress?.[topic?.main_id] ? checkProgress?.[topic.main_id] : "check"}</span>
            </div>
            <div className={styles.subTopics}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>LeetCode Link</th>
                    <th>YouTube Link</th>
                    <th>Article Link</th>
                    <th>Level</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {topic.subTopics.map((subTopic) => (
                    <tr key={subTopic._id}>
                      <td>
                        <input
                          className={styles.checkbox}
                          type="checkbox"
                          checked={checkProgress?.[subTopic?.sub_topic_id] === "Done"}
                          onChange={(e) =>
                            handleCheckboxChange(
                              topic.main_id,
                              subTopic.sub_topic_id,
                              e.target.checked ? "Done" : "Pending"
                            )
                          }
                        />
                        {`  ${subTopic.name}`}
                      </td>
                      <td>
                        {subTopic.leetCodeLink ? (
                          <a
                            href={subTopic.leetCodeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Practice
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        {subTopic.youtubeLink ? (
                          <a
                            href={subTopic.youtubeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Watch
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        {subTopic.articleLink ? (
                          <a
                            href={subTopic.articleLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>{subTopic.level}</td>
                      <td>{checkProgress && checkProgress?.[subTopic?.sub_topic_id] ? checkProgress?.[subTopic.sub_topic_id] :  "check"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
