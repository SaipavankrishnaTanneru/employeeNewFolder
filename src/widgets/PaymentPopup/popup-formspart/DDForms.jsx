import React, { useState, useEffect } from "react";
import Inputbox from "../../Inputbox/InputBox";
import Dropdown from "../../Dropdown/Dropdown";
import styles from "./DDForms.module.css";
import { useOrganizations, useBanksByOrganization, useBranchesByOrganizationAndBank } from "../../../hooks/payment-apis/PaymentApis";

const DDForms = ({ formData, onChange }) => {
  // Fetch organizations from API (needed for ID conversion)
  const { organizationOptions, getOrganizationIdByLabel, getOrganizationLabelById, loading: organizationsLoading } = useOrganizations();
  
  // State to track selected organization ID (for fetching banks)
  // Initialize from formData if it's already an ID (number or numeric string)
  const getInitialOrgId = () => {
    if (!formData?.dd_org) return null;
    const orgValue = formData.dd_org;
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
  }, [formData?.dd_org]);

  
  // Fetch banks based on selected organization ID
  const { bankOptions, getBankIdByLabel, getBankLabelById, loading: banksLoading } = useBanksByOrganization(selectedOrganizationId);
  
  // State to track selected bank ID (for fetching branches)
  const getInitialBankId = () => {
    if (!formData?.dd_bank) return null;
    const bankValue = formData.dd_bank;
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
  }, [formData?.dd_bank]);
  
  // Fetch branches based on selected organization ID and bank ID
  const { branchOptions, getBranchIdByLabel, getBranchLabelById, loading: branchesLoading } = useBranchesByOrganizationAndBank(selectedOrganizationId, selectedBankId);
  
  const cityOptions = ["Hyderabad", "Bangalore", "Chennai"];

  // Handle organization change - convert label to ID before storing and fetch banks
  const handleOrganizationChange = (e) => {
    const selectedLabel = e.target.value;
    const organizationId = getOrganizationIdByLabel(selectedLabel);
    
    // Log for debugging
    console.log('📝 Selected Organization Label:', selectedLabel);
    console.log('🆔 Organization ID:', organizationId);
    
    // Set organization ID to trigger bank fetching
    setSelectedOrganizationId(organizationId);
    
    // Create a synthetic event with the ID value for backend
    const syntheticEvent = {
      target: {
        name: "dd_org",
        value: organizationId !== undefined ? organizationId : selectedLabel // Fallback to label if ID not found
      }
    };
    
    onChange(syntheticEvent);
    
    // Clear bank and branch selections when organization changes
    const clearBankEvent = {
      target: {
        name: "dd_bank",
        value: ""
      }
    };
    onChange(clearBankEvent);
    
    const clearBranchEvent = {
      target: {
        name: "dd_branch",
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
    console.log('📝 Selected Bank Label:', selectedLabel);
    console.log('🆔 Bank ID:', bankId);
    
    // Set bank ID to trigger branch fetching
    setSelectedBankId(bankId);
    
    // Create a synthetic event with the ID value for backend
    const syntheticEvent = {
      target: {
        name: "dd_bank",
        value: bankId !== undefined ? bankId : selectedLabel // Fallback to label if ID not found
      }
    };
    
    onChange(syntheticEvent);
    
    // Clear branch selection when bank changes
    const clearBranchEvent = {
      target: {
        name: "dd_branch",
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
    console.log('📝 Selected Branch Label:', selectedLabel);
    console.log('🆔 Branch ID:', branchId);
    
    // Create a synthetic event with the ID value for backend
    const syntheticEvent = {
      target: {
        name: "dd_branch",
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
          name="dd_paymentDate"
          placeholder="MM/DD/YYYY"
          value={formData.dd_paymentDate}
          onChange={onChange}
          type="date"
        />

        <Inputbox
          label="Amount *"
          name="dd_amount"
          placeholder="Enter Amount (numbers only)"
          value={formData.dd_amount}
          onChange={onChange}
          type="number"
        />
      </div>

      {/* ROW 2 */}
      <div className={styles.grid}>
        <Inputbox
          label="Pre Printed Receipt No *"
          name="dd_receiptNo"
          placeholder="Enter Pre Printed Receipt No"
          value={formData.dd_receiptNo}
          onChange={onChange}
        />

        <Inputbox
          label="DD Number *"
          name="dd_number"
          placeholder="Enter DD Number"
          value={formData.dd_number}
          onChange={onChange}
        />
      </div>

      {/* ROW 3 */}
      <div className={styles.grid}>
        <Inputbox
          label="DD Date *"
          name="dd_date"
          placeholder="MM/DD/YYYY"
          value={formData.dd_date}
          onChange={onChange}
          type="date"
        />

        <Dropdown
          dropdownname="Organisation Name *"
          name="dd_org"
          results={organizationsLoading ? [] : organizationOptions}
          value={getOrganizationDisplayValue(formData.dd_org)}
          onChange={handleOrganizationChange}
          disabled={organizationsLoading}
        />
      </div>

      {/* ROW 4 */}
      <div className={styles.grid}>
        <Dropdown
          dropdownname="Bank Name *"
          name="dd_bank"
          results={banksLoading ? [] : bankOptions}
          value={getBankDisplayValue(formData.dd_bank)}
          onChange={handleBankChange}
          disabled={banksLoading || !selectedOrganizationId}
        />

        <Dropdown
          dropdownname="Branch Name *"
          name="dd_branch"
          results={branchesLoading ? [] : branchOptions}
          value={getBranchDisplayValue(formData.dd_branch)}
          onChange={handleBranchChange}
          disabled={branchesLoading || !selectedOrganizationId || !selectedBankId}
        />
      </div>

      {/* ROW 5 */}
      <div className={styles.grid}>
        <Inputbox
          label="IFSC Code *"
          name="dd_ifsc"
          placeholder="Enter IFSC Code"
          value={formData.dd_ifsc}
          onChange={onChange}
        />

        <Dropdown
          dropdownname="City Name *"
          name="dd_city"
          results={cityOptions}
          value={formData.dd_city}
          onChange={onChange}
        />
      </div>

      {/* ROW 6 */}
      <div className={styles.grid}>
        <Inputbox
          label="Remarks"
          name="dd_remarks"
          placeholder="Enter Remarks"
          value={formData.dd_remarks}
          onChange={onChange}
        />
      </div>

      
    </div>
  );
};

export default DDForms;
