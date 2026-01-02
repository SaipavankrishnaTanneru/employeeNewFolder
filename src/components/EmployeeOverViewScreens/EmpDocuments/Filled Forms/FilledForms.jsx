import styles from "./FIlledForms.module.css";
import EmpViewDocumentCard from "widgets/EmpViewDocumentsCard/EmpViewDocumentCard";

const FilledForms = () => {
  const filledFormsDocuments = [
    {
      id: "personalDetailForm",
      heading: "Personal Detail Form",
      updatedDate: "12 Oct 2020",
    },
    {
      id: "hiringApprovalForm",
      heading: "Hiding Approval Form",
      updatedDate: "12 Oct 2020",
    },
    {
      id: "bgVerificationForm",
      heading: "Background Verification Form",
      updatedDate: "12 Oct 2020",
    },
    {
      id: "esiDeclarationForm",
      heading: "ESI Declaration Form",
      updatedDate: "12 Oct 2020",
    },
    { id: "pfForm", heading: "PF Form", updatedDate: "12 Oct 2020" },
    { id: "resume", heading: "Resume", updatedDate: "12 Oct 2020" },
    {
      id: "previousCompanyPayslips",
      heading: "Previous Company Payslips",
      updatedDate: "12 Oct 2020",
    },
    {
      id: "gratuityForm",
      heading: "Gratuity Form",
      updatedDate: "12 Oct 2020",
    },
    { id: "others", heading: "Others", updatedDate: "12 Oct 2020" },
  ];

  return (
    <div className={styles.filledFormsNavContent}>
      {filledFormsDocuments.map((document) => {
        return (
          <EmpViewDocumentCard
            key={document.id} // Required for list items
            heading={document.heading}
            updatedDate={document.updatedDate}
          />
        );
      })}
    </div>
  );
};

export default FilledForms;
