import React, { useState } from 'react';
import styles from "../CoDoUpdatePopup/DocumentsUpdate.module.css";
import DocumentCard from '../../EmployeeOnBoardingForms/FormsEmployee/Qualification&DocumentsUpload/DocumentCard';
import { ReactComponent as BorderIcon } from 'assets/Qualification/border.svg';
 
// --- Data for the documents ---
const initialDocuments = {
  uploadDocs: [
    { id: 'personalDetail', title: 'Personal Detail Form', file: null, verificationStatus: 'Unverified' },
    { id: 'hiringApproval', title: 'Hiring Approval Form', file: null, verificationStatus: 'Unverified' },
    { id: 'backgroundVerification', title: 'Background Verification Form', file: null, verificationStatus: 'Unverified' },
    { id: 'esiDeclaration', title: 'ESI Declaration Form', file: null, verificationStatus: 'Unverified' },
    { id: 'pfForm', title: 'PF Form', file: null, verificationStatus: 'Unverified' },
    { id: 'resume', title: 'Resume', file: null, verificationStatus: 'Unverified' },
    { id: 'previousPayslips', title: 'Previous Company Payslips', file: null, verificationStatus: 'Unverified' },
    { id: 'gratuityForm', title: 'Gratuity Form', file: null, verificationStatus: 'Unverified' },
    { id: 'others', title: 'Others', file: null, verificationStatus: 'Unverified' },
  ],
  idProofs: [
    { id: 'passport', title: 'Passport', file: null, verificationStatus: 'Unverified' },
    { id: 'panCard', title: 'Pan Card', file: null },
    { id: 'voterId', title: 'Voter Identity Card', file: null, verificationStatus: 'Unverified' },
    { id: 'drivingLicense', title: 'Driving License', file: null, verificationStatus: 'Unverified' },
    { id: 'aadhaarCard', title: 'Aadhaar Card', file: null, verificationStatus: 'Unverified' },
  ],
};
 
const DocumentsUpdate = () => {
  const [documents, setDocuments] = useState(initialDocuments);
 
  const handleFileChange = (docId, file) => {
    // This function finds the correct document by its ID and updates its file
    setDocuments(prevDocs => {
      const updatedDocs = { ...prevDocs };
      for (const key in updatedDocs) {
        updatedDocs[key] = updatedDocs[key].map(doc =>
          doc.id === docId ? { ...doc, file } : doc
        );
      }
      return updatedDocs;
    });
  };
 
  const handleStatusChange = (docId, status) => {
  setDocuments(prevDocs => {
    const updatedDocs = { ...prevDocs };
    for (const key in updatedDocs) {
      updatedDocs[key] = updatedDocs[key].map(doc =>
        doc.id === docId ? { ...doc, verificationStatus: status } : doc
      );
    }
    return updatedDocs;
  });
};
 
  return (
    <div className={styles.formContainer}>
      <section className={styles.section}>
 
        <h2 className={styles.sectionTitle}>Upload Documents <BorderIcon /></h2>
        <div className={styles.grid}>
          {documents.uploadDocs.map(doc => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              onFileChange={handleFileChange}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </section>
 
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ID Proofs <BorderIcon /></h2>
        <div className={styles.grid}>
          {documents.idProofs.map(doc => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              onFileChange={handleFileChange}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </section>
 
      {/* You would have navigation buttons here, similar to the previous form */}
    </div>
  );
};
 
export default DocumentsUpdate;
 