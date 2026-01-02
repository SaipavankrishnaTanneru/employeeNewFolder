import React from "react";
import styles from "./EmployeeImage.module.css";
import phoneIcon from 'assets/EmployeeProfileCrad/phoneIcon.svg';
import dotsIcon from 'assets/EmployeeProfileCrad/dotsicon.svg';
import emp_image from 'assets/EmployeeProfileCrad/emp_image.jpg';
import callIconOutLine from "assets/RightSideInformation Icons/callIconOutLine.svg";
import mailIconOutline from "assets/RightSideInformation Icons/MailIconOutLine.svg";
import gendericon from 'assets/EmployeeProfileCrad/Gendericon.svg';
import {
 
  Tooltip
} from "@mui/material";
const EmployeeImage = () => {
  const phoneNumber = "9978655322";
  const email = "suresh@gmail.com";
  return (
    <div className={styles.employeeprofileContainer}>
 
      <figure className={styles.employeeProfile}>
        <img className={styles.emp_img}
          src={emp_image}
        />
      </figure>
 
      <div className={styles.infoSection}>
        <p className={styles.empId}>Employee ID:<br /><span>HYD 253487918</span></p>
        <h3 className={styles.name}>Suresh Raina</h3>
 
        <div className={styles.details}>
          <span className={styles.detail}>
            <img src={gendericon} alt="Gender icon" className={styles.icon} /> Male
          </span>
          <span className={styles.detail}>• 32 Yrs</span>
          <span className={styles.detail}>• Single</span>
        </div>
 
        <div className={styles.actions}>
          <button className={styles.designation}>Software Engineer</button>
            {/* <img src={phoneIcon}  />
            <img src={dotsIcon} /> */}
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
                          backgroundColor: "#fff",
                          color: "#3425FF",
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
                    }}
                  >
                    <figure style={{ cursor: phoneNumber ? "pointer" : "default" }}>
                      <img
                        src={phoneIcon}
                        alt="Call"
                      // onClick={() => phoneNumber && window.open(`tel:${phoneNumber}`)}
                      />
                    </figure>
                  </Tooltip>
 
                  <Tooltip
                     title={
                      phoneNumber ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <img
                            src={mailIconOutline}
                            alt="Phone"
                            style={{ width: "14px", height: "14px"}}
                          />
                          <span>{email}</span>
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
                          backgroundColor: "#fff",
                          color: "#3425FF",
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
                    }}
                  >
                    <figure style={{ cursor: phoneNumber ? "pointer" : "default" }}>
                      <img
                        src={dotsIcon}
                        alt="mail"
                      // onClick={() => phoneNumber && window.open(`tel:${phoneNumber}`)}
                      />
                    </figure>
                  </Tooltip>
        </div>
      </div>
    </div>
  );
};
 
export default EmployeeImage;
 
 