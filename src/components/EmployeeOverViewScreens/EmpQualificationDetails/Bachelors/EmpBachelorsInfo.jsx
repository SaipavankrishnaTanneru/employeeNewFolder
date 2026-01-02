import styles from "./EmpBachelorsInfo.module.css";
import certificate_download_icon from "assets/EmployeeQu/certificate_download_icon.svg";
import pdf_icon from "assets/EmployeeQu/pdf_icon.svg";

const EmpBachelorsInfo = () => {
  return (
    <div className={styles.empBachelorsInfoNavContent}>
      <div className={styles.bachelorsYear_Spec}>
        <div className={styles.bachelors_year}>
          <p className={styles.bachelors_heading}>Passed Out Year</p>
          <p className={styles.bachelors_value}>2023</p>
        </div>
        <div className={styles.bachelors_spec}>
          <p className={styles.bachelors_heading}>Specification</p>
          <p className={styles.bachelors_value} title="Electronics And Communication Engineering">
            Electronics And Communication Engineering
          </p>
        </div>
      </div>
      <div className={styles.bachelorsInstitute_Uni_Cer}>
        <div className={styles.bachelors_institute}>
          <p className={styles.bachelors_heading}>Institute</p>
          <p
            className={styles.bachelors_value}
            title="Guru Nanak Institute of Technology"
          >
            Guru Nanak Institute of Technology
          </p>
        </div>
        <div className={styles.bachelors_uni}>
          <p className={styles.bachelors_heading}>University</p>
          <p className={styles.bachelors_value} title="JNTUH">JNTUH</p>
        </div>
        <div className={styles.bachelors_certificates}>
          <p className={styles.bachelors_heading}>Certificates</p>
          <div className={styles.icons}>
            <figure>
            <img src={pdf_icon} alt="pdf_icon"/>
          </figure>
          <figure>
            <img src={certificate_download_icon} alt="certificate_download_icon"/>
          </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpBachelorsInfo;
