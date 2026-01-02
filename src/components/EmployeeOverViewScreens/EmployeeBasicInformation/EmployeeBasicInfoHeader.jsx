import Styles from "../EmployeeBasicInformation/EmployeeBasicInfoHeader.module.css";
import BasicInfoIcon from "assets/BasicInfoIcons/BasicInfoIcon.svg";

const BasicInfoHeader = () => {
    return (
        <div className={Styles.container}>
            <div className={Styles.icon}>
                <img src={BasicInfoIcon} alt="BasicInfoIcon" />
            </div>
            <div className={Styles.text}>
                <h2>Employee Basic Information</h2>
                <p>Get All The Analytics And Growth Rate Of Applications</p>
            </div>
        </div>
    );
}

export default BasicInfoHeader;
