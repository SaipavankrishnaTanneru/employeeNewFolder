import React, { useEffect } from "react";
import styles from "./Snackbar.module.css";

const Snackbar = ({ message, type = "error", open, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (open && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  if (!open || !message) return null;

  return (
    <div className={`${styles.snackbar} ${styles[type]}`}>
      <div className={styles.content}>
        <span className={styles.message}>{message}</span>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default Snackbar;

