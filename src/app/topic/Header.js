import styles from "./header.module.css";

export default function Header() {
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userId");
    // Redirect to login page
    window.location.href = "/login";
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Dashboard</div>
      <nav className={styles.nav}>
        <a href="/profile" className={styles.navLink}>
          Profile
        </a>
        <a href="/topic" className={styles.navLink}>
          Topics
        </a>
        <a href="/progress" className={styles.navLink}>
          Progress
        </a>
        <a href="/login"  onClick={handleLogout} className={styles.navLink}>
          Logout
        </a>
      </nav>
    </header>
  );
}