import React, { useState, useMemo } from "react";
import EditPopup from "widgets/Popup/EditPopup";
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import styles from "../EmployeeNavOverview/PreviousEmployeeInfoContainer.module.css"
import DocumentsWidget from "widgets/InfoCard/DocumentsWidget";
import PreviousEmpUpdate from "../CoDoUpdatePopup/PreviousEmpUpdate";

// 1. Import the API Hook
import { usePreviousEmpDetails } from "../../../api/do/getpapis/usePreviousEmpQuery";

const PreviousEmployeeInfoContainer = ({ tempId }) => {

    const [showEdit, setShowEdit] = useState(false);
    const [selectedEmpId, setSelectedEmpId] = useState(null);

    // 2. Fetch Data
    const { data, isLoading } = usePreviousEmpDetails(tempId);

    // 3. Map Data (Fixed Mappings)
    const employmentList = useMemo(() => {
        const hasData = Array.isArray(data) && data.length > 0;

        if (hasData) {
            return data.map((emp) => ({
                id: emp.prevEmpId || emp.id, 
                details: [
                    { label: "Company Name", value: emp.companyName || "N/A" },
                    { label: "Designation", value: emp.designation || "N/A" },
                    { label: "From", value: emp.fromDate || "N/A" },
                    { label: "To", value: emp.toDate || "N/A" },
                    { label: "Leaving Reason", value: emp.leavingReason || "N/A" },
                    
                    // 🔴 FIXED: API sends 'companyAddress' (single string)
                    { label: "Company Address", value: emp.companyAddress || "N/A" },
                    
                    // Removed "Address Line 2" since API doesn't send it
                    // { label: "Company Address Line 2", value: "N/A" }, 

                    { label: "Nature Of Duties", value: emp.natureOfDuties || "N/A" },
                    
                    // 🔴 FIXED: API sends 'grossSalaryPerMonth'
                    { label: "Gross Salary per Month", value: emp.grossSalaryPerMonth ? `${emp.grossSalaryPerMonth}` : "N/A" },
                    
                    { label: "CTC", value: emp.ctc ? `${emp.ctc}` : "N/A" }
                ]
            }));
        } else {
            // Default "N/A" View
            return [{
                id: null,
                details: [
                    { label: "Company Name", value: "N/A" },
                    { label: "Designation", value: "N/A" },
                    { label: "From", value: "N/A" },
                    { label: "To", value: "N/A" },
                    { label: "Leaving Reason", value: "N/A" },
                    { label: "Company Address", value: "N/A" },
                    { label: "Nature Of Duties", value: "N/A" },
                    { label: "Gross Salary per Month", value: "N/A" },
                    { label: "CTC", value: "N/A" }
                ]
            }];
        }
    }, [data]);

    const handleEditClick = (id) => {
        setSelectedEmpId(id);
        setShowEdit(true);
    };

    if (isLoading) return <div>Loading Previous Employment Details...</div>;

    return (
        <div className={styles.Previous_Employee_Info_Container}>
            <div className={styles.Previous_Employee_accordians}>
                
                {employmentList.map((emp, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <BankInfoWidget
                            title={`Previous Employment ${index + 1}`}
                            data={emp.details}
                            onEdit={() => handleEditClick(emp.id)}
                        />
                    </div>
                ))}

                <EditPopup
                    isOpen={showEdit}
                    title="Edit Previous Employment"
                    onClose={() => setShowEdit(false)}
                    onSave={() => {
                        console.log("SAVE PREVIOUS EMPLOYMENT ID:", selectedEmpId);
                        setShowEdit(false);
                    }}
                >
                    <PreviousEmpUpdate prevEmpId={selectedEmpId} /> 
                </EditPopup>

            </div>

            <DocumentsWidget
                title="Documents Submitted"
                documents={[
                    {
                        label: "Previous Offer Letter",
                        verified: true,
                        onView: () => console.log("View Offer Letter"),
                    },
                    {
                        label: "Experience Letter",
                        verified: true,
                        onView: () => console.log("View Experience Letter"),
                    },
                    {
                        label: "Relieving Letter",
                        verified: true,
                        onView: () => console.log("View Relieving Letter"),
                    },
                    {
                        label: "Form 16",
                        verified: true,
                        onView: () => console.log("View Form 16"),
                    },
                ]}
            />
        </div>
    );
};

export default PreviousEmployeeInfoContainer;