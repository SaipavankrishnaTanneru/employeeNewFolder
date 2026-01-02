import React from "react";
import styles from "./SkillEmployeeImage.module.css";
import phoneIcon from "assets/EmployeeProfileCrad/phoneIcon.svg";
import dotsIcon from "assets/EmployeeProfileCrad/dotsicon.svg";
import emp_image from "assets/EmployeeProfileCrad/emp_image.jpg";
import gendericon from "assets/EmployeeProfileCrad/Gendericon.svg";
const EmployeeImage = () => {
  return (
    <div className={styles.employeeprofileContainer}>

      <figure className={styles.employeeProfile}>
        {/* <img className={styles.emp_img}
          src={emp_image}
        /> */}
        <div className={styles.emp_img}>
          <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.0833 2.97574e-10C30.6399 -1.66715e-05 34.1617 0.700501 37.4477 2.06156C40.7336 3.42261 43.7192 5.41755 46.2342 7.93247C48.7491 10.4474 50.744 13.433 52.1051 16.7189C53.4662 20.0048 54.1667 23.5267 54.1667 27.0833C54.1667 42.041 42.041 54.1667 27.0833 54.1667C12.1257 54.1667 0 42.041 0 27.0833C0 12.1257 12.1257 2.97574e-10 27.0833 2.97574e-10ZM29.7917 29.7917H24.375C17.67 29.7917 11.9135 33.8526 9.43071 39.6494C13.3592 45.158 19.8018 48.75 27.0833 48.75C34.3648 48.75 40.8074 45.158 44.736 39.649C42.2532 33.8526 36.4967 29.7917 29.7917 29.7917ZM27.0833 8.125C22.596 8.125 18.9583 11.7627 18.9583 16.25C18.9583 20.7373 22.596 24.375 27.0833 24.375C31.5706 24.375 35.2083 20.7373 35.2083 16.25C35.2083 11.7627 31.5707 8.125 27.0833 8.125Z" fill="#3425FF" />
          </svg>
        </div>
      </figure>

      <div className={styles.infoSection}>
        <p className={styles.empId}>Temp Employee ID:<br /><span>HYD 253487918</span></p>
        <h3 className={styles.name}>Suresh Raina</h3>

        <div className={styles.details}>
          <span className={styles.detail}>
            <img src={gendericon} alt="Gender icon" className={styles.icon} /> Male
          </span>
          <span className={styles.detail}>• 32 Yrs</span>
          <span className={styles.detail}>• Single</span>
        </div>

        <div className={styles.actions}>
          <button className={styles.designation}>Subject</button>
          <img src={phoneIcon} />
          <img src={dotsIcon} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeImage;
