import React, { useState, useEffect } from "react";
import styles from "./StatusFilterPopup.module.css";
import Button from "widgets/Button/Button";
import rightarrow from "assets/EmployeeOnBoarding/rightarrow";
import checkboxStyles from "widgets/Checkbox/Checkbox.module.css";
 
const StatusFilterPopup = ({
  open,
  filterOptions = [],
  selectedStatus = "",
  onStatusChange,
  onClose,
  onApply,
}) => {
  const [tempSelectedStatus, setTempSelectedStatus] = useState(selectedStatus);
 
  // Sync tempSelectedStatus when popup opens or selectedStatus changes
  useEffect(() => {
    if (open) {
      setTempSelectedStatus(selectedStatus);
    }
  }, [open, selectedStatus]);
 
  if (!open) return null;
 
  const handleApply = (e) => {
    e?.stopPropagation();
    if (onStatusChange) {
      onStatusChange(tempSelectedStatus);
    }
    if (onApply) {
      onApply(tempSelectedStatus);
    }
    onClose();
  };
 
  const handleClose = () => {
    onClose();
    setTempSelectedStatus(selectedStatus); // Reset to original selection
  };
 
  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Employee Status Filter</h2>
          <span className={styles.closeText} onClick={handleClose}>×</span>
        </div>
 
        {/* Body */}
        <div className={styles.body}>
          <div className={styles.optionsContainer}>
            {/* Left Column */}
            <div className={styles.leftColumn}>
              {filterOptions.slice(0, Math.ceil(filterOptions.length / 2)).map((status) => (
                <div key={status} className={checkboxStyles.checkbox_wrapper}>
                  <input
                    type="checkbox"
                    id={`status-${status}`}
                    name={status}
                    checked={tempSelectedStatus === status}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTempSelectedStatus(status);
                      } else {
                        setTempSelectedStatus("");
                      }
                    }}
                  />
                  <label htmlFor={`status-${status}`} className={checkboxStyles.checkbox_label}>
                    {status}
                  </label>
                </div>
              ))}
            </div>
 
            {/* Right Column */}
            <div className={styles.rightColumn}>
              {filterOptions.slice(Math.ceil(filterOptions.length / 2)).map((status) => (
                <div key={status} className={checkboxStyles.checkbox_wrapper}>
                  <input
                    type="checkbox"
                    id={`status-${status}`}
                    name={status}
                    checked={tempSelectedStatus === status}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTempSelectedStatus(status);
                      } else {
                        setTempSelectedStatus("");
                      }
                    }}
                  />
                  <label htmlFor={`status-${status}`} className={checkboxStyles.checkbox_label}>
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* Footer */}
        <div className={styles.footer} onClick={(e) => e.stopPropagation()}>
          <Button
            buttonname="Apply"
            onClick={handleApply}
            type="button"
            righticon={rightarrow}
            variant="primary"
            width="123px"
            disabled={!tempSelectedStatus}
          />
        </div>
      </div>
    </div>
  );
};
 
export default StatusFilterPopup;
 
 
 
 