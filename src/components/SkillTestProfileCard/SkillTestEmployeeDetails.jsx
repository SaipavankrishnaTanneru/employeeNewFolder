import BankInfoWidget from "widgets/InfoCard/SkillInfoWidget";
import styles from "../SkillTestProfileCard/SkillTestEmployeeDetails.module.css";

const SkillTestEmployeeDetails = () => {

    const salaryAccountInfo = [
        { label: "Payroll Id", value: "TEMP0288" },
        { label: "Name", value: "Full Name" },
        { label: "Subject", value: "Botany" },
        { label: "Exam Date", value: "12-09-2023" },
        { label: "No Of Questions", value: "30" },
    ];

    return (
        <div className={styles.body}>
            <BankInfoWidget title="Test Marks " data={salaryAccountInfo} />

            <div className={styles.statsContainer}>
                <div className={`${styles.statCard} ${styles.attempted}`}>
                    <p className={styles.label}>Attempted</p>
                    <p className={styles.value}>0</p>
                </div>
                <div className={`${styles.statCard} ${styles.unattempted}`}>
                    <p className={styles.label}>Un Attempted</p>
                    <p className={styles.value}>0</p>
                </div>
                <div className={`${styles.statCard} ${styles.wrong}`}>
                    <p className={styles.label}>Wrong</p>
                    <p className={styles.value}>0</p>
                </div>
                <div className={`${styles.statCard} ${styles.total}`}>
                    <p className={styles.label}>Total Marks</p>
                    <p className={styles.value}>0.0</p>
                </div>
            </div>
        </div>
    );
};

export default SkillTestEmployeeDetails;