import React, { useState, useRef, useEffect } from "react";
import styles from "./Popup.module.css";

// Assuming these paths are correct, but they are not used in the final JSX 
// unless your Button component needs them, which is unlikely based on the provided code.
import popupicon from "../../assets/popupicons/Frame 1410092371.svg"; 
import closeicon from "../../assets/popupicons/iconamoon_close.svg"; 

import Button from "../Button/Button";
import DistriubtionSuccessPage from "./DistriubtionSuccessPage";
 
// SVG icon definition (remains the same)
const rightSideIcon = (
    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.36133 9.59636C3.87952 9.59636 3.48894 9.98694 3.48894 10.4688C3.48894 10.9506 3.87952 11.3411 4.36133 11.3411V10.4688V9.59636ZM18.064 11.0856C18.4047 10.7449 18.4047 10.1926 18.064 9.85188L12.5122 4.30002C12.1715 3.95933 11.6191 3.95933 11.2784 4.30002C10.9378 4.64071 10.9378 5.19308 11.2784 5.53377L16.2134 10.4688L11.2784 15.4037C10.9378 15.7444 10.9378 16.2968 11.2784 16.6375C11.6191 16.9782 12.1715 16.9782 12.5122 16.6375L18.064 11.0856ZM4.36133 10.4688V11.3411H17.4472V10.4688V9.59636H4.36133V10.4688Z" fill="white"/>
    </svg>
);
 
/**
 * Popup component that handles closing via the 'x' icon or an outside click.
 * @param {boolean} isOpen - Controls whether the popup is visible.
 * @param {function} onClose - Function to call to close the popup.
 * @param {function} onConfirm - Function to call when 'Yes' is clicked (optional, added for completeness).
 */
const Popup = ({ isOpen, onClose, onConfirm, name }) => {
  const contentRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);
 
  useEffect(() => {
    if (!isOpen) return;
 
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        onClose();
      }
    };
 
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
 
  }, [isOpen, onClose]);
 
  if (!isOpen) return null;
 
  const handleConfirm = async () => {
    console.log("📡 YES clicked → Triggering API now...");
 
    if (!onConfirm) {
      console.error("❌ Popup ERROR: onConfirm is missing!");
      return;
    }
 
    try {
      const result = await onConfirm();   // <-- API HIT HAPPENS HERE
      console.log("✅ API SUCCESS RESULT:", result);
 
      setShowSuccess(true);  // show success only after API completes
    } catch (err) {
      console.error("❌ API FAILED:", err);
      onClose();
    }
  };
 
  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };
 
  return (
    <div className={styles.popup_container}>
      <div className={styles.popup_content} ref={contentRef}>
 
        <div className={styles.popup_closeicon} onClick={onClose}>
          <img src={closeicon} alt="Close" />
        </div>
 
        {!showSuccess ? (
          <>
            <div className={styles.popup_top}>
              <figure><img src={popupicon} alt="Popup Icon" /></figure>
              <p className={styles.popup_text}>Are you sure to {name}?</p>
            </div>
 
            <div className={styles.popup_buttons}>
              <Button buttonname="No" variant="noButton" onClick={onClose} />
              <Button
                buttonname="Yes"
                variant="yesButton"
                righticon={rightSideIcon}
                onClick={handleConfirm}
              />
            </div>
          </>
        ) : (
          <DistriubtionSuccessPage onClose={handleSuccessClose} />
        )}
 
      </div>
    </div>
  );
};
 
export default Popup;