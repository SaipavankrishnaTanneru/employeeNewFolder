import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styles from '../Qualification&DocumentsUpload/css/UploadDocumentsForm.module.css';

// 1. Import your custom card
import DocumentCard from './DocumentCard'; 

// 2. SAFE ICON IMPORT
import borderIconSrc from 'assets/Qualification/border.svg';

// 3. API & Auth Hooks
import { useDocumentTypes, postDocuments, uploadFileToCloud } from 'api/onBoardingForms/postApi/useDocumentQueries';
import { useAuth } from 'useAuth';

// --- MAPPING: Frontend IDs -> Backend Names ---
const DOC_TYPE_MAPPING = {
  personalDetail: "PersonalDetailsForm",
  hiringApproval: "HiringApprovalForm",
  backgroundVerification: "BackgroundVerificationForm",
  esiDeclaration: "ESIDeclarationForm",
  pfForm: "PFForm",
  resume: "Resume",
  previousPayslips: "Payslips",
  gratuityForm: "Gratuity",
  others: "Others",
  passport: "Passport",
  panCard: "PanCard",
  voterId: "VoterIdentityCard",
  drivingLicense: "Drivinglicence",
  aadhaarCard: "AadhaarCard"
};

// 🔴 DEFINING MANDATORY DOCUMENTS
const MANDATORY_DOC_IDS = [
  "aadhaarCard",
  "panCard",
  "resume",
  "personalDetail",
  "hiringApproval"
];

const initialDocuments = {
  uploadDocs: [
    { id: 'personalDetail', title: 'Personal Detail Form', file: null },
    { id: 'hiringApproval', title: 'Hiring Approval Form', file: null },
    { id: 'backgroundVerification', title: 'Background Verification Form', file: null },
    { id: 'esiDeclaration', title: 'ESI Declaration Form', file: null },
    { id: 'pfForm', title: 'PF Form', file: null },
    { id: 'resume', title: 'Resume', file: null },
    { id: 'previousPayslips', title: 'Previous Company Payslips', file: null },
    { id: 'gratuityForm', title: 'Gratuity Form', file: null },
    { id: 'others', title: 'Others', file: null },
  ],
  idProofs: [
    { id: 'passport', title: 'Passport', file: null },
    { id: 'panCard', title: 'Pan Card', file: null },
    { id: 'voterId', title: 'Voter Identity Card', file: null },
    { id: 'drivingLicense', title: 'Driving License', file: null },
    { id: 'aadhaarCard', title: 'Aadhaar Card', file: null },
  ],
};

const UploadDocumentsForm = forwardRef(({ tempId, onSuccess }, ref) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;
  
  const [documents, setDocuments] = useState(initialDocuments);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Backend Document Types (IDs)
  const { data: docTypes = [] } = useDocumentTypes();

  // Handle File Selection
  const handleFileChange = (docId, file) => {
    setDocuments(prevDocs => {
      const updatedDocs = { ...prevDocs };
      for (const key in updatedDocs) {
        updatedDocs[key] = updatedDocs[key].map(doc =>
          doc.id === docId ? { ...doc, file: file } : doc
        );
      }
      return updatedDocs;
    });
  };

  // Expose Submit Function to Parent (Footer)
  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (!tempId) return alert("Temporary ID is missing.");
      
      // 🔴 VALIDATION LOGIC START
      const allDocs = [...documents.uploadDocs, ...documents.idProofs];
      
      // Filter out mandatory docs that DO NOT have a file
      const missingDocs = MANDATORY_DOC_IDS.filter(mandatoryId => {
         const doc = allDocs.find(d => d.id === mandatoryId);
         return !doc || !doc.file; // Missing if doc doesn't exist or file is null
      });

      if (missingDocs.length > 0) {
          // Get readable titles for alert
          const missingTitles = missingDocs.map(id => {
              const doc = allDocs.find(d => d.id === id);
              return doc ? doc.title : id;
          });
          
          alert(`Please upload the following mandatory documents:\n- ${missingTitles.join('\n- ')}`);
          return; // ⛔ Stop Execution
      }
      // 🔴 VALIDATION LOGIC END

      setIsSubmitting(true);

      try {
        const payloadDocs = [];

        for (const doc of allDocs) {
          if (doc.file) {
            const backendName = DOC_TYPE_MAPPING[doc.id];
            const typeObj = docTypes.find(t => t.name === backendName);
            const typeId = typeObj ? typeObj.id : 0; 

            // Upload to Cloud
            const docPath = await uploadFileToCloud(doc.file);

            payloadDocs.push({
              docTypeId: typeId,
              docPath: docPath, 
              isVerified: true 
            });
          }
        }

        const apiPayload = {
          documents: payloadDocs,
          createdBy: hrEmployeeId,
          updatedBy: hrEmployeeId
        };

        await postDocuments(tempId, apiPayload);
        if (onSuccess) onSuccess();

      } catch (error) {
        console.error("❌ Document upload failed:", error);
        alert("Failed to save documents.");
      } finally {
        setIsSubmitting(false);
      }
    }
  }));

  if (isSubmitting) return <div className={styles.loadingState}>Uploading Documents...</div>;

  return (
    <div className={styles.formContainer}>
      
      {/* Section 1: Upload Documents */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Upload Documents 
          <img src={borderIconSrc} alt="" style={{marginLeft: '10px'}} />
        </h2>
        <div className={styles.grid}>
          {documents.uploadDocs.map(doc => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              onFileChange={handleFileChange}
              // 🔴 Pass required prop
              required={MANDATORY_DOC_IDS.includes(doc.id)}
            />
          ))}
        </div>
      </section>

      {/* Section 2: ID Proofs */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          ID Proofs 
          <img src={borderIconSrc} alt="" style={{marginLeft: '10px'}} />
        </h2>
        <div className={styles.grid}>
          {documents.idProofs.map(doc => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              onFileChange={handleFileChange}
              // 🔴 Pass required prop
              required={MANDATORY_DOC_IDS.includes(doc.id)}
            />
          ))}
        </div>
      </section>

    </div>
  );
});

export default UploadDocumentsForm;