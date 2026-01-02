import styles from "./EmpIntermediateInfo.module.css";
import certificate_download_icon from "assets/EmployeeQu/certificate_download_icon.svg";
import pdf_icon from "assets/EmployeeQu/pdf_icon.svg";

const EmpIntermediateInfo = () => {
  return (
    <div className={styles.empIntermediateInfoNavContent}>
      <div className={styles.bachelorsYear_Spec}>
        <div className={styles.bachelors_year}>
          <p className={styles.bachelors_heading}>Passed Out Year</p>
          <p className={styles.bachelors_value}>2019</p>
        </div>
        <div className={styles.bachelors_spec}>
          <p className={styles.bachelors_heading}>Specification</p>
          <p className={styles.bachelors_value}>MPC</p>
        </div>
        <div className={styles.bachelors_college}>
          <p className={styles.bachelors_heading}>College Name</p>
          <p className={styles.bachelors_value} title="Sri Chaitanya College">
            Sri Chaitanya College
          </p>
        </div>
      </div>
      <div className={styles.bachelorsCollege_Board_Cer}>
        <div className={styles.bachelors_board}>
          <p className={styles.bachelors_heading}>Board</p>
          <p className={styles.bachelors_value} title="TSBIE">
            TSBIE
          </p>
        </div>
        <div className={styles.bachelors_certificates}>
          <p className={styles.bachelors_heading}>Certificates</p>
          <div className={styles.icons}>
            <figure>
              <img src={pdf_icon} alt="pdf_icon" />
            </figure>
            <figure>
              <img
                src={certificate_download_icon}
                alt="certificate_download_icon"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpIntermediateInfo;
