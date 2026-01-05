import React, { useRef, useEffect } from 'react';
import styles from './css/CertificateViewModal.module.css';
import closeIcon from 'assets/EmployeeOnBoarding/closeicon.svg';
import pdfIcon from 'assets/EmployeeQu/pdf_icon.svg';
import popupDocIcon from 'assets/EmployeeOnBoarding/popupDocIcon.svg';
 
// File type icon component (same as in CertificateUploadSection)
const FileTypeIcon = ({ fileName }) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
 
  // PDF Icon
  if (extension === 'pdf') {
    return <img src={pdfIcon} alt="PDF" className={styles.fileIcon} />;
  }
 
  // Document Icon (DOC, DOCX)
  if (extension === 'doc' || extension === 'docx') {
    return (
      <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.fileIcon}>
        <path d="M4.25 19.25H12.666C13.5943 19.25 14.4845 18.8813 15.1409 18.2249C15.7973 17.5685 16.166 16.6783 16.166 15.75V10.22C16.1663 9.29186 15.798 8.40159 15.142 7.745L9.173 1.775C8.84797 1.45 8.46211 1.19221 8.03745 1.01634C7.61278 0.840469 7.15764 0.749967 6.698 0.75H4.25C3.32174 0.75 2.4315 1.11875 1.77513 1.77513C1.11875 2.4315 0.75 3.32174 0.75 4.25V15.75C0.75 16.6783 1.11875 17.5685 1.77513 18.2249C2.4315 18.8813 3.32174 19.25 4.25 19.25Z" stroke="#2E5BBA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#2E5BBA" fillOpacity="0.1"/>
      </svg>
    );
  }
 
  // Image Icon (JPG, JPEG, PNG)
  if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif' || extension === 'bmp' || extension === 'webp') {
    return (
      <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.fileIcon}>
        <path d="M4.25 19.25H12.666C13.5943 19.25 14.4845 18.8813 15.1409 18.2249C15.7973 17.5685 16.166 16.6783 16.166 15.75V10.22C16.1663 9.29186 15.798 8.40159 15.142 7.745L9.173 1.775C8.84797 1.45 8.46211 1.19221 8.03745 1.01634C7.61278 0.840469 7.15764 0.749967 6.698 0.75H4.25C3.32174 0.75 2.4315 1.11875 1.77513 1.77513C1.11875 2.4315 0.75 3.32174 0.75 4.25V15.75C0.75 16.6783 1.11875 17.5685 1.77513 18.2249C2.4315 18.8813 3.32174 19.25 4.25 19.25Z" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#10B981" fillOpacity="0.1"/>
        <circle cx="6" cy="8" r="2" fill="#10B981"/>
        <path d="M2 15L4.5 12L7 14L11 10L14.5 13" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
 
  // Excel Icon (XLS, XLSX)
  if (extension === 'xls' || extension === 'xlsx') {
    return (
      <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.fileIcon}>
        <path d="M4.25 19.25H12.666C13.5943 19.25 14.4845 18.8813 15.1409 18.2249C15.7973 17.5685 16.166 16.6783 16.166 15.75V10.22C16.1663 9.29186 15.798 8.40159 15.142 7.745L9.173 1.775C8.84797 1.45 8.46211 1.19221 8.03745 1.01634C7.61278 0.840469 7.15764 0.749967 6.698 0.75H4.25C3.32174 0.75 2.4315 1.11875 1.77513 1.77513C1.11875 2.4315 0.75 3.32174 0.75 4.25V15.75C0.75 16.6783 1.11875 17.5685 1.77513 18.2249C2.4315 18.8813 3.32174 19.25 4.25 19.25Z" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#16A34A" fillOpacity="0.1"/>
      </svg>
    );
  }
 
  // PowerPoint Icon (PPT, PPTX)
  if (extension === 'ppt' || extension === 'pptx') {
    return (
      <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.fileIcon}>
        <path d="M4.25 19.25H12.666C13.5943 19.25 14.4845 18.8813 15.1409 18.2249C15.7973 17.5685 16.166 16.6783 16.166 15.75V10.22C16.1663 9.29186 15.798 8.40159 15.142 7.745L9.173 1.775C8.84797 1.45 8.46211 1.19221 8.03745 1.01634C7.61278 0.840469 7.15764 0.749967 6.698 0.75H4.25C3.32174 0.75 2.4315 1.11875 1.77513 1.77513C1.11875 2.4315 0.75 3.32174 0.75 4.25V15.75C0.75 16.6783 1.11875 17.5685 1.77513 18.2249C2.4315 18.8813 3.32174 19.25 4.25 19.25Z" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#F97316" fillOpacity="0.1"/>
      </svg>
    );
  }
 
  // Default generic document icon
  return (
    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.fileIcon}>
      <path d="M4.25 19.25H12.666C13.5943 19.25 14.4845 18.8813 15.1409 18.2249C15.7973 17.5685 16.166 16.6783 16.166 15.75V10.22C16.1663 9.29186 15.798 8.40159 15.142 7.745L9.173 1.775C8.84797 1.45 8.46211 1.19221 8.03745 1.01634C7.61278 0.840469 7.15764 0.749967 6.698 0.75H4.25C3.32174 0.75 2.4315 1.11875 1.77513 1.77513C1.11875 2.4315 0.75 3.32174 0.75 4.25V15.75C0.75 16.6783 1.11875 17.5685 1.77513 18.2249C2.4315 18.8813 3.32174 19.25 4.25 19.25Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
 
const CertificateViewModal = ({ isOpen, onClose, files = [], onRemoveFile }) => {
  const contentRef = useRef(null);
 
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
 
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={contentRef}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <img src={popupDocIcon} alt="Document" className={styles.headerIcon} />
            <div>
              <h3 className={styles.modalTitle}>Employee Qualification</h3>
              <p className={styles.modalSubtitle}>Uploaded Documents</p>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
 
        {/* Files List */}
        <div className={styles.filesList}>
          {files.length === 0 ? (
            <div className={styles.emptyState}>No files uploaded</div>
          ) : (
            files.map((file, index) => (
              <div key={index} className={styles.fileItem}>
                <div className={styles.fileIconWrapper}>
                  <FileTypeIcon fileName={file.name} />
                </div>
                <span className={styles.fileName}>{file.name}</span>
                <button
                  className={styles.removeButton}
                  onClick={() => {
                    onRemoveFile(index);
                    if (files.length === 1) {
                      onClose();
                    }
                  }}
                  type="button"
                >
                  <img src={closeIcon} alt="Remove" />
                </button>
              </div>
            ))
          )}
        </div>
 
        {/* Footer */}
        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.uploadNowButton} onClick={onClose}>
            Upload Now
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default CertificateViewModal;
 
 
 