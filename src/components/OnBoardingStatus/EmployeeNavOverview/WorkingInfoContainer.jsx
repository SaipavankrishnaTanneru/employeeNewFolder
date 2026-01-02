import React from "react";
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import styles from "./WorkingInfoContainer.module.css";

const WorkingInfoContainer = () => {
  const workingInfo = [
    { label: "Campus", value: "Jubilee Hills Res" },
    { label: "Campus Code", value: "HYD91737" },
    { label: "Campus Type", value: "Days Scholar" },
    { label: "Location", value: "Jubilee Hills, Hyderabad" },
    { label: "Building", value: "Tower B" },
    { label: "Manager", value: "Venkat Boppana" },
    { label: "Working Mode", value: "Full Time" },
    { label: "Joining As", value: "Teacher" },
    { label: "Replacement Employee", value: "Yaswanth" },
    { label: "Mode Of Hiring", value: "Consultant" },
    { label: "Hired By", value: "Venkat Boppana" },
    { label: "Joining Date", value: "29-03-2025" },
  ];

  return (
    <div className={styles.working_Info_Container}>
      <div className={styles.widgetWrapper}>
        <BankInfoWidget title="Working Information" data={workingInfo} />
      </div>
    </div>
  );
};

export default WorkingInfoContainer;
