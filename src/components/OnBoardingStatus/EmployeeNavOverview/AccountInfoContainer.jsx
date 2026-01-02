import React from "react";
import styles from "./AccountInfoContainer.module.css"
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
 
const AccountInfoContainer = () => {
  const personalBankInfo = [
    { label: "Payment type", value: "Bank Transfer" },
    { label: "Bank Name", value: "ICICI Bank" },
    { label: "Bank Branch", value: "Jubilee Hills" },
    { label: "Personal Account Number", value: "9087382647368346" },
    { label: "IFSC Code", value: "ICICI000003826" },
    { label: "Personal Account Holder Name", value: "Full Name" },
  ];
 
  const salaryAccountInfo = [
    { label: "Is salary less than 40,000?", value: "Yes" },
    { label: "Bank Name", value: "Axis Bank" },
    { label: "Bank Branch", value: "Jubilee Hills" },
    { label: "Personal Account Number", value: "9087382647368346" },
    { label: "IFSC Code", value: "UTIB000009372" },
    { label: "Payable At", value: "Date" },
  ];
 
  return (
    <div className={styles.accordian_container}>
      <div className={styles.accordians}>
        <BankInfoWidget title="Personal Bank Info" data={personalBankInfo} />
        <BankInfoWidget title="Salary Account Info" data={salaryAccountInfo} />
      </div>
    </div>
  );
};
 
export default AccountInfoContainer;