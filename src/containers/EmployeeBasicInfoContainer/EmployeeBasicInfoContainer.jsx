import Styles from "../EmployeeBasicInfoContainer/EmployeeBasicInfoContainer.module.css";
import BasicInfoHeader from "../../components/EmployeeOverViewScreens/EmployeeBasicInformation/EmployeeBasicInfoHeader";
import EmployeeBasicInfoContent from "../../components/EmployeeOverViewScreens/EmployeeBasicInformation/EmployeeBasicInfoContent";
import EmployeeCurrentInfo from "../../components/EmployeeOverViewScreens/EmployeeBasicInformation/EmployeeCurrentInfo";

const EmployeeBasicInfoContainer = () => {
    return(
        <div className={Styles.container}>
            <BasicInfoHeader/>
            <div className={Styles.content}>
            <EmployeeBasicInfoContent/>
            <EmployeeCurrentInfo/>
            </div>
        </div>
    );
}
export default EmployeeBasicInfoContainer;