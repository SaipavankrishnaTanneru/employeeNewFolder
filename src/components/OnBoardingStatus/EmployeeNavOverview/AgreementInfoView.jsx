import React, { useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import BankInfoWidget from "widgets/InfoCard/BankInfoWidget";
import EditPopup from "widgets/Popup/EditPopup";
import AgreementInfoUpdate from "../CoDoUpdatePopup/AgreementInfoUpdate";
import styles from "./AgreementInfoView.module.css";
import { useAgreementChequeDetails } from "../../../api/do/getpapis/useAgreementQueries";

const AgreementInfoView = () => {
  const [showEdit, setShowEdit] = useState(false);
  const saveRef = useRef(null);
  
  const params = useParams();
  const activeId = params.tempId || params.id || params.employeeId;

  const { data, isLoading, refetch } = useAgreementChequeDetails(activeId);

  // --- 🛠 MAPPING LOGIC UPDATED FOR YOUR JSON ---
  const { agreementInfo, cheques, chequeCountInfo } = useMemo(() => {
    if (!data) return { agreementInfo: [], cheques: [], chequeCountInfo: [] };

    const info = [
      { label: "Agreement Company", value: data.agreementCompany || "N/A" },
      { label: "Agreement Type", value: data.agreementType || "N/A" },
    ];

    // 1. Read from 'cheques' array
    const rawCheques = data.cheques || []; 

    // 2. Map specific keys: chequeNo, chequeBank, ifscCode
    const chequeList = rawCheques.map(c => ({
      chequeNo: c.chequeNo || "N/A",
      bank: c.chequeBank || "N/A",  // 👈 Matched your JSON
      ifsc: c.ifscCode || "N/A",    // 👈 Matched your JSON
    }));

    const countInfo = [
      { label: "No of Cheques Submitted", value: (data.noOfCheques || chequeList.length).toString() },
    ];

    return { agreementInfo: info, cheques: chequeList, chequeCountInfo: countInfo };
  }, [data]);

  if (isLoading) return <div>Loading Agreement Info...</div>;

  return (
    <div className={styles.accordian_container}>
      <div className={styles.accordians}>
        <BankInfoWidget
          title="Agreement Info"
          data={agreementInfo}
          onEdit={() => setShowEdit(true)}
        />
        {cheques.length > 0 && (
          <BankInfoWidget title="Cheque Info" data={chequeCountInfo} />
        )}
      </div>

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

      <EditPopup
        isOpen={showEdit}
        title="Edit Agreement Information"
        onClose={() => setShowEdit(false)}
        onSave={() => { if (saveRef.current) saveRef.current(); }}
      >
        <AgreementInfoUpdate 
            activeId={activeId} 
            onSaveRef={saveRef} 
            onSuccess={() => { setShowEdit(false); refetch(); }}
        />
      </EditPopup>
    </div>
  );
};

const getSuffix = (num) => {
  if (num % 10 === 1 && num !== 11) return "st";
  if (num % 10 === 2 && num !== 12) return "nd";
  if (num % 10 === 3 && num !== 13) return "rd";
  return "th";
};

export default AgreementInfoView;