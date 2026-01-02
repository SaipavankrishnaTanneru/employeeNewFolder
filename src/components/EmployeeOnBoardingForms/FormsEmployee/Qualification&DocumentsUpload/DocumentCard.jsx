import React from 'react';
import styles from '../Qualification&DocumentsUpload/css/UploadDocumentsForm.module.css';

// 1. Import your icons as components
import { ReactComponent as DocIcon } from 'assets/Qualification/DocIcon.svg';
import { ReactComponent as CardBackground } from 'assets/Qualification/BackgroundCard.svg';
import { ReactComponent as UploadIcon } from 'assets/Qualification/UploadCard.svg';

// --- Placeholder Icons ---
const CheckIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const CloseIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const DocumentCard = ({ doc, onFileChange }) => {
  return (
    <div className={styles.card}>
      {/* 2. Place the background SVG here, as a sibling to the content */}
      <CardBackground className={styles.backgroundSvg} />

      <div className={styles.cardHeader}>
        <DocIcon />
        <h3 className={styles.cardTitle}>{doc.title}</h3>
      </div>

      {/* This div now acts as a flexible spacer */}
      <div className={styles.cardBody}></div>

      <div className={styles.cardFooter}>
        {!doc.file ? (
          <>
            <input
              type="file"
              id={`file-upload-${doc.id}`}
              hidden
              onChange={(e) => onFileChange(doc.id, e.target.files[0])}
            />
            <label htmlFor={`file-upload-${doc.id}`} className={styles.uploadButton}>
              <UploadIcon /> Upload
            </label>
          </>
        ) : (
          <div className={styles.fileInfo}>
            <span className={styles.fileName}><CheckIcon /> {doc.file.name}</span>
            <button
              className={styles.removeButton}
              onClick={() => onFileChange(doc.id, null)}
            >
              <CloseIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;