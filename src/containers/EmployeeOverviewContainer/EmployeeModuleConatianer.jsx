import React, { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom"; // 1. Import Outlet
import EmployeeNavtabs from "../../components/EmployeeOverViewScreens/EmployeeNavtabs/Employeenavtabs";
import Styles from "../EmployeeModuleConatiner/EmployeeModuleConatiner.module.css";
import EmployeeProfileContainer from "../ProfileOverViewConatiner/EmployeeProfileConytainer";

const EmployeeOverviewHRContainer = () => {
    const { employeeId } = useParams();

    useEffect(() => {
        if (employeeId) {
            console.log("Current Employee Code:", employeeId);
        }
    }, [employeeId]);

    return (
        <div className={Styles.container}>
            {/* Top Profile Card */}
            <EmployeeProfileContainer employeeId={employeeId} />
            
            {/* Navigation Tabs */}
            <EmployeeNavtabs  />

            {/* 2. Content Area - This is where BasicInfo/FamilyInfo renders */}
            <div className={Styles.contentArea}>
                <Outlet />
            </div>
        </div>
    );
};

export default EmployeeOverviewHRContainer;