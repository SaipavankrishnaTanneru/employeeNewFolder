import React from "react";
import styles from "./AddFieldWidget.module.css";
// Ensure this path is correct
import removeIcon from "../../assets/icons/legendcrossicon.svg"; 

const AddFieldWidget = ({
  index,
  title,
  enableFieldset = true,
  showSimpleTitle = true,
  forceFieldset = false,
  onClear,
  onRemove,
  children,
}) => {
  const isFirst = index === 0;

  /* ---------------- SIMPLE BLOCK */
  if (isFirst && !forceFieldset) {
    return (
      <div className={styles.simpleBlock}>
        {showSimpleTitle && (
          <>
            <h3 className={styles.simpleTitle}>{title}</h3>
            <div className={styles.simpleLine}></div>
          </>
        )}
        <div className={styles.simpleContent}>{children}</div>
      </div>
    );
  }

  /* ---------------- FIELDSET BLOCK (Div Simulation) */
  return (
    // Changed <fieldset> to <div>
    <div className={styles.fieldsetBox}>
      
      {/* Changed <legend> to <div> */}
      <div className={styles.legendWrapper}>
        <div className={styles.legendRow}>
          
          {/* Left Title */}
          <div className={`${styles.legendTag} ${styles.activeTag}`}>
            {title}
          </div>

          {/* Right Actions */}
          <div className={styles.actions}>
            <div
              className={styles.legendTag}
              onClick={() => onClear(index)}
            >
              Clear
            </div>

            <img
              src={removeIcon}
              className={styles.legendCross}
              onClick={() => onRemove(index)}
              alt="remove"
            />
          </div>
        </div>
      </div>

      <div className={styles.fieldsetContent}>{children}</div>
    </div>
  );
};

export default AddFieldWidget;