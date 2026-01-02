import EmployeeImage from "../../components/EmployeeOverViewScreens/EmployeeProfileComponet/EmployeeImage";
import EmployeeProfileMiddle from "../../components/EmployeeOverViewScreens/EmployeeProfileComponet/EmployeeProfileMiddle";
import EmployeeViewButton from "../../components/EmployeeOverViewScreens/EmployeeProfileComponet/EmployeeViewButton";
import Styles from "../EmployeeProfileContainer/EmployeeProfileContainer.module.css";


const EmployeeProfileContainer = () => {
    return(
        <div className={Styles.emp_profile_container}>
            <EmployeeImage/>
            <EmployeeProfileMiddle/>
            <EmployeeViewButton/>
        </div>
    );
}
export default EmployeeProfileContainer;