import React from "react";
import styles from "./PhoneNumberBox.module.css";
// import Asterisk from "../../assets/Asterisk"; 

const phonenumberIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.85403 2.15319L5.62485 1.92084C6.49838 1.65754 7.43169 2.08306 7.80578 2.9152L8.40134 4.24001C8.7202 4.94929 8.55217 5.78286 7.98342 6.31322L6.99642 7.23362C6.96757 7.26052 6.9493 7.29686 6.94493 7.33606C6.91563 7.59838 7.09346 8.10923 7.50315 8.81884C7.80107 9.33486 8.07073 9.69674 8.30025 9.90027C8.46017 10.0421 8.5482 10.0727 8.58567 10.0616L9.91351 9.65562C10.657 9.42832 11.4627 9.69937 11.9176 10.3298L12.7635 11.5022C13.296 12.2402 13.2002 13.2582 12.5395 13.8839L11.9541 14.4384C11.3223 15.0366 10.423 15.2596 9.58499 15.0257C7.76587 14.5179 6.13486 12.9828 4.67388 10.4523C3.21088 7.91831 2.69753 5.73568 3.17076 3.90487C3.38732 3.06702 4.02546 2.40294 4.85403 2.15319ZM5.13997 3.1018C4.64283 3.25166 4.25994 3.6501 4.13 4.15281C3.73194 5.69281 4.18694 7.62737 5.53192 9.95693C6.87509 12.2834 8.32092 13.6442 9.85135 14.0714C10.3542 14.2117 10.8938 14.078 11.2728 13.719L11.8583 13.1646C12.1586 12.8801 12.2021 12.4174 11.9601 12.082L11.1141 10.9096C10.9074 10.623 10.5411 10.4998 10.2032 10.6031L8.87203 11.0101C8.09942 11.2404 7.39816 10.6185 6.64511 9.31422C6.13764 8.43525 5.90111 7.75579 5.96028 7.22609C5.99092 6.95169 6.11878 6.69732 6.32071 6.50902L7.30772 5.58862C7.56624 5.34755 7.64262 4.96865 7.49768 4.64625L6.90212 3.32144C6.73208 2.9432 6.30785 2.74977 5.91079 2.86946L5.13997 3.1018Z" fill="#4E4E4E"/>
</svg>

)
const PhoneNumberBox = ({ 
    onChange = () => {}, 
    value = '', 
    name = "",                 // <-- important
    type = "text", 
    disabled = false, 
    readOnly = false 
}) => {

    const handlePhoneChange = (e) => {
        const rawValue = e.target.value;
        console.log("Raw input:", rawValue);

        const digitsOnly = rawValue.replace(/[^0-9]/g, '');
        console.log("Digits only:", digitsOnly);

        let finalValue = digitsOnly;

        if (digitsOnly.length === 1 && digitsOnly < '6') {
            finalValue = "";
        }

        finalValue = finalValue.substring(0, 10);

        console.log("Final sanitized value:", finalValue);

        const syntheticEvent = {
            target: {
                name,          // <-- dynamic field name
                value: finalValue,
            },
        };

        console.log("Sending synthetic event:", syntheticEvent);

        onChange(syntheticEvent);
    };

    const hasValue = value?.length > 0;
    const isInvalidLength = hasValue && value.length !== 10;
    const isInvalidStart = hasValue && value[0] < '6';

    return (
        <div className={styles.phoneNumberBox_wrapper}>
            <label htmlFor={name} className={styles.label_container}>
                Mobile Number
            </label>

            <input
                type={type}
                id={name}
                name={name}           // <-- correct
                placeholder="Enter Mobile Number"
                value={value}
                onChange={handlePhoneChange}
                className={styles.phoneNumberBox}
                disabled={disabled}
                readOnly={readOnly}
                inputMode="numeric"
                maxLength={10}
            />

            <span className={styles.phonenumberIcon}>{phonenumberIcon}</span>

            {(isInvalidLength || isInvalidStart) && (
                <p className={styles.validation_error}>
                    {isInvalidStart
                        ? "Phone number must start with 6, 7, 8, or 9."
                        : "Phone number must be exactly 10 digits."}
                </p>
            )}
        </div>
    );
};

export default PhoneNumberBox;
