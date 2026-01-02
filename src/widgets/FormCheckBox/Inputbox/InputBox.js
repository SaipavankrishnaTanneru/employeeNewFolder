import React from "react";
import styles from "./InputBox.module.css";

const Inputbox = ({ label, id, name, placeholder, onChange, value, type = "text",disabled = false }) => {
  return (
    <div className={styles.inputbox_wrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input_box}
        disabled={disabled}
      />
    </div>
  );
};

export default Inputbox;
