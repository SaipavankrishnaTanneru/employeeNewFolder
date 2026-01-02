// src/config/onboardingTabs.js

import basicInfoIcon from 'assets/EmployeeOnBoarding/hugeicons_profile-02.svg';
import addressInfoIcon from 'assets/EmployeeOnBoarding/mingcute_location-2-line.svg';
import familyInfoIcon from 'assets/EmployeeOnBoarding/material-symbols_family-group-rounded.svg';
import employerInfoIcon from 'assets/EmployeeOnBoarding/hugeicons_permanent-job.svg';
import qualificationIcon from 'assets/EmployeeOnBoarding/humbleicons_certificate.svg';
import uploadDocsIcon from 'assets/EmployeeOnBoarding/system-uicons_document.svg';
import categoryInfoIcon from 'assets/EmployeeOnBoarding/mdi_category-outline.svg';
import bankInfoIcon from 'assets/EmployeeOnBoarding/mingcute_bank-card-line.svg';
import agreementsIcon from 'assets/EmployeeOnBoarding/icon-park-outline_agreement.svg'

export const onboardingSteps = [
  { id: 1, label: "Basic Info", icon: basicInfoIcon, path: "basic-info" },
  { id: 2, label: "Address Info", icon: addressInfoIcon, path: "address-info" },
  { id: 3, label: "Family Info", icon: familyInfoIcon, path: "family-info" },
  { id: 4, label: "Previous Employer Info", icon: employerInfoIcon, path: "previous-employer-info" },
  { id: 5, label: "Qualification", icon: qualificationIcon, path: "qualification" },
  { id: 6, label: "Upload Documents", icon: uploadDocsIcon, path: "upload-documents" },
  { id: 7, label: "Category Info", icon: categoryInfoIcon, path: "category-info" },
  { id: 8, label: "Bank Info", icon: bankInfoIcon, path: "bank-info" },
  { id: 9, label: "Agreements", icon: agreementsIcon, path: "agreements" },
  { id: 10, label: "SalaryInfo", icon: bankInfoIcon , path: "salary-info" },
];
