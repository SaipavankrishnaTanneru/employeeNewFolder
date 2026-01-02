import styles from "./ApplicationSaleAndConfTopSec.module.css";
import backArrow from '../../assets/application-status/school-sale-conf-assets/backArrow.svg'; 

const ApplicationSaleAndConfTopSec = ({ step = 1, onBack, title, detailsObject }) => {
 
  const handleBackClick = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className={styles.headerWrapper}>
      {/* LEFT BLOCK */}
      <div className={styles.leftBlock}>
        <img 
          src={backArrow} 
          alt="back" 
          className={styles.backIcon} 
          onClick={handleBackClick}
          style={{ cursor: onBack ? 'pointer' : 'default' }}
        />
        <div>
          <h2 className={styles.title}>{title}</h2>

          <div className={styles.stepContainer}>
            <span className={styles.stepLabel}>Step:</span>
            <span className={styles.stepNumber}>{step}</span>
          </div>

          <div className={styles.progressBar}>
            <div className={`${styles.segment} ${step >= 1 ? styles.segmentActive : ''}`}></div>
            <div className={`${styles.segment} ${step >= 2 ? styles.segmentActive : ''}`}></div>
            <div className={`${styles.segment} ${step >= 3 ? styles.segmentActive : ''}`}></div>
          </div>
        </div>
      </div>

      {/* RIGHT BLOCK */}
      <div className={styles.rightBlock}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Academic Year</span>
          <span className={styles.value}>{detailsObject?.academicYear || '0000-0000'}</span>
        </div>
{/* 
        <div className={styles.infoItem}>
          <span className={styles.label}>Academic Year ID</span>
          <span className={styles.value}>{detailsObject?.academicYearId || '-'}</span>
        </div> */}

        <div className={styles.infoItem}>
          <span className={styles.label}>Application No</span>
          <span className={styles.value}>{detailsObject?.applicationNo || '000000'}</span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Branch</span>
          <span className={styles.value}>{detailsObject?.branch || '-'}</span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Zone</span>
          <span className={styles.value}>{detailsObject?.zone || '-'}</span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Application Fee</span>
          <span className={styles.value}>{detailsObject?.applicationFee || '-'}</span>
        </div>
      </div>
    </div>
  );
}


export default ApplicationSaleAndConfTopSec;
