import React, { useState, useEffect, useRef } from "react";
import styles from "./Gender.module.css";

const Gender = ({ name, label = "Gender", value, onChange }) => {

  // Normalize value function
  const normalizeGenderValue = (val) => {
    if (!val || val === "") return "";
    const normalizedValue = String(val).toUpperCase().trim();
    // Map various gender formats to MALE or FEMALE
    if (normalizedValue === "MALE" || normalizedValue === "M" || normalizedValue.includes("MALE")) {
      return "MALE";
    } else if (normalizedValue === "FEMALE" || normalizedValue === "F" || normalizedValue.includes("FEMALE")) {
      return "FEMALE";
    }
    return normalizedValue;
  };

  // Initialize with normalized value
  const initialValue = normalizeGenderValue(value);
  const [selected, setSelected] = useState(initialValue);
  const prevValueRef = useRef(value);

  // Sync selected state when value prop changes from parent (controlled component)
  useEffect(() => {
    // Only update if value actually changed from outside (not from our own click)
    if (value !== prevValueRef.current) {
      const normalized = normalizeGenderValue(value);
      console.log("🔄 Gender component: Value prop changed from parent. Original:", value, "Normalized:", normalized);
      setSelected(normalized);
      prevValueRef.current = value;
    }
  }, [value]);

  const genderOptions = [
    { id: 1, label: "Male", value: "MALE" },
    { id: 2, label: "Female", value: "FEMALE" }
  ];

  const handleSelect = (val) => {
    console.log("👆 Gender clicked:", val);
    
    // Update local state immediately for instant UI feedback
    setSelected(val);
    
    // Update the ref to prevent useEffect from overwriting
    prevValueRef.current = val;
    
    // Call onChange with event-like object for Formik compatibility
    // Formik expects: onChange(e) where e.target.value contains the value
    if (onChange) {
      onChange({ target: { name, value: val } });
    }
  };

  return (
    <div className={styles.gender_wrapper}>
      <p className={styles.gender_label}>{label}</p>
      <div className={styles.gender_content}>
        {genderOptions.map((option) => (
          <label
            key={option.id}
            className={`${styles.gender_option} ${
              selected === option.value ? styles.active : ""
            }`}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Gender;
