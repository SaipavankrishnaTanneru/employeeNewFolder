    // src/widgets/Searchbox/Searchbox.jsx
import React, { useState, useMemo } from "react";
import styles from "./SearchboxWithLabel.module.css";

const searchIcon = (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4500_13422)">
<path d="M7.79167 16.0878C10.9213 16.0878 13.4583 13.5508 13.4583 10.4212C13.4583 7.29157 10.9213 4.75452 7.79167 4.75452C4.66205 4.75452 2.125 7.29157 2.125 10.4212C2.125 13.5508 4.66205 16.0878 7.79167 16.0878Z" stroke="#0A0A0A" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.8749 17.5046L11.8291 14.4587" stroke="#0A0A0A" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_4500_13422">
<rect width="17" height="17" fill="white"/>
</clipPath>
</defs>
</svg>

)


const SearchBoxwithLabel = ({
  placeholder,
  type,
  width,
  label,
  // NEW props to support controlled usage:
  value, // optional controlled value
  onChange, // event handler (e) => ...
  onInput, // optional alias
  onValueChange, // optional: gets just the string
  inputRef, // optional: forward a ref from parent (for focus)
}) => {
  // If no `value` prop is provided, fall back to internal state.
  const [internal, setInternal] = useState("");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internal;

  const handleChange = (e) => {
    if (!isControlled) setInternal(e.target.value); // keep internal in sync

    // bubble up in multiple common shapes so parents can choose what they like
    onChange?.(e); // standard React onChange(event)
    onInput?.(e); // optional alias
    onValueChange?.(e.target.value); // just the raw string
  };

  const wrapperStyle = useMemo(() => (width ? { width } : undefined), [width]);

  return (
    <div className={styles.searchboxwrapper} style={wrapperStyle}>
        <label className={styles.searchBoxLabel}>{label}</label>
      <div className={styles.searchiconwithlabel}>{searchIcon}</div>
      <input
        ref={inputRef}
        className={`${styles.searchinput} ${
          type === "round" ? styles.round : styles.rectangle
        }`}
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBoxwithLabel;
