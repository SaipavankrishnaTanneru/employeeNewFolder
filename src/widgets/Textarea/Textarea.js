import React from "react";
// Reverted to original fixed stylesheet
import styles from "./TextareaFixed.module.css";
import Asterisk from "../../assets/application-status/Asterisk";

// Reuse same pattern concept as Inputbox but keep minimal for now
const Textarea = ({
  label,
  id,
  name,
  placeholder,
  onChange,
  value,
  maxLength = null,
  disabled = false,
  required = false,
  error,
  readOnly = false,
  rows = 4,
}) => {
  const handleChange = (e) => {
    let val = e.target.value;
    if (maxLength && val.length > maxLength) {
      val = val.slice(0, maxLength);
    }
    onChange && onChange({ target: { name, value: val } });
  };

  return (
    <div className={styles.textarea_wrapper}>
      <label htmlFor={name} className={styles.label_container}>
        {label}
        {required && <Asterisk style={{ marginLeft: "4px" }} />}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={readOnly ? undefined : handleChange}
        className={styles.textarea_box}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        maxLength={maxLength || undefined}
      />
      {error && <p className={styles.errormessage}>{error}</p>}
    </div>
  );
};

export default Textarea;
