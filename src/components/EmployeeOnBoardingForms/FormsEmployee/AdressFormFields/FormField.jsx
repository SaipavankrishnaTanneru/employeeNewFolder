import React from "react";
import InputBox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";
import AutoFillInputBox from "widgets/Inputbox/AutoFillInputBox";
import phoneIcon from "assets/JoinerPortalIcons/phoneIcon.svg";
import styles from "./FormField.module.css";

const FormField = ({
  field,
  section,
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled = false,
}) => {
  const fieldId = `${section}${field.key.charAt(0).toUpperCase()}${field.key.slice(1)}`;

  const handleBlur = () => {
    onBlur?.(section, field.key);
  };

  const renderError = () =>
    touched && error ? (
      <div className={styles.error_message}>{error}</div>
    ) : null;

  // Helper to ensure value is never null/undefined for Inputs
  const safeValue = value !== null && value !== undefined ? value : "";

  /* ---------------------------------------------------------------------- */
  /* INPUT                                                                  */
  /* ---------------------------------------------------------------------- */
  if (field.type === "input") {
    return (
      <div className={styles.field_wrapper}>
        <InputBox
          label={field.label}
          id={fieldId}
          name={fieldId}
          placeholder={field.placeholder}
          value={safeValue}
          onChange={(e) => onChange(section, field.key, e.target.value)}
          onBlur={handleBlur}
          disabled={disabled}
        />
        {renderError()}
      </div>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* DROPDOWN                                                               */
  /* ---------------------------------------------------------------------- */
  if (field.type === "dropdown") {
    const options = field.options || [];
    const optionNames = options.map((o) => o.name);

    // 🔴 FIX: Convert both to String for comparison to handle Type Mismatches
    const selectedLabel =
      options.find((o) => String(o.id) === String(value))?.name || "";

    return (
      <div className={styles.field_wrapper}>
        <Dropdown
          dropdownname={field.label}
          name={fieldId}
          results={optionNames}
          value={selectedLabel}
          onChange={(e) => {
            const selectedName = e.target.value;
            const selectedObj = options.find((o) => o.name === selectedName);
            onChange(
              section,
              field.key,
              selectedObj ? selectedObj.id : ""
            );
          }}
          disabled={disabled}
        />
        {renderError()}
      </div>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* PHONE                                                                  */
  /* ---------------------------------------------------------------------- */
  if (field.type === "phone") {
    return (
      <div className={styles.field_wrapper}>
        <div className={styles.phone_input_wrapper}>
          <label htmlFor={fieldId}>{field.label}</label>
          <div className={styles.phone_input_container}>
            <input
              type="text"
              id={fieldId}
              name={fieldId}
              placeholder={field.placeholder || "Enter phone number"}
              value={safeValue}
              onChange={(e) => onChange(section, field.key, e.target.value)}
              onBlur={handleBlur}
              className={`${styles.phone_input} ${
                touched && error ? styles.error_input : ""
              }`}
              disabled={disabled}
            />
            <img src={phoneIcon} alt="Phone" className={styles.phone_icon} />
          </div>
        </div>
        {renderError()}
      </div>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* AUTOFILL                                                               */
  /* ---------------------------------------------------------------------- */
  if (field.type === "autofill") {
    return (
      <div className={styles.field_wrapper}>
        <AutoFillInputBox
          label={field.label}
          id={fieldId}
          name={fieldId}
          placeholder={field.placeholder || "Enter pincode"}
          value={safeValue}
          onChange={(e) => onChange(section, field.key, e.target.value)}
          onBlur={handleBlur}
          disabled={disabled || field.disabled}
        />
        {renderError()}
      </div>
    );
  }

  return null;
};

export default FormField;