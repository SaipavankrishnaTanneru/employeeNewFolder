import Styles from "../EmployeeBasicInformation/EmployeeCurrenInfo.module.css";
import dividerline from "assets/EmployeeOnBoarding/dividerline.svg";
const EmployeeCurrentInfo = () => {
    return (
        <div className={Styles.container}>
            <div className={Styles.header}>
                <h3>Current Info</h3>
                <img src={dividerline} alt="divider"  />

            </div>

            <div className={Styles.infoGrid}>
                <div className={Styles.column}>
                    <div className={Styles.item}>
                        <label>Date Of Joining</label>
                        <p className={Styles.value}>28 June 2023</p>
                    </div>
                    <div className={Styles.item}>
                        <label>Hired By</label>
                        <p className={Styles.value}>Venket Boppana</p>
                    </div>
                </div>

                <div className={Styles.column}>
                    <div className={Styles.item}>
                        <label>Subject</label>
                        <p className={Styles.value}>Chemistry</p>
                    </div>
                    <div className={Styles.item}>
                        <label>Referred By</label>
                        <p className={Styles.value}>Venket Boppana</p>
                    </div>
                </div>

                <div className={Styles.column}>
                    <div className={Styles.item}>
                        <label>Agreed Periods Per Week</label>
                        <p className={Styles.value}>12 Periods</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCurrentInfo;
