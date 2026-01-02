import React, { useRef, useEffect } from "react";
import styles from "./EditPopup.module.css";
import colsemodalicon from "assets/icons/closemodalicon.svg";
import Button from "widgets/Button/Button";

const EditPopup = ({ isOpen, title, onClose, onSave, children }) => {
  const contentRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup} ref={contentRef}>
        {/* Header */}
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <img
            src={colsemodalicon}
            alt="close"
            className={styles.closeIcon}
            onClick={onClose}
          />
        </div>

        {/* Body */}
        <div className={styles.body}>
          {children}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Button
            buttonname="Save"
            onClick={onClose}
            type="button"
            variant="primary"
            width="110px"
          />
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
