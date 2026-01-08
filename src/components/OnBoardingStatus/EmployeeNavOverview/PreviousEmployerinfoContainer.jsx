import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom"; // 1. Import useParams
import EditPopup from "widgets/Popup/EditPopup";
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import styles from "../EmployeeNavOverview/PreviousEmployeeInfoContainer.module.css"
import DocumentsWidget from "widgets/InfoCard/DocumentsWidget";
import PreviousEmpUpdate from "../CoDoUpdatePopup/PreviousEmpUpdate";

// Import API Hook
import { usePreviousEmpDetails } from "api/do/getpapis/usePreviousEmpQuery";

const PreviousEmployeeInfoContainer = ({ tempId }) => {
    // 2. Fallback: If tempId prop is missing, grab it from the URL
    const { employeeId } = useParams();
    const activeId = tempId || employeeId;

    const [showEdit, setShowEdit] = useState(false);
    const [selectedEmpId, setSelectedEmpId] = useState(null);

    // 3. Use activeId for the fetch
    const { data, isLoading } = usePreviousEmpDetails(activeId);

    // 🔴 DEBUG LOGS (This should now show the ID)
    console.log("1. Active ID:", activeId);
    console.log("2. Raw API Data:", data);

    const employmentList = useMemo(() => {
        let empArray = [];
        
        // Robust extraction logic
        if (Array.isArray(data)) {
            empArray = data;
        } else if (data && Array.isArray(data.data)) {
            empArray = data.data;
        } else if (data && Array.isArray(data.result)) {
            empArray = data.result;
        }

        if (empArray.length > 0) {
            return empArray.map((emp, index) => ({
                id: emp.prevEmpId || emp.id || `emp-${index}`, 
                details: [
                    { label: "Company Name", value: emp.companyName || "N/A" },
                    { label: "Designation", value: emp.designation || "N/A" },
                    { label: "From", value: emp.fromDate ? new Date(emp.fromDate).toLocaleDateString() : "N/A" },
                    { label: "To", value: emp.toDate ? new Date(emp.toDate).toLocaleDateString() : "N/A" },
                    { label: "Leaving Reason", value: emp.leavingReason || "N/A" },
                    { label: "Company Address", value: emp.companyAddress || "N/A" },
                    { label: "Nature Of Duties", value: emp.natureOfDuties || "N/A" },
                    { label: "Gross Salary", value: emp.grossSalaryPerMonth ? `${emp.grossSalaryPerMonth}` : "N/A" },
                    { label: "CTC", value: emp.ctc ? `${emp.ctc}` : "N/A" }
                ]
            }));
        } else {
            return []; 
        }
    }, [data]);

    const handleEditClick = (id) => {
        setSelectedEmpId(id);
        setShowEdit(true);
    };

    if (isLoading) return <div>Loading Previous Employment Details...</div>;

    if (!activeId) return <div className={styles.error}>Error: Employee ID is missing.</div>;

    return (
        <div className={styles.Previous_Employee_Info_Container}>
            <div className={styles.Previous_Employee_accordians}>
                
                {employmentList.length > 0 ? (
                    employmentList.map((emp, index) => (
                        <div key={index} style={{ marginBottom: "20px" }}>
                            <BankInfoWidget
                                title={`Previous Employment ${index + 1}`}
                                data={emp.details}
                                onEdit={() => handleEditClick(emp.id)}
                            />
                        </div>
                    ))
                ) : (
                    <div className={styles.noData}>No Previous Employment Details Found.</div>
                )}

                <EditPopup
                    isOpen={showEdit}
                    title="Edit Previous Employment"
                    onClose={() => setShowEdit(false)}
                    onSave={() => setShowEdit(false)} 
                >
                    <PreviousEmpUpdate 
                        tempId={activeId} 
                        prevEmpId={selectedEmpId} 
                        onSuccess={() => setShowEdit(false)} 
                    /> 
                </EditPopup>

            </div>

            <DocumentsWidget
                title="Documents Submitted"
                documents={[
                    { label: "Previous Offer Letter", verified: true, onView: () => {} },
                    { label: "Experience Letter", verified: true, onView: () => {} },
                    { label: "Relieving Letter", verified: true, onView: () => {} },
                    { label: "Form 16", verified: true, onView: () => {} },
                ]}
            />
        </div>
    );
};

export default PreviousEmployeeInfoContainer;