import styles from "./EmpSchoolInfo.module.css";
import certificate_download_icon from "assets/EmployeeQu/certificate_download_icon.svg";
import pdf_icon from "assets/EmployeeQu/pdf_icon.svg";

const EmpSchoolInfo = () => {
  return (
    <div className={styles.empSchoolInfoNavContent}>
      <div className={styles.bachelorsYear_Spec}>
        <div className={styles.bachelors_year}>
          <p className={styles.bachelors_heading}>Passed Out Year</p>
          <p className={styles.bachelors_value}>2017</p>
        </div>
        <div className={styles.bachelors_spec}>
          <p className={styles.bachelors_heading}>Specification</p>
          <p className={styles.bachelors_value}>MPC</p>
        </div>
        <div className={styles.bachelors_school}>
          <p className={styles.bachelors_heading}>School Name</p>
          <p className={styles.bachelors_value} title="Sri Chaitanya School">
            Sri Chaitanya School
          </p>
        </div>
      </div>
      <div className={styles.bachelorsSchool_Board_Cer}>
        <div className={styles.bachelors_board}>
          <p className={styles.bachelors_heading}>Board</p>
          <p className={styles.bachelors_value} title="SSC">
            SSC
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

export default EmpSchoolInfo;
