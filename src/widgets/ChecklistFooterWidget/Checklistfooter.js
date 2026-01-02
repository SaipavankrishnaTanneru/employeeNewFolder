import React from "react";
import styles from "./ChecklistFooter.module.css";
import Button from "../Button/Button";
 
const FooterWidget = ({
  backLabel,
  forwardLabel,
  rejectLabel,
  rejectIcon,
  backIcon,
  forwardIcon,
  backWidth = "110px",
  forwardWidth = "240px",
  onBack,
  onForward,
  onReject,
  showReject = true,
}) => {
  return (
    <div className={styles.footerContainer}>
      {/* Back Button (uses Button widget) */}
      <Button
        buttonname={backLabel}
        lefticon={backIcon}
        onClick={onBack}
        type="button"
        variant="secondary"
        width={backWidth}
      />
 
      {/* Forward Button (uses Button widget) */}
      <Button
        buttonname={forwardLabel}
        righticon={forwardIcon}
        onClick={onForward}
        type="button"
        variant="primary"
        width={forwardWidth}
      />
 
      {/* Reject Button */}
      {showReject && (
        <button
          className={`${styles.btn} ${styles.rejectBtn}`}
          onClick={onReject}
        >
          {rejectLabel}
          {rejectIcon && (
            <img
              src={rejectIcon}
              alt="reject"
              className={styles.iconRight}
            />
          )}
        </button>
      )}
    </div>
  );
};
 
export default FooterWidget;