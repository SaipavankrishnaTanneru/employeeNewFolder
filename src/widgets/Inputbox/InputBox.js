import React from "react";
import styles from "./InputBox.module.css";
import Asterisk from "../../assets/icons/Asterisk";
import { validateAadhaar } from "utils/validateAadhaar";

// ---------------------- REGEX PATTERNS ---------------------- //
const patterns = {
  alpha: /^[A-Za-z ]*$/,
  digits: /^[0-9]*$/,
  alphanumeric: /^[A-Za-z0-9 ]*$/,
  onlyLettersSingleSpace: /^$|^[A-Za-z]+(?: [A-Za-z]*)?$/,
  email: /^$|^[A-Za-z0-9][A-Za-z0-9._%+-]*(@[A-Za-z0-9]*)?(\.[A-Za-z0-9]*)*$/,
  aapar: /^(?![01])[0-9]{12}$/,
  aadhaar: /^$|^[2-9][0-9]{0,11}$/,
  doorNo: /^$|^[A-Za-z0-9\/\-\$#\.]+$/,
  area: /^$|^[A-Za-z0-9 ,]+$/,
  digitsOnly: /^$|^[0-9]+$/,
  noSpecialNoDigits: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
  address: /^[A-Za-z0-9\-\/#& ]*$/,
  none: /.*/,
  hallticket: /^[A-Za-z0-9]*$/,
};

const Inputbox = ({
  label,
  id,
  name,
  placeholder,
  onChange,
  value,
  inputRule = "none",
  autoCapitalize = false,
  maxLength = null,
  type = "text",
  disabled = false,
  required = false,
  error,
  readOnly = false,
  rightIcon, // <--- 1. Add rightIcon to props
}) => {
  const handleInput = (e) => {
    let val = e.target.value;
    const regex = patterns[inputRule] || patterns.none;

    if (maxLength && val.length > maxLength) return;
    if (!regex.test(val)) return;

    if (inputRule === "alpha") {
      val = val.replace(/\s\s+/g, " ");
    }

    if (autoCapitalize && val.length > 0) {
      val = val.charAt(0).toUpperCase() + val.slice(1);
    }

    if (inputRule === "aadhaar" && val.length === 12) {
      const isValid = validateAadhaar(val);
      if (!isValid) {
        onChange({
          target: { name, value: val },
          aadhaarError: "Invalid Aadhaar number",
        });
        return;
      }
    }

    onChange({ target: { name, value: val } });
  };

  return (
    <div className={styles.inputbox_wrapper}>
      <label htmlFor={name} className={styles.label_container}>
        {label}
        {required && <Asterisk style={{ marginLeft: "4px" }} />}
      </label>

      {/* 2. Create a Relative Wrapper for Input + Icon */}
      <div className={styles.input_container_relative}>
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={readOnly ? undefined : handleInput}
          // 3. Add conditional class if icon exists to add padding
          className={`${styles.input_box} ${rightIcon ? styles.has_icon : ''}`} 
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength || undefined}
        />

        {/* 4. Render the Icon */}
        {rightIcon && (
          <span className={styles.right_icon_wrapper}>
            {rightIcon}
          </span>
        )}
      </div>

      {error && <p className={styles.errormessage}>{error}</p>}
    </div>
  );
};

export default Inputbox;