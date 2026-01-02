import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip
} from "@mui/material";
import { ReactComponent as ExpandIcon } from "assets/Family/expandIcon.svg";
import styles from "./ReferenceDetails.module.css";
import accordionheadericon from "assets/Family/accordionheadericon.svg";
import rightDividerIcon from "assets/Family/dividerRightImg.svg";
import leftDividerIcon from "assets/Family/dividerLeftImg.svg";
import profileIcon from "assets/Family/profile.svg";
import { Tooltip } from "@mui/material";
import EmployeeDetailsCard from "widgets/EmployeeDetailsCard/EmployeeDetailsCard";


const ReferenceDetails = ({ expanded, onChange }) => {
  return (
    
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
          backdropFilter: "blur(9.100000381469727px)",
          boxShadow:
          "0 8px 16px 0 rgba(0, 0, 0, 0.14), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
        },
        "&::before": { display: "none" },
        "& .MuiButtonBase-root": { // This is the AccordionSummary
          alignItems: "start", // <-- Key change: 'start' to 'center'
          padding: "15px 18px", // <-- Key change: unified padding
          minHeight: "unset !important" , // <-- Key change: removed minHeight: 80px
        },
        "& .MuiAccordionSummary-root": {
          minHeight: "unset !important", // ✅ remove default height (expanded/non-expanded)
        },
        "&.Mui-expanded": {
          borderRadius: "10px",
          border: "1px solid #B4BCFF",
          background: "rgba(255, 255, 255, 0.30)",
          boxShadow:
            "0 8px 16px 0 rgba(0, 0, 0, 0.14), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
          backdropFilter: "blur(9.100000381469727px)",
          margin: "0px",
        },
        // Removed duplicate/conflicting MuiButtonBase-root and MuiAccordionSummary-root rules
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandIcon />}
        aria-controls="driver-content"
        id="driver-content"
        sx={{
          "&.Mui-expanded": {
            minHeight: "unset !important", // ✅ override expanded height
          },
          "& .MuiAccordionSummary-content": { 
            margin: "0px !important",
            alignItems: "center", // Ensure content is centered
          },
          "&.Mui-expanded .MuiAccordionSummary-content": {
            margin: "0px !important",
          },
        }}
      >
        <Typography component="span" sx={{ width: '100%' }}>
          <figure className={styles.header_figure}>
            {/* Left section: icon + text */}
            <div className={styles.header_left}>
              <img src={accordionheadericon} alt="Reference Icon" />
              <p className={styles.header_text}>Reference Details</p>
            </div>

            {/* Right section: chips */}
            <div className={styles.header_right}>
              {!expanded && (
                <Chip
                  label="+1 referred"
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
              {!expanded && (
                <Chip
                  label="+1 reference Give"
                  size="small"
                  sx={{
                    marginLeft: 1,
                    backgroundColor: "#FFF5E6",
                    color: "#FF9225",
                    border: "1px solid #FF9225",
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
          name="Vamsi"
          emp_id="EMP ID:HYD 09817298"
          leftDividerIcon={leftDividerIcon}
          rightDividerIcon={rightDividerIcon}
          profileIcon={profileIcon}
          titleLable={"Referred By"}
          role="Testing Engineer"
          phoneNumber="+91 9876543210"
          email="vignesh@example.com"
          dividerColor="#3425ff"
        />
      </div>

      <div className={styles.driver_cards}>
        <EmployeeDetailsCard
          name="Vamsi"
          emp_id="EMP ID:HYD 09817298"
          leftDividerIcon={leftDividerIcon}
          rightDividerIcon={rightDividerIcon}
          profileIcon={profileIcon}
          titleLable={"Referred By"}
          role="Testing Engineer"
          phoneNumber="+91 9876543210"
          email="vignesh@example.com"
          dividerColor="#3425ff"
        />
      </div>
    </div>
  </Typography>
</AccordionDetails>

    </Accordion>
  );
};

export default ReferenceDetails;