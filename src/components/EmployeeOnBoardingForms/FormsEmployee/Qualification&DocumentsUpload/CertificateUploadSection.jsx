import React, { useState, useRef } from 'react';
import styles from './css/CertificateUploadSection.module.css';
import FormCheckbox from 'widgets/FormCheckBox/FormCheckBox'; 
import { ReactComponent as UploadIcon } from 'assets/Qualification/Upload.svg'; 
import pdfIcon from 'assets/EmployeeQu/pdf_icon.svg'; 
import closeIcon from 'assets/EmployeeOnBoarding/closeicon.svg'; 
import CertificateViewModal from './CertificateViewModal';

// --- MOCK UPLOAD FUNCTION ---
const mockUpload = (file) => {
  // 1. Sanitize filename
  const safeName = file.name.replace(/\s+/g, "_");
  // 2. Generate the Varsity CDN URL
  const fakeUrl = `https://cdn.varsity123.com/docs/${safeName}`;

  return {
    name: file.name,
    size: file.size,
    type: file.type,
    url: fakeUrl // <--- The path we need for the JSON
  };
};

const FileTypeIcon = ({ fileName }) => {
  return <img src={pdfIcon} alt="File" className={styles.fileIcon} />;
};

const CertificateUploadSection = ({ index, formik }) => {
  const { values, setFieldValue } = formik;
  const item = values.qualifications[index];
  const fileInputRef = useRef(null);
  const uploadMoreRef = useRef(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const isSubmitted = item.isSubmittedCertificate || false;
  const certificateFiles = item.certificateFiles || [];
  
  // Get latest 3 files for the stack visual
  const latestFiles = certificateFiles.slice(-3);

  const handleCheckboxChange = (checked) => {
    setFieldValue(`qualifications.${index}.isSubmittedCertificate`, checked);
    if (!checked) {
      setFieldValue(`qualifications.${index}.certificateFiles`, []);
    }
  };

  const handleFileUpload = (e) => {
    const rawFiles = Array.from(e.target.files || []);
    
    if (rawFiles.length > 0) {
      // 🚀 UPLOAD LOGIC: Convert File -> Object with URL
      const uploadedFiles = rawFiles.map(file => mockUpload(file));
      
      const existingFiles = certificateFiles || [];
      setFieldValue(`qualifications.${index}.certificateFiles`, [...existingFiles, ...uploadedFiles]);
    }
    e.target.value = '';
  };

  const handleRemoveFile = (fileIndex) => {
    const updatedFiles = certificateFiles.filter((_, idx) => idx !== fileIndex);
    setFieldValue(`qualifications.${index}.certificateFiles`, updatedFiles);
  };

  const handleUploadMore = () => {
    uploadMoreRef.current?.click();
  };

  const handlePreviewFile = (file) => {
    // Open the mocked URL
    if (file.url) {
        window.open(file.url, '_blank');
    }
  };

  return (
    <div className={styles.certificateSection}>
      {/* 1. Checkbox Section */}
      <div className={styles.checkboxContainer}>
        <FormCheckbox
          name={`submittedCertificate-${index}`}
          checked={isSubmitted}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={`submittedCertificate-${index}`} className={styles.checkboxLabel}>
          Submitted Certificate
        </label>
      </div>

      {/* 2. Upload Area */}
      {isSubmitted && (
        <div className={styles.uploadSection}>
          <label className={styles.uploadLabel}>Upload Certificate</label>

          {/* Stacked Files Container */}
          {latestFiles.length > 0 && (
            <div className={styles.filesStackContainer}>
              {latestFiles.map((file, idx) => {
                const actualIndex = certificateFiles.length - latestFiles.length + idx;
                
                return (
                  <div
                    key={actualIndex}
                    className={styles.fileCapsule}
                    onClick={() => handlePreviewFile(file)}
                    style={{
                      left: `${idx * 15}px`,
                      zIndex: idx + 1
                    }}
                    title={file.url}
                  >
                    <div className={styles.fileContent}>
                      <div className={styles.fileIconWrapper}>
                        <FileTypeIcon fileName={file.name} />
                      </div>
                      <span className={styles.fileName}>{file.name}</span>
                    </div>

                    <button
                      className={styles.removeButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(actualIndex);
                      }}
                      type="button"
                    >
                      <img src={closeIcon} alt="Remove" />
                    </button>
                  </div>
                );
              })}

              {certificateFiles.length > 0 && (
                <button
                  className={styles.viewAllIcon}
                  onClick={() => setShowViewModal(true)}
                  type="button"
                >
                   {/* ... svg icon ... */}
                   <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.25 0.5H1.75C1.41848 0.5 1.10054 0.631696 0.866116 0.866116C0.631696 1.10054 0.5 1.41848 0.5 1.75V9.25C0.5 9.58152 0.631696 9.89946 0.866116 10.1339C1.10054 10.3683 1.41848 10.5 1.75 10.5H9.25C9.58152 10.5 9.89946 10.3683 10.1339 10.1339C10.3683 9.89946 10.5 9.58152 10.5 9.25V6.75M5.5 5.5L10.5 0.5M10.5 0.5V3.625M10.5 0.5H7.375" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                </button>
              )}
            </div>
          )}

          {/* Upload Buttons */}
          <div className={styles.uploadActions}>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              hidden
              id={`certUpload-${index}`}
              onChange={handleFileUpload}
            />
            {certificateFiles.length === 0 ? (
              <label htmlFor={`certUpload-${index}`} className={styles.uploadButton}>
                <UploadIcon /> Upload File
              </label>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.uploadMoreButton}
                  onClick={handleUploadMore}
                >
                  <UploadIcon /> Upload More
                </button>
                <input
                  ref={uploadMoreRef}
                  type="file"
                  multiple
                  hidden
                  onChange={handleFileUpload}
                />
              </>
            )}
          </div>
        </div>
      )}

      <CertificateViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        files={certificateFiles}
        onRemoveFile={handleRemoveFile}
      />
    </div>
  );
};

export default CertificateUploadSection;