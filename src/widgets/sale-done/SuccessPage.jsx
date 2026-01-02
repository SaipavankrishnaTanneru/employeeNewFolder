import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SuccessPage.module.css";
import LottieWithDot from "../LottieWidgets/LottieWithDot/LottieWithDot";
import successApplication from "../../assets/LottieGifs/Varsity.lottie";
import Button from "../Button/Button";
import rightarrow from "assets/SkillTest/RightArrow.svg";

const SuccessPageForm = ({ 
  applicationNo, 
  title, 
  subTitle, 
  onBack, // 🟢 CRITICAL: Parent controls navigation
  statusType = "sale" 
}) => {
  const navigate = useNavigate();
  const isConfirmed = statusType === "confirmation";

  const handleBackNavigation = () => {
    // If parent provides a specific back function, use it
    if (onBack) {
      onBack();
    } else {
      // Default fallback
      navigate("/scopes/application/status");
    }
  };

  return (
    <div className={styles.Success_Page_root}>
      <div className={styles.Success_Page_paper}>
        
        <div className={styles.Success_Page_iconContainer}>
          <LottieWithDot src={successApplication} height={200} width={200}/>
        </div>

        <h5 className={styles.Success_Page_title}>
          {title || `Application No: ${applicationNo || "N/A"}`}
        </h5>

        <h6 className={styles.Success_Page_subtitle}>
          {subTitle || (isConfirmed ? "Application confirmed" : "Update Successful")}
        </h6>
        
        <p className={styles.Success_Page_description}>
          {isConfirmed ? "Details added successfully" : "Application Details Added Successfully"}
        </p>

        <div className={styles.successpagebackbutton}>
          <Button
            onClick={handleBackNavigation} // 🟢 Connected to handler
            variant={"primary"}
            buttonname={"Back To Dashboard"} // Generic Label
            righticon={rightarrow}
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessPageForm;