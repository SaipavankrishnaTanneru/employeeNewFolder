import React, { useEffect } from "react";
import styles from "./AgreementInfoUpdate.module.css";
import Dropdown from "widgets/Dropdown/Dropdown";
import InputBox from "widgets/Inputbox/InputBox";
// 1. Import the Widget (Adjust path if needed, e.g., 'widgets/AddFieldWidget/AddFieldWidget')
import AddFieldWidget from "widgets/AddFieldWidget/AddFieldWidget"; 
import { useAgreementInfoFormik } from "hooks/useAgreementInfoFormik";
import { useActiveOrganizations } from "api/onBoardingForms/postApi/useAgreementQueries";

const AgreementInfoUpdate = ({ activeId, onSaveRef, onSuccess }) => {
  
  const { 
    values, 
    setFieldValue, 
    handleChange, 
    submitForm, 
    initialCheque 
  } = useAgreementInfoFormik({ 
    tempId: activeId, 
    onSuccess 
  });

  const { data: organizations = [] } = useActiveOrganizations();

  useEffect(() => {
    if (onSaveRef) onSaveRef.current = submitForm;
  }, [submitForm, onSaveRef]);

  // --- HELPERS ---

  const addCheque = () => setFieldValue("chequeDetails", [...values.chequeDetails, initialCheque]);
  
  const removeCheque = (index) => {
    const updated = values.chequeDetails.filter((_, i) => i !== index);
    setFieldValue("chequeDetails", updated);
  };

  // New Helper: Reset fields for a specific cheque
  const clearCheque = (index) => {
    const updated = values.chequeDetails.map((c, i) => 
        i === index ? { ...initialCheque } : c
    );
    setFieldValue("chequeDetails", updated);
  };

  const handleChequeChange = (index, field, value) => {
    const updated = values.chequeDetails.map((c, i) => 
        i === index ? { ...c, [field]: value } : c
    );
    setFieldValue("chequeDetails", updated);
  };

  const getOrgName = (id) => organizations.find(o => o.organizationId === id)?.organizationName || "";
  const getOrgId = (name) => organizations.find(o => o.organizationName === name)?.organizationId || "";

  return (
    <div className={styles.container}>
      
      {/* --- AGREEMENT INFO SECTION --- */}
      <div className={styles.static_section}>
        <div className={styles.section_header_row}>
            <h4 className={styles.section_title}>Agreement Info</h4>
        </div>

        <div className={styles.form_grid}>
            <Dropdown
                dropdownname="Agreement Company"
                value={getOrgName(values.agreementOrgId)}
                results={organizations.map(o => o.organizationName)}
                onChange={(e) => setFieldValue("agreementOrgId", getOrgId(e.target.value))}
            />
            <Dropdown 
                dropdownname="Agreement Type"
                value={values.agreementType}
                results={["Employment", "Contract", "Internship", "Consultant"]} 
                onChange={handleChange}
                name="agreementType"
            />
        </div>
        
        <div className={styles.checkbox_row}>
            <input 
                type="checkbox" 
                className={styles.checkbox_input}
                checked={values.isCheckSubmit} 
                onChange={(e) => setFieldValue("isCheckSubmit", e.target.checked)}
            />
            <label>Submit Cheques?</label>
        </div>
      </div>

      {/* --- DYNAMIC CHEQUE INFO SECTION --- */}
      {values.isCheckSubmit && (
        <>
          <div className={styles.section_header_row}>
            <h4 className={styles.section_title}>Cheque Info</h4>
            <button type="button" className={styles.add_btn} onClick={addCheque}>
                + Add
            </button>
          </div>

          <div className={styles.cheque_list}>
            {values.chequeDetails.map((cheque, index) => (
                // 2. Use AddFieldWidget here
                <AddFieldWidget
                    key={index}
                    index={index}
                    title={`Cheque ${index + 1}`}
                    enableFieldset={true}
                    forceFieldset={true} // Forces the box look
                    onRemove={() => removeCheque(index)}
                    onClear={() => clearCheque(index)}
                >
                    <div className={styles.form_grid}>
                        <InputBox 
                            label="Cheque No" 
                            value={cheque.chequeNo} 
                            onChange={(e) => handleChequeChange(index, "chequeNo", e.target.value)} 
                        />
                        <InputBox 
                            label="Bank Name" 
                            value={cheque.chequeBankName} 
                            onChange={(e) => handleChequeChange(index, "chequeBankName", e.target.value)} 
                        />
                        <InputBox 
                            label="IFSC Code" 
                            value={cheque.chequeBankIfscCode} 
                            onChange={(e) => handleChequeChange(index, "chequeBankIfscCode", e.target.value)} 
                        />
                    </div>
                </AddFieldWidget>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AgreementInfoUpdate;