import React, { useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import styles from "./AccountInfoContainer.module.css";
import BankInfoWidget from "widgets/InfoCard/BankInfoWidget";
import EditPopup from "widgets/Popup/EditPopup";
import AccountInfoUpdate from "../CoDoUpdatePopup/AccountInfoUpdate";
import { useBankInfo } from "../../../api/do/getpapis/useBankQueries";

const AccountInfoContainer = () => {
  const [showEdit, setShowEdit] = useState(false);
  const saveRef = useRef(null);

  const params = useParams();
  const activeId = params.tempId || params.id || params.employeeId;

  // 1. Fetch Data for View
  const { data, isLoading, refetch } = useBankInfo(activeId);

  // 2. Map Data for Display
  const { personalBankInfo, salaryAccountInfo } = useMemo(() => {
    if (!data) return { personalBankInfo: [], salaryAccountInfo: [] };

    // Safely access nested objects (handle empty API response)
    const pInfo = data.personalBankInfo || {};
    const sInfo = data.salaryAccountInfo || {};

    const personal = [
      { label: "Payment Type", value: sInfo.paymentType || "Bank Transfer" }, // Often shared
      { label: "Bank Name", value: pInfo.personalBankName || pInfo.bankName || "-" },
      { label: "Bank Branch", value: pInfo.personalBankBranch || pInfo.bankBranch || "-" },
      { label: "Account Number", value: pInfo.personalAccountNumber || pInfo.accountNumber || "-" },
      { label: "IFSC Code", value: pInfo.personalIfscCode || pInfo.ifscCode || "-" },
      { label: "Holder Name", value: pInfo.personalAccountHolderName || pInfo.accountHolderName || "-" },
    ];

    const salary = [
      { label: "Salary < 40k?", value: data.salaryLessThan40000 ? "Yes" : "No" },
      { label: "Bank Name", value: sInfo.bankName || "-" },
      { label: "Bank Branch", value: sInfo.bankBranch || "-" },
      { label: "Account Number", value: sInfo.personalAccountNumber || sInfo.salaryAccountNumber || "-" }, // API naming inconsistency check
      { label: "IFSC Code", value: sInfo.ifscCode || "-" },
      { label: "Payable At", value: sInfo.payableAt || "-" },
    ];

    return { personalBankInfo: personal, salaryAccountInfo: salary };
  }, [data]);

  if (isLoading) return <div>Loading Account Info...</div>;

  return (
    <div className={styles.accordian_container}>
      <div className={styles.accordians}>
        {/* PERSONAL BANK INFO */}
        <BankInfoWidget
          title="Personal Bank Info"
          data={personalBankInfo}
          onEdit={() => setShowEdit(true)}
        />

        {/* SALARY ACCOUNT INFO */}
        <BankInfoWidget
          title="Salary Account Info"
          data={salaryAccountInfo}
        />
      </div>

      {/* EDIT POPUP */}
      <EditPopup
        isOpen={showEdit}
        title="Edit Account Information"
        onClose={() => setShowEdit(false)}
        // 3. Trigger Save via Ref
        onSave={() => { if (saveRef.current) saveRef.current(); }}
      >
        <AccountInfoUpdate 
            activeId={activeId} 
            onSaveRef={saveRef} 
            onSuccess={() => {
                setShowEdit(false);
                refetch();
            }}
        />
      </EditPopup>
    </div>
  );
};

export default AccountInfoContainer;