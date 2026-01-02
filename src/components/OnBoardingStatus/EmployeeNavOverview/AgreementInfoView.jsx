import React, { useState } from "react";
import BankInfoWidget from "widgets/InfoCard/BankInfoWidget";
import EditPopup from "widgets/Popup/EditPopup";
import AgreementInfoUpdate from "../CoDoUpdatePopup/AgreementInfoUpdate";
import styles from "./AgreementInfoView.module.css";

const AgreementInfoView = () => {
  const [showEdit, setShowEdit] = useState(false);

  /* ================= DATA ================= */

  const agreementInfo = [
    { label: "Agreement Company", value: "Varsity Management" },
    { label: "Agreement Type", value: "Document" },
  ];

  // 🔑 ONLY THIS decides cheque UI
  const cheques = [
    {
      chequeNo: "8272651416282623",
      bank: "ICICI Bank",
      ifsc: "SBIN0001282FD",
    },
    {
      chequeNo: "9988776655443322",
      bank: "HDFC Bank",
      ifsc: "HDFC0001234",
    },
  ];

  const chequeCountInfo = [
    { label: "No of Cheques Submitted", value: cheques.length.toString() },
  ];

  /* ================= VIEW ================= */

  return (
    <div className={styles.accordian_container}>
      <div className={styles.accordians}>
        {/* Agreement Info */}
        <BankInfoWidget
          title="Agreement Info"
          data={agreementInfo}
          onEdit={() => setShowEdit(true)}
        />

        {/* Cheque Count (ONLY if cheques exist) */}
        {cheques.length > 0 && (
          <BankInfoWidget title="Cheque Info" data={chequeCountInfo} />
        )}
      </div>

      {/* Individual Cheque Widgets */}
      {cheques.length > 0 && (
        <div className={styles.cheque_Info}>
          {cheques.map((cheque, index) => (
            <BankInfoWidget
              key={index}
              title={`${index + 1}${getSuffix(index + 1)} Cheque`}
              data={[
                { label: "Cheque No", value: cheque.chequeNo },
                { label: "Cheque Bank", value: cheque.bank },
                { label: "IFSC Code", value: cheque.ifsc },
              ]}
            />
          ))}
        </div>
      )}

      {/* ================= EDIT POPUP ================= */}
      <EditPopup
        isOpen={showEdit}
        title="Edit Agreement Information"
        onClose={() => setShowEdit(false)}
        onSave={() => {
          console.log("SAVE AGREEMENT INFO");
          setShowEdit(false);
        }}
      >
        <AgreementInfoUpdate />
      </EditPopup>
    </div>
  );
};

/* Helper for 1st / 2nd / 3rd / nth */
const getSuffix = (num) => {
  if (num % 10 === 1 && num !== 11) return "st";
  if (num % 10 === 2 && num !== 12) return "nd";
  if (num % 10 === 3 && num !== 13) return "rd";
  return "th";
};

export default AgreementInfoView;
