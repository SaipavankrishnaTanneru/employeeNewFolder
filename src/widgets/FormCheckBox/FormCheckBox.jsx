import React from 'react';
import styles from './FormCheckbox.module.css';
 
const FormCheckbox = ({
  name,
  checked = false,
  onChange,
  disabled = false
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };
 
  return (
    <div className={styles.form_checkbox_wrapper}>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.form_checkbox_input}
      />
      <label htmlFor={name} className={styles.form_checkbox_label}>
        <span className={`${styles.checkbox_custom} ${checked ? styles.checked : ''}`}>
          {checked && <span className={styles.blue_dot}></span>}
        </span>
      </label>
    </div>
  );
};
 
export default FormCheckbox;