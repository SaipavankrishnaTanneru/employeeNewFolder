import SkillTestEmployeeDetails from "../../components/SkillTestProfileCard/SkillTestEmployeeDetails";
import SkillEmployeeImage from "../../containers/SkillTestProfileContainer/SkillEmployeeImage/SkillEmployeeImage";
import SkillEmployeeProfileMiddle from "../../containers/SkillTestProfileContainer/SkillEmployeeImage/SkillEmployeeProfileMiddle";
// import EmployeeViewButton from "../../components/EmployeeProfileComponet/EmployeeViewButton";
import Styles from "../SkillTestProfileContainer/SkillTestProfileContainer.module.css";


const SkillTestProfileContainer = () => {
    return (
        <div className={Styles.emp_outlayout}>
            <div className={Styles.emp_profile_container}>
                <SkillEmployeeImage />
                <SkillEmployeeProfileMiddle />
            </div>
            <div className={Styles.emp_details_container}>
                <SkillTestEmployeeDetails />
            </div>
        </div>
    );
}
export default SkillTestProfileContainer;