import React, { useState, useMemo } from "react";
import BankInfoWidget from "widgets/InfoCard/BankInfoWidget";
import EditPopup from "widgets/Popup/EditPopup";
import AgreementInfoUpdate from "../CoDoUpdatePopup/AgreementInfoUpdate";
import styles from "./AgreementInfoView.module.css";

// 1. Import the API Hook
import { useAgreementChequeDetails } from "../../../api/do/getpapis/useAgreementQueries"; 

// Pass tempId as a prop (e.g., "TEMP5540050")
const AgreementInfoView = ({ tempId }) => {
  const [showEdit, setShowEdit] = useState(false);

  // 2. Fetch Data
  const { data, isLoading } = useAgreementChequeDetails(tempId);

  /* ================= DATA MAPPING ================= */

  // Memoize data to prevent unnecessary re-renders
  const { agreementInfo, cheques, chequeCountInfo } = useMemo(() => {
    if (!data) return { agreementInfo: [], cheques: [], chequeCountInfo: [] };

    // Map Agreement Details
    const info = [
      { label: "Agreement Company", value: data.agreementCompany || "N/A" },
      { label: "Agreement Type", value: data.agreementType || "N/A" },
    ];

    // Map Cheques Array (Handles multiple cheques automatically)
    // Assuming API returns a 'cheques' array inside the response
    const chequeList = Array.isArray(data.chequeList) ? data.chequeList.map(c => ({
      chequeNo: c.chequeNumber || c.chequeNo || "N/A",
      bank: c.bankName || c.bank || "N/A",
      ifsc: c.ifscCode || c.ifsc || "N/A",
    })) : [];

    // Cheque Count Info
    const countInfo = [
      { label: "No of Cheques Submitted", value: chequeList.length.toString() },
    ];

    return { agreementInfo: info, cheques: chequeList, chequeCountInfo: countInfo };
  }, [data]);

  /* ================= VIEW ================= */

  if (isLoading) return <div>Loading Agreement Info...</div>;

  return (
    <div className={styles.accordian_container}>
      <div className={styles.accordians}>
        {/* Agreement Info Section */}
        <BankInfoWidget
          title="Agreement Info"
          data={agreementInfo}
          onEdit={() => setShowEdit(true)}
        />

        {/* Cheque Count Section (Only if cheques exist) */}
        {cheques.length > 0 && (
          <BankInfoWidget title="Cheque Info" data={chequeCountInfo} />
        )}
      </div>

      {/* DYNAMIC CHEQUE RENDERING 
          This .map() will automatically render a widget for EVERY cheque in the array 
      */}
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
        <AgreementInfoUpdate data={data} /> {/* Pass existing data to update form */}
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