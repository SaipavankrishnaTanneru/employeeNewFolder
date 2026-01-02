import Styles from "../EmployeeBasicInformation/EmployeeBasicInfoContent.module.css";
import dividerline from "assets/EmployeeOnBoarding/dividerline.svg";
const EmployeeBasicInfoContent = () => {
    return (
        <div className={Styles.container}>
            <div className={Styles.header}>
                <h3>Basic Info</h3>
<img src={dividerline} alt="divider"  />
            </div>

            <div className={Styles.infoGrid}>
                <div className={Styles.column}>
                    <div className={Styles.item}>
                        <label>Aadhaar No</label>
                        <p className={Styles.value}>0000 0000 0000</p>
                    </div>
                    <div className={Styles.item}>
                        <label>Category</label>
                        <p className={Styles.value}>OC</p>
                    </div>
                    <div className={Styles.item}>
                        <label>Total Experience</label>
                        <p className={Styles.value}>0</p>
                    </div>
                    <div className={Styles.item}>
                        <label>Previous Chaitanya ID</label>
                        <p className={Styles.value}>HYD 08382D</p>
                    </div>
                </div>

                <div className={Styles.column}>
                    <div className={Styles.item}>
                        <label>Aadhaar Enrolment No</label>
                        <p className={Styles.value}>VMPL7189197</p>
                    </div>
                    <div className={Styles.item}>
                        <label>Father Name</label>
                        <p className={Styles.value}>Suresh Raina</p>
                    </div>
                    <div className={Styles.item}>
                        <label>Highest Qualification</label>
                        <p className={Styles.value}>MSC</p>
                    </div>
                </div>

                <div className={Styles.column}>
                    <div className={Styles.item}>
                        <label>PAN Number</label>
                        <p className={Styles.value}>TDPL82726D</p>
                    </div>
                    <div className={Styles.item}>
                        <label>Previous UAN No</label>
                        <p className={Styles.value}>0</p>
                    </div>
                    <div className={Styles.item}>
                        <label>Previous ESI No</label>
                        <p className={Styles.value}>0</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeBasicInfoContent;
