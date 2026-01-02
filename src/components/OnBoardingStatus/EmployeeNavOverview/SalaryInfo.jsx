import React from "react";
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import styles from "./SalaryInfoReadOnly.module.css";


const SalaryInfoReadOnly = () => {
  const SalaryInfoRead = [
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

  const pfInfoRead= [
    { label: "Is salary less than 40,000?", value: "Yes" },
    { label: "Bank Name", value: "Axis Bank" },
    { label: "Bank Branch", value: "Jubilee Hills" },
    { label: "Personal Account Number", value: "9087382647368346" },
    { label: "IFSC Code", value: "UTIB000009372" },
    { label: "Payable At", value: "Date" },
  ];



  return (
    <div className={styles.salary_Info_Container}>
      <div className={styles.widgetWrapper}>
        <BankInfoWidget title="Salary Info" data={SalaryInfoRead} />
        <BankInfoWidget title="PF Info" data={pfInfoRead} />    
      </div>
    </div>
  );
};

export default SalaryInfoReadOnly;
