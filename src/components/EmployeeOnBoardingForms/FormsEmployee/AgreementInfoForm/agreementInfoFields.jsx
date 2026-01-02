// agreementInfoFields.js

export const agreementInfoStaticFields = [
  {
    name: "agreementCompany",
    label: "Agreement Company",
    options: ["Company A", "Company B", "Company C"],
  },
  {
    name: "agreementType",
    label: "Agreement Type",
    options: ["Type X", "Type Y", "Type Z"],
  }
];

export const agreementInfoStaticLayout = [
  { id: "row1", fields: ["agreementCompany", "agreementType"] },
];

// ---------- CHEQUE FIELDS ----------
export const chequeFields = [
  {
    name: "chequeNo",
    label: "Cheque No",
    type: "text",
    placeholder: "Enter Cheque No",
  },
  {
    name: "chequeBank",
    label: "Select Bank",
    options: ["Bank 1", "Bank 2", "Bank 3"],
  },
  {
    name: "ifscCode",
    label: "IFSC Code",
    type: "text",
    placeholder: "Enter IFSC Code",
  },
];

export const chequeLayout = [
  { id: "chequeRow", fields: ["chequeNo", "chequeBank", "ifscCode"] }
];
