import React, { useState, useEffect } from "react";
import Inputbox from "../../Inputbox/InputBox";
import Dropdown from "../../Dropdown/Dropdown";
import styles from "./ChequeForms.module.css";
import { useOrganizations, useBanksByOrganization, useBranchesByOrganizationAndBank } from "../../../hooks/payment-apis/PaymentApis";

const ChequeForms = ({ formData, onChange }) => {
  // Fetch organizations from API
  const { organizationOptions, getOrganizationIdByLabel, getOrganizationLabelById, loading: organizationsLoading } = useOrganizations();
  
  // State to track selected organization ID (for fetching banks)
  // Initialize from formData if it's already an ID (number or numeric string)
  const getInitialOrgId = () => {
    if (!formData?.cheque_org) return null;
    const orgValue = formData.cheque_org;
    // If it's already a number or numeric string, it's an ID
    if (typeof orgValue === 'number' || (typeof orgValue === 'string' && !isNaN(orgValue) && orgValue !== '')) {
      return orgValue;
    }
    return null;
  };
  
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(getInitialOrgId());
  
  // Update organization ID when formData changes (only if it's a numeric ID)
  useEffect(() => {
    const orgId = getInitialOrgId();
    if (orgId && orgId !== selectedOrganizationId) {
      setSelectedOrganizationId(orgId);
    } else if (!orgId && selectedOrganizationId) {
      // If formData is cleared, clear the state too
      setSelectedOrganizationId(null);
    }
  }, [formData?.cheque_org]);
  
  // Fetch banks based on selected organization ID
  const { bankOptions, getBankIdByLabel, getBankLabelById, loading: banksLoading } = useBanksByOrganization(selectedOrganizationId);
  
  // State to track selected bank ID (for fetching branches)
  const getInitialBankId = () => {
    if (!formData?.cheque_bank) return null;
    const bankValue = formData.cheque_bank;
    // If it's already a number or numeric string, it's an ID
    if (typeof bankValue === 'number' || (typeof bankValue === 'string' && !isNaN(bankValue) && bankValue !== '')) {
      return bankValue;
    }
    return null;
  };
  
  const [selectedBankId, setSelectedBankId] = useState(getInitialBankId());
  
  // Update bank ID when formData changes
  useEffect(() => {
    const bankId = getInitialBankId();
    if (bankId && bankId !== selectedBankId) {
      setSelectedBankId(bankId);
    } else if (!bankId && selectedBankId) {
      setSelectedBankId(null);
    }
  }, [formData?.cheque_bank]);
  
  // Fetch branches based on selected organization ID and bank ID
  const { branchOptions, getBranchIdByLabel, getBranchLabelById, loading: branchesLoading } = useBranchesByOrganizationAndBank(selectedOrganizationId, selectedBankId);
  
  const cityOptions = ["Hyderabad", "Bangalore", "Chennai"];

  // Handle organization change - convert label to ID before storing and fetch banks
  const handleOrganizationChange = (e) => {
    const selectedLabel = e.target.value;
    const organizationId = getOrganizationIdByLabel(selectedLabel);
    
    // Log for debugging
    console.log('📝 Cheque - Selected Organization Label:', selectedLabel);
    console.log('🆔 Cheque - Organization ID:', organizationId);
    
    // Set organization ID to trigger bank fetching
    setSelectedOrganizationId(organizationId);
    
    // Create a synthetic event with the ID value for backend
    const syntheticEvent = {
      target: {
        name: "cheque_org",
        value: organizationId !== undefined ? organizationId : selectedLabel // Fallback to label if ID not found
      }
    };
    
    onChange(syntheticEvent);
    
    // Clear bank and branch selections when organization changes
    const clearBankEvent = {
      target: {
        name: "cheque_bank",
        value: ""
      }
    };
    onChange(clearBankEvent);
    
    const clearBranchEvent = {
      target: {
        name: "cheque_branch",
        value: ""
      }
    };
    onChange(clearBranchEvent);
    setSelectedBankId(null);
  };

  // Handle bank change - convert label to ID before storing and fetch branches
  const handleBankChange = (e) => {
    const selectedLabel = e.target.value;
    const bankId = getBankIdByLabel(selectedLabel);
    
    // Log for debugging
    console.log('📝 Cheque - Selected Bank Label:', selectedLabel);
    console.log('🆔 Cheque - Bank ID:', bankId);
    
    // Set bank ID to trigger branch fetching
    setSelectedBankId(bankId);
    
    // Create a synthetic event with the ID value for backend
    const syntheticEvent = {
      target: {
        name: "cheque_bank",
        value: bankId !== undefined ? bankId : selectedLabel // Fallback to label if ID not found
      }
    };
    
    onChange(syntheticEvent);
    
    // Clear branch selection when bank changes
    const clearBranchEvent = {
      target: {
        name: "cheque_branch",
        value: ""
      }
    };
    onChange(clearBranchEvent);
  };

  // Handle branch change - convert label to ID before storing
  const handleBranchChange = (e) => {
    const selectedLabel = e.target.value;
    const branchId = getBranchIdByLabel(selectedLabel);
    
    // Log for debugging
    console.log('📝 Cheque - Selected Branch Label:', selectedLabel);
    console.log('🆔 Cheque - Branch ID:', branchId);
    
    // Create a synthetic event with the ID value for backend
    const syntheticEvent = {
      target: {
        name: "cheque_branch",
        value: branchId !== undefined ? branchId : selectedLabel // Fallback to label if ID not found
      }
    };
    
    onChange(syntheticEvent);
  };

  // Get display value for organization (convert ID to label if needed)
  const getOrganizationDisplayValue = (orgValue) => {
    if (!orgValue) return "";
    // If it's already a label (string that exists in options), return it
    if (organizationOptions.includes(orgValue)) {
      return orgValue;
    }
    // Otherwise, try to convert ID to label
    const label = getOrganizationLabelById(orgValue);
    return label || orgValue;
  };

  // Get display value for bank (convert ID to label if needed)
  const getBankDisplayValue = (bankValue) => {
    if (!bankValue) return "";
    // If it's already a label (string that exists in options), return it
    if (bankOptions.includes(bankValue)) {
      return bankValue;
    }
    // Otherwise, try to convert ID to label
    const label = getBankLabelById(bankValue);
    return label || bankValue;
  };

  // Get display value for branch (convert ID to label if needed)
  const getBranchDisplayValue = (branchValue) => {
    if (!branchValue) return "";
    // If it's already a label (string that exists in options), return it
    if (branchOptions.includes(branchValue)) {
      return branchValue;
    }
    // Otherwise, try to convert ID to label
    const label = getBranchLabelById(branchValue);
    return label || branchValue;
  };

  return (
    <div className={styles.wrapper}>

      {/* ROW 1 */}
      <div className={styles.grid}>
        <Inputbox
          label="Payment Date *"
          name="cheque_paymentDate"
          placeholder="MM/DD/YYYY"
          value={formData.cheque_paymentDate}
          onChange={onChange}
          type="date"
        />

        <Inputbox
          label="Amount *"
          name="cheque_amount"
          placeholder="Enter Amount (numbers only)"
          value={formData.cheque_amount}
          onChange={onChange}
          type="number"
        />
      </div>

      {/* ROW 2 */}
      <div className={styles.grid}>
        <Inputbox
          label="Pre Printed Receipt No *"
          name="cheque_receiptNo"
          placeholder="Enter Pre Printed Receipt No"
          value={formData.cheque_receiptNo}
          onChange={onChange}
        />

        <Inputbox
          label="Cheque Number *"
          name="cheque_number"
          placeholder="Enter Cheque Number"
          value={formData.cheque_number}
          onChange={onChange}
        />
      </div>

      {/* ROW 3 */}
      <div className={styles.grid}>
        <Inputbox
          label="Cheque Date *"
          name="cheque_date"
          placeholder="MM/DD/YYYY"
          value={formData.cheque_date}
          onChange={onChange}
          type="date"
        />

        <Dropdown
          dropdownname="Organisation Name *"
          name="cheque_org"
          results={organizationsLoading ? [] : organizationOptions}
          value={getOrganizationDisplayValue(formData.cheque_org)}
          onChange={handleOrganizationChange}
          disabled={organizationsLoading}
        />
      </div>

      {/* ROW 4 */}
      <div className={styles.grid}>
        <Dropdown
          dropdownname="Bank Name *"
          name="cheque_bank"
          results={banksLoading ? [] : bankOptions}
          value={getBankDisplayValue(formData.cheque_bank)}
          onChange={handleBankChange}
          disabled={banksLoading || !selectedOrganizationId}
        />

        <Dropdown
          dropdownname="Branch Name *"
          name="cheque_branch"
          results={branchesLoading ? [] : branchOptions}
          value={getBranchDisplayValue(formData.cheque_branch)}
          onChange={handleBranchChange}
          disabled={branchesLoading || !selectedOrganizationId || !selectedBankId}
        />
      </div>

      {/* ROW 5 */}
      <div className={styles.grid}>
        <Inputbox
          label="IFSC Code *"
          name="cheque_ifsc"
          placeholder="Enter IFSC Code"
          value={formData.cheque_ifsc}
          onChange={onChange}
        />

        <Dropdown
          dropdownname="City Name *"
          name="cheque_city"
          results={cityOptions}
          value={formData.cheque_city}
          onChange={onChange}
        />
      </div>

      {/* ROW 6 */}
      <div className={styles.grid}>
        <Inputbox
          label="Remarks"
          name="cheque_remarks"
          placeholder="Enter Remarks"
          value={formData.cheque_remarks}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default ChequeForms;
