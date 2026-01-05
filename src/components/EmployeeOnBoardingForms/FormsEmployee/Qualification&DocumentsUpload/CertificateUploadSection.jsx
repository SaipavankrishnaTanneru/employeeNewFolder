import React, { useState, useRef } from 'react';
import styles from './css/CertificateUploadSection.module.css';
import FormCheckbox from 'widgets/FormCheckBox/FormCheckBox'; // Adjust path as needed
import { ReactComponent as UploadIcon } from 'assets/Qualification/Upload.svg'; // Adjust path as needed
import pdfIcon from 'assets/EmployeeQu/pdf_icon.svg'; // Adjust path as needed
import closeIcon from 'assets/EmployeeOnBoarding/closeicon.svg'; // Adjust path as needed
import CertificateViewModal from './CertificateViewModal';

// Simplified File Icon Component
const FileTypeIcon = ({ fileName }) => {
  // You can add logic here to switch icons based on extension if needed
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
  
  // Get latest 3 files for the stack
  const latestFiles = certificateFiles.slice(-3);

  const handleCheckboxChange = (checked) => {
    setFieldValue(`qualifications.${index}.isSubmittedCertificate`, checked);
    if (!checked) {
      setFieldValue(`qualifications.${index}.certificateFiles`, []);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const existingFiles = certificateFiles || [];
      setFieldValue(`qualifications.${index}.certificateFiles`, [...existingFiles, ...files]);
    }
    // Reset input value to allow re-uploading same file if needed
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
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
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

      {/* 2. Upload Area (Visible only if checked) */}
      {isSubmitted && (
        <div className={styles.uploadSection}>
          <label className={styles.uploadLabel}>Upload Certificate</label>

          {/* Stacked Files Container */}
          {latestFiles.length > 0 && (
            <div className={styles.filesStackContainer}>
              
              {/* Loop through the files to create the stack */}
              {latestFiles.map((file, idx) => {
                const actualIndex = certificateFiles.length - latestFiles.length + idx;
                
                return (
                  <div
                    key={actualIndex}
                    className={styles.fileCapsule}
                    onClick={() => handlePreviewFile(file)} // Click pill to preview
                    style={{
                      left: `${idx * 15}px`, // Stacking offset (15px per card)
                      zIndex: idx + 1
                    }}
                    title="Click to preview"
                  >
                    {/* File Icon & Name */}
                    <div className={styles.fileContent}>
                      <div className={styles.fileIconWrapper}>
                        <FileTypeIcon fileName={file.name} />
                      </div>
                      <span className={styles.fileName}>{file.name}</span>
                    </div>

                    {/* Remove 'X' Button */}
                    <button
                      className={styles.removeButton}
                      onClick={(e) => {
                        e.stopPropagation(); // Stop click from triggering preview
                        handleRemoveFile(actualIndex);
                      }}
                      type="button"
                      title="Remove file"
                    >
                      <img src={closeIcon} alt="Remove" />
                    </button>
                  </div>
                );
              })}

              {/* View All Icon (Positioned Absolute Right) */}
              {certificateFiles.length > 0 && (
                <button
                  className={styles.viewAllIcon}
                  onClick={() => setShowViewModal(true)}
                  type="button"
                  title="View all files"
                >
                   <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.25 0.5H1.75C1.41848 0.5 1.10054 0.631696 0.866116 0.866116C0.631696 1.10054 0.5 1.41848 0.5 1.75V9.25C0.5 9.58152 0.631696 9.89946 0.866116 10.1339C1.10054 10.3683 1.41848 10.5 1.75 10.5H9.25C9.58152 10.5 9.89946 10.3683 10.1339 10.1339C10.3683 9.89946 10.5 9.58152 10.5 9.25V6.75M5.5 5.5L10.5 0.5M10.5 0.5V3.625M10.5 0.5H7.375" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                </button>
              )}
            </div>
          )}

          {/* Upload Buttons */}
          <div className={styles.uploadActions}>
            {certificateFiles.length === 0 ? (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  hidden
                  id={`certUpload-${index}`}
                  onChange={handleFileUpload}
                />
                <label htmlFor={`certUpload-${index}`} className={styles.uploadButton}>
                  <UploadIcon /> Upload File
                </label>
              </>
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

      {/* View All Modal */}
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