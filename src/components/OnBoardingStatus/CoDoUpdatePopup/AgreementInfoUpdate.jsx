import React, { useState } from "react";
import styles from "./AgreementInfoUpdate.module.css";
import Dropdown from "widgets/Dropdown/Dropdown";
import InputBox from "widgets/Inputbox/InputBox";

const agreementDataFromBackend = {
  agreementCompany: "Varsity Management",
  agreementType: "Document",
  cheques: [
    {
      chequeNo: "8272651416282623",
      bankName: "ICICI Bank",
      ifscCode: "SBIN0001282FD",
    },
    {
      chequeNo: "9988776655443322",
      bankName: "HDFC Bank",
      ifscCode: "HDFC0001234",
    },
  ],
};

const AgreementInfoUpdate = () => {
  const [agreement, setAgreement] = useState(agreementDataFromBackend);

  const handleAgreementChange = (field, value) => {
    setAgreement((prev) => ({ ...prev, [field]: value }));
  };

  const handleChequeChange = (index, field, value) => {
    setAgreement((prev) => ({
      ...prev,
      cheques: prev.cheques.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      ),
    }));
  };

  return (
    <div className={styles.container}>
      {/* Agreement Info */}
      <h4 className={styles.section_title}>Agreement Info</h4>

      <div className={styles.form_grid}>
        <Dropdown
          dropdownname="Agreement Company"
          value={agreement.agreementCompany}
          results={["Varsity Management", "Other Company"]}
          onChange={(e) =>
            handleAgreementChange("agreementCompany", e.target.value)
          }
        />

        <InputBox
          label="Agreement Type"
          value={agreement.agreementType}
          onChange={(e) =>
            handleAgreementChange("agreementType", e.target.value)
          }
        />
      </div>

      {/* Cheque Info (AUTO based on array) */}
      {agreement.cheques.length > 0 && (
        <>
          <h4 className={styles.section_title}>Cheque Info</h4>

          {agreement.cheques.map((cheque, index) => (
            <div key={index} className={styles.cheque_block}>
              <div className={styles.cheque_header}>
                Cheque {index + 1}
              </div>

              <div className={styles.form_grid}>
                <InputBox
                  label="Cheque No"
                  value={cheque.chequeNo}
                  onChange={(e) =>
                    handleChequeChange(index, "chequeNo", e.target.value)
                  }
                />

                <InputBox
                  label="Bank Name"
                  value={cheque.bankName}
                  onChange={(e) =>
                    handleChequeChange(index, "bankName", e.target.value)
                  }
                />

                <InputBox
                  label="IFSC Code"
                  value={cheque.ifscCode}
                  onChange={(e) =>
                    handleChequeChange(index, "ifscCode", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AgreementInfoUpdate;
