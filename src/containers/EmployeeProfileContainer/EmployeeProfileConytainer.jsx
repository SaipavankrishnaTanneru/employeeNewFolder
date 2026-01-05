import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EmployeeImage from "../../components/EmployeeProfileComponet/EmployeeImage";
import EmployeeProfileMiddle from "../../components/EmployeeProfileComponet/EmployeeProfileMiddle";
import Styles from "./EmployeeProfileContainer.module.css";
// Import your hook
import { useEmployeeProfileView } from "../../api/do/getpapis/useEmployeeProfileView";
const EmployeeProfileConytainer = () => {
    // 1. Get the ID from the URL (e.g., TEMP5370027)
    const params = useParams();
   
    // Fallback logic: Checks for 'tempId' first, then 'id', then 'employeeId'
    // Matches route: path="/profile/:tempId"
    const activeId = params.tempId || params.id || params.employeeId;
    console.log("Active Temp ID detected:", activeId);
    // 2. Fetch Data using the Hook
    const {
        data: apiResponse,
        isLoading,
        isError,
        error
    } = useEmployeeProfileView(activeId);
    // Debugging: Check console to see if API returns data
    useEffect(() => {
        if (apiResponse) {
            console.log("API Response for TempID:", apiResponse);
        }
    }, [apiResponse]);
    if (isLoading) {
        return <div className={Styles.loadingState}>Loading Profile ({activeId})...</div>;
    }
    if (isError || !apiResponse) {
        return (
            <div className={Styles.errorState}>
                {isError ? `Error: ${error.message}` : "No Data Found"}
            </div>
        );
    }
    // 3. Unwrap data (Safety check if backend wraps response in a 'data' object)
    const employeeData = apiResponse.data || apiResponse;
    return (
        <div className={Styles.emp_profile_container}>
            <EmployeeImage data={employeeData} />
            <EmployeeProfileMiddle data={employeeData} />
        </div>
    );
};
export default EmployeeProfileConytainer;