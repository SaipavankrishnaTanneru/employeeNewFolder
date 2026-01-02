import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { ReactComponent as ExpandIcon } from "assets/Family/expandIcon.svg";
import styles from "./FamilyDetails.module.css";
import accordionheadericon from "assets/Family/accordionheadericon.svg";
import EmployeeDetailsCard from "widgets/EmployeeDetailsCard/EmployeeDetailsCard";
import rightDividerIcon from "assets/Family/dividerRightImg.svg";
import leftDividerIcon from "assets/Family/dividerLeftImg.svg";
import profileIcon from "assets/Family/profile.svg";

const FamilyDetails = ({ expanded, onChange }) => {
  return (
    <div className={styles.family_container}>
      <Accordion
        expanded={expanded}
        onChange={onChange}
        sx={{
          "& .MuiAccordionDetails-root ": { padding: "0px 16px 16px" },
          "&&": {
            "--Paper-shadow": "none",
            boxShadow: "none",
            borderRadius: "10px",
            border: "1px solid #E6E4F0",
            background: "rgba(255, 255, 255, 0.40)",
            backdropFilter: "blur(9.1px)",
            boxShadow:
            "0 8px 16px 0 rgba(0, 0, 0, 0.14), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
          },
          "&::before": { display: "none" },
          "& .MuiButtonBase-root": {
            alignItems: "start",
            padding: "15px 18px",
            minHeight: "unset",
          },
          "&.Mui-expanded": {
            borderRadius: "10px",
            border: "1px solid #B4BCFF",
            background: "rgba(255, 255, 255, 0.30)",
            boxShadow:
              "0 8px 16px 0 rgba(0, 0, 0, 0.14), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
            backdropFilter: "blur(9.1px)",
            margin: "0px",
          },
        
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandIcon />}
          aria-controls="driver-content"
          id="driver-content"
          sx={{
            "& .MuiAccordionSummary-content": { margin: "0px !important" },
            "&.Mui-expanded .MuiAccordionSummary-content": {
              margin: "0px !important",
            },
          }}
        >
         <Typography component="span" sx={{ width: '100%' }}>
            <figure className={styles.header_figure}>
              <div className={styles.header_left}>
                <img src={accordionheadericon} alt="accordion icon" />
                <p className={styles.header_text}>
                  Family Members
                </p>  
              </div>
              <div className={styles.header_right}>
              {!expanded && (
                <Chip
                  label="+2 member"
                  size="small"
                  sx={{
                    marginLeft: 1,
                    backgroundColor: "#E8E6FF",
                    color: "#3425FF",
                    border: "1px solid #3425FF",
                    fontSize: "0.75rem",
                    height: "28px", // <-- Key change: increased height
                    borderRadius: "16px", // <-- Key change: ensure pill shape
                    "& .MuiChip-label": {
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    },
                  }}
                />
              )}
              </div>
            </figure>
          </Typography>
        </AccordionSummary>

        <AccordionDetails id="driver-content">
  <Typography component="div" className="divider_content">
    <div className={styles.driver_cards_wrapper}>
      <div className={styles.driver_cards}>
        <EmployeeDetailsCard
          name="Anil"
          emp_id="Farmer"
          leftDividerIcon={leftDividerIcon}
          rightDividerIcon={rightDividerIcon}
          profileIcon={profileIcon}
          titleLable={"Full Name"}
          role="Father"
          phoneNumber="+91 9876543210"
          email="vignesh@example.com"
          dividerColor="#3EA9E3"
        />
      </div>

      <div className={styles.driver_cards}>
        <EmployeeDetailsCard
          name="Sumegha"
          emp_id="Food Blogger"
          leftDividerIcon={leftDividerIcon}
          rightDividerIcon={rightDividerIcon}
          profileIcon={profileIcon}
          titleLable={"Full Name"}
          role="Mother"
          phoneNumber="+91 9876543210"
          email="vignesh@example.com"
          dividerColor="#3EA9E3"
        />
      </div>
    </div>
  </Typography>
</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FamilyDetails;