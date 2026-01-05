import React, { useRef, useEffect } from 'react';
import styles from './DocumentUploadModal.module.css';
import { ReactComponent as UploadIcon } from 'assets/Qualification/UploadCard.svg';
import {ReactComponent as DocIcon} from 'assets/Qualification/DocIcon.svg';
import popupDocIcon from 'assets/EmployeeOnBoarding/popupDocIcon.svg';
import CloseIcon from 'assets/EmployeeOnBoarding/closeicon.svg';
 
 
const DocumentCard = ({ docType, files, hasFiles, onFileUpload, onRemoveFile }) => {
  const inputRef = useRef(null);
 
  const handleClick = () => {
    inputRef.current?.click();
  };
 
  return (
    <div className={styles.documentCard}>
      <div className={styles.cardHeader}>
      <DocIcon />
      <h4 className={styles.cardTitle}>{docType.title}</h4>
      {/* <CardBackground className={styles.backgroundSvg} /> */}
      </div>
      {hasFiles && (
        <div className={styles.fileList}>
          {files.map((file, index) => (
            <div key={index} className={styles.fileItem}>
              <span className={styles.fileName}>{file.name}</span>
              <button
                className={styles.removeFileBtn}
                onClick={() => onRemoveFile(docType.id, index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
 
      <div className={styles.cardFooter}>
        <input
          ref={inputRef}
          type="file"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => {
            onFileUpload(docType.id, e.target.files);
            // Reset input so same file can be selected again
            e.target.value = '';
          }}
        />
        {hasFiles ? (
          <button
            className={styles.reUploadButton}
            onClick={handleClick}
          >
            <UploadIcon /> Re-Upload
          </button>
        ) : (
          <button
            className={styles.uploadButton}
            onClick={handleClick}
          >
            <UploadIcon /> Upload
          </button>
        )}
      </div>
    </div>
  );
};
 
const DocumentUploadModal = ({ isOpen, onClose, companyName, documents, onDocumentsChange }) => {
  const contentRef = useRef(null);
 
  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
 
    const handleClickOutside = (e) => {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        onClose();
      }
    };
 
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);
 
  if (!isOpen) return null;
 
  const documentTypes = [
    { id: 'payslips', title: 'Payslips' },
    { id: 'resignation', title: 'Resignation' },
    { id: 'offerLetter', title: 'Offer Letter' },
    { id: 'form12A', title: 'Form 12A' },
    { id: 'gratuity', title: 'Gratuity' },
    { id: 'pfMergerLetter', title: 'PF Merger Letter' },
  ];
 
  const handleFileUpload = (docType, files) => {
    if (!files || files.length === 0) return;
 
    const fileArray = Array.from(files);
    const existingFiles = documents[docType] || [];
   
    onDocumentsChange({
      ...documents,
      [docType]: [...existingFiles, ...fileArray],
    });
  };
 
  const handleRemoveFile = (docType, fileIndex) => {
    const existingFiles = documents[docType] || [];
    const updatedFiles = existingFiles.filter((_, index) => index !== fileIndex);
   
    onDocumentsChange({
      ...documents,
      [docType]: updatedFiles,
    });
  };
 
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={contentRef}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div>
            <img src={popupDocIcon} alt="popupDocIcon" />
            <h3 className={styles.modalTitle}>{companyName || 'Company'}</h3>
            <p className={styles.modalSubtitle}>Upload Documents</p>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
          <img src={CloseIcon} alt="closeIcon" />
          </button>
        </div>
 
        {/* Document Cards Grid */}
        <div className={styles.documentGrid}>
          {documentTypes.map((docType) => {
            const files = documents[docType.id] || [];
            const hasFiles = files.length > 0;
 
            return (
              <DocumentCard
                key={docType.id}
                docType={docType}
                files={files}
                hasFiles={hasFiles}
                onFileUpload={handleFileUpload}
                onRemoveFile={handleRemoveFile}
              />
            );
          })}
        </div>
 
        {/* Footer Buttons */}
        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.uploadMoreButton} onClick={onClose}>
            Upload More
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default DocumentUploadModal;
 
 
 