import React, { useState } from "react";
import styles from "./RejectModalWidget.module.css";
import Button from "../Button/Button";
import rightarrow from "assets/EmployeeOnBoarding/rightarrow"
const RejectModalWidget = ({
  open,
  onClose,
  title = "Confirm",
  subtitle,
  label = "Remarks",
  placeholder,
  cancelLabel = "Cancel",
  submitLabel = "Submit",
  closeIcon,
  onSubmit,
}) => {
  const [reason, setReason] = useState("");
 
  if (!open) return null;
 
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
 
          {/* Close (X) Icon */}
          <div className={styles.closeWrapper} onClick={onClose}>
            {closeIcon ? (
              <img src={closeIcon} alt="close" className={styles.closeIcon} />
            ) : (
              <span className={styles.closeText}>×</span>
            )}
          </div>
        </div>
 
        {/* Body */}
        <div className={styles.body}>
          <label className={styles.label}>{label}</label>
          <textarea
            className={styles.textarea}
            placeholder={placeholder}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
 
        {/* Footer */}
        <div className={styles.footer}>
          <Button
            buttonname={cancelLabel}
            onClick={onClose}
            type="button"
            variant="secondary"
            width="110px"
          />
          <Button
            buttonname={submitLabel}
            onClick={() => {
              if (onSubmit) onSubmit(reason);
              onClose();
            }}
            type="button"
            righticon={rightarrow}
            variant="primary"
            width="170px"
          />
        </div>
      </div>
    </div>
  );
};
 
export default RejectModalWidget;