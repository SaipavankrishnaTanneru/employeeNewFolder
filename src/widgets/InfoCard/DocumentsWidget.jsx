import React from "react";
import { Chip, Box } from "@mui/material";
import viewchip from "../../assets/EmployeeOnBoarding/viewchip.svg";
import docverifyicon from "../../assets/EmployeeOnBoarding/docverifyicon.svg";
import styles from "./DocumentsWidget.module.css";
import dividerline from "../../assets/EmployeeOnBoarding/dividerline.svg";
 
const DocumentsWidget = ({ title, documents }) => {
  return (
    <div className={styles.widgetContainer}>
        <div className={styles.headerRow}>
        <h4 className={styles.title}>{title}</h4>
        <img src={dividerline} alt="divider" className={styles.dividerImage} />
      </div>
      <div className={styles.docsRow}>
        {documents.map((doc, index) => (
          <div key={index} className={styles.docItem}>
            <p className={styles.docLabel}>{doc.label}</p>
 
            <Box className={styles.actionRow}>
              <img
                src={viewchip}
                alt="View"
                className={styles.viewImage}
                onClick={() => doc.onView(doc)}
              />
 
              {doc.verified && (
                <img
                  src={docverifyicon}
                  alt="Verified"
                  className={styles.verifiedImage}
                />
              )}
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default DocumentsWidget;
 