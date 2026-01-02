import EmpQualificationDetails from "../../components/EmployeeOverViewScreens/EmpQualificationDetails/EmpQualificationDetails"
import EmployeeQualificationRightside from "../../components/EmployeeOverViewScreens/EmployeeQualificationDetails/EmployeeQualificationRightside";
import styles from "../EmployeeQualificationDetails/EmployeeQualificationDetailsContainer.module.css";

const EmployeeQualificationDetailsContainer = () => {
    return (
        <div className={styles.EmployeeQualificationDetailsContainer}>
            <EmpQualificationDetails/>
            <EmployeeQualificationRightside/>
            
        </div>
    );
};
export default EmployeeQualificationDetailsContainer;