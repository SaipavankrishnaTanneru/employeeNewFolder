// components/Searchbox/Searchbox.js
import React from "react";
import styles from "../Searchbox/Searchbox.module.css";

// Updated props to include onKeyDown, onValueChange, and icon
const Searchbox = ({ 
  placeholderText, 
  customClass, 
  onClick, 
  onValueChange, // Changed from onChange to onValueChange to match parent usage
  value,
  onKeyDown,    // New prop for handling Enter key
  icon          // New prop to allow custom icons
}) => {

  const handleInputChange = (e) => {
    // If parent provided onValueChange, pass just the string value
    if (onValueChange) {
      onValueChange(e.target.value);
    }
  };

  return (
    <div className={`${styles.search_bar} ${customClass || ''}`} onClick={onClick}>
      {/* If an icon prop is passed (like from ModuleHeader), use it. Otherwise use default SVG */}
      {icon ? (
        <span className={styles.iconWrapper}>{icon}</span>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
          <path
            d="M7.79167 14.3636C10.9213 14.3636 13.4583 11.8266 13.4583 8.69694C13.4583 5.56733 10.9213 3.03027 7.79167 3.03027C4.66205 3.03027 2.125 5.56733 2.125 8.69694C2.125 11.8266 4.66205 14.3636 7.79167 14.3636Z"
            stroke="#0A0A0A"
            strokeWidth="1.41667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.8748 15.7803L11.829 12.7345"
            stroke="#0A0A0A"
            strokeWidth="1.41667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      <input
        placeholder={placeholderText}
        className={`${styles.search_application_input}`}
        onChange={handleInputChange} // Use local handler to extract value
        value={value}
        onKeyDown={onKeyDown} // Pass the key listener to input
      />
    </div>
  );
};

export default Searchbox;