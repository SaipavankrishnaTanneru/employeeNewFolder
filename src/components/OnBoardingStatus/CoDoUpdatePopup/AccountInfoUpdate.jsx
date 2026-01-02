import React, { useState } from "react";
import styles from "./AccountInfoUpdate.module.css";
import InputBox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";

const AccountInfoUpdate = () => {
  const [formData, setFormData] = useState({
    // Personal Bank Info
    paymentType: "Bank Transfer",
    personalBankName: "ICICI Bank",
    personalBankBranch: "Jubilee Hills",
    personalAccountNumber: "9087382647368346",
    personalIfscCode: "ICICI000003826",
    accountHolderName: "Full Name",

    // Salary Account Info
    salaryLessThan40k: "Yes",
    salaryBankName: "Axis Bank",
    salaryBankBranch: "Jubilee Hills",
    salaryAccountNumber: "9087382647368346",
    salaryIfscCode: "UTIB000009372",
    payableAt: "Date",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className={styles.container}>
      {/* ================= Personal Bank Info ================= */}
      <h4 className={styles.section_title}>Personal Bank Info</h4>

      <div className={styles.form_grid}>
        <Dropdown
          dropdownname="Payment Type"
          value={formData.paymentType}
          results={["Bank Transfer", "Cheque"]}
          onChange={(e) =>
            handleChange("paymentType", e.target.value)
          }
        />

        <InputBox
          label="Bank Name"
          value={formData.personalBankName}
          onChange={(e) =>
            handleChange("personalBankName", e.target.value)
          }
        />

        <InputBox
          label="Bank Branch"
          value={formData.personalBankBranch}
          onChange={(e) =>
            handleChange("personalBankBranch", e.target.value)
          }
        />

        <InputBox
          label="Personal Account Number"
          value={formData.personalAccountNumber}
          onChange={(e) =>
            handleChange("personalAccountNumber", e.target.value)
          }
        />

        <InputBox
          label="IFSC Code"
          value={formData.personalIfscCode}
          onChange={(e) =>
            handleChange("personalIfscCode", e.target.value)
          }
        />

        <InputBox
          label="Personal Account Holder Name"
          value={formData.accountHolderName}
          onChange={(e) =>
            handleChange("accountHolderName", e.target.value)
          }
        />
      </div>

      {/* ================= Salary Account Info ================= */}
      <h4 className={styles.section_title}>Salary Account Info</h4>

      <div className={styles.form_grid}>
        <Dropdown
          dropdownname="Is salary less than 40,000?"
          value={formData.salaryLessThan40k}
          results={["Yes", "No"]}
          onChange={(e) =>
            handleChange("salaryLessThan40k", e.target.value)
          }
        />

        <InputBox
          label="Bank Name"
          value={formData.salaryBankName}
          onChange={(e) =>
            handleChange("salaryBankName", e.target.value)
          }
        />

        <InputBox
          label="Bank Branch"
          value={formData.salaryBankBranch}
          onChange={(e) =>
            handleChange("salaryBankBranch", e.target.value)
          }
        />

        <InputBox
          label="Personal Account Number"
          value={formData.salaryAccountNumber}
          onChange={(e) =>
            handleChange("salaryAccountNumber", e.target.value)
          }
        />

        <InputBox
          label="IFSC Code"
          value={formData.salaryIfscCode}
          onChange={(e) =>
            handleChange("salaryIfscCode", e.target.value)
          }
        />

        <Dropdown
          dropdownname="Payable At"
          value={formData.payableAt}
          results={["Date", "Month End"]}
          onChange={(e) =>
            handleChange("payableAt", e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default AccountInfoUpdate;
