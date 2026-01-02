import React from "react";
import { Tooltip } from "@mui/material";
import styles from "../EmployeeDetailsCard/EmployeeDetailsCard.module.css";
import callIcon from "../../assets/RightSideInformation Icons/phoneicon.svg";
import mailIcon from "../../assets/RightSideInformation Icons/smsicon.svg";
import callIconOutLine from "../../assets/RightSideInformation Icons/callIconOutLine.svg";
import mailIconOutline from "../../assets/RightSideInformation Icons/MailIconOutLine.svg"; 
const EmployeeDetailsCard = ({
  name,
  emp_id,
  leftDividerIcon,
  rightDividerIcon,
  profileIcon,
  titleLable,
  dividerColor="#3425ff",
  role = " ", // default value if not provided
  phoneNumber, // new prop
  email,       // new prop
}) => {
  return (
    <div className={styles.card_wrapper}>
      <div className={styles.driver_box}>
        {/* Left Section: Profile & Info */}
        <div className={styles.left_section}>
          <figure className={styles.profile_icon}>
            <img src={profileIcon} alt="Profile" />
          </figure>
          <div className={styles.emp_details}>
            <p className={styles.emp_label}>{titleLable}</p>
            <p className={styles.emp_name}>{name}</p>
            <p className={styles.emp_id}>{emp_id}</p>
          </div>
        </div>
 
        {/* Right Section: Call & Mail */}
        <div className={styles.right_section}>
        <Tooltip
     title={
    phoneNumber ? (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <img
           src={callIconOutLine}
          alt="Phone"
          style={{ width: "14px", height: "14px"}}
        />
        <span>{phoneNumber}</span>
      </div>
    ) : (
      "No number available"
    )
  }
  arrow
  placement="top"
  componentsProps={{
    tooltip: {
      sx: {
        backgroundColor: "#FFF",   // custom tooltip background
        color: "#3425FF",          // tooltip text color
        fontSize: "0.75rem",
        fontWeight: 500,
        padding: "6px 10px",
        borderRadius: "6px",
        border: "1px solid #3425FF", // ✅ add this line
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
      },
    },
    arrow: {
      sx: {
        color: "#FFF", // arrow color same as tooltip background
        "&::before": {
          border: "1px solid #3425FF", // ✅ optional: add border around arrow
        },
      },
    },
  }}
>
  <figure style={{ cursor: phoneNumber ? "pointer" : "default" }}>
    <img src={callIcon} alt="Call" />
  </figure>
</Tooltip>
 
          <Tooltip title={
    email ? (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <img
           src={mailIconOutline}
          alt="email"
          style={{ width: "14px", height: "14px",  }}
        />
        <span>{email}</span>
      </div>
    ) : (
      "No email available"
    )
  }arrow placement="top"
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: "#FFF",   // custom tooltip background
                color: "#3425FF",                // tooltip text color
                fontSize: "0.75rem",
                fontWeight: 500,
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid #3425FF",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
              },
            },
            arrow: {
              sx: {
                color: "#FFF", // arrow color same as tooltip background
                "&::before": {
                  border: "1px solid #3425FF", // ✅ optional: add border around arrow
                },
              },
            },
          }}>
            <figure style={{ cursor: email ? "pointer" : "default" }}>
              <img
                src={mailIcon}
                alt="Mail"
                // onClick={() => {
                //   if (email) window.open(`mailto:${email}`);
                // }}
              />
            </figure>
          </Tooltip>
        </div>
      </div>
 
      {/* Divider Section */}
      <div className={styles.blue_divider} style={{backgroundColor:dividerColor}}>
        <figure>
          <img src={leftDividerIcon} alt="Left Divider" />
        </figure>
        <p className={styles.divider_text}>{role}</p>
        <figure>
          <img src={rightDividerIcon} alt="Right Divider" />
        </figure>
      </div>
    </div>
  );
};
 
export default EmployeeDetailsCard;