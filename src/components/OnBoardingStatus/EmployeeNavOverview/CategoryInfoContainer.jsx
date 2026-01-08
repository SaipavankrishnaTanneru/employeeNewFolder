import React, { useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import styles from "../EmployeeNavOverview/CategoryInfoContainer.module.css";
import EditPopup from "widgets/Popup/EditPopup";
import CategoryInfoUpdate from "../CoDoUpdatePopup/CategoryInfoUpdate";
import { useCategoryInfo } from "../../../api/do/getpapis/useCategoryInfo";

const CategoryInfoContainer = () => {
    const [showEdit, setShowEdit] = useState(false);
    
    // 1. Create Remote Control for Save Button
    const saveRef = useRef(null);

    const params = useParams();
    // 2. Robust ID Calculation (handles different URL patterns)
    const activeId = params.tempId || params.id || params.employeeId;

    const { data: categoryList = [], isLoading, refetch } = useCategoryInfo(activeId);

    const categoryInfo = useMemo(() => {
        const data = categoryList.length > 0 ? categoryList[0] : {};
        return [
            { label: "Employee Type", value: data.empType || data.employeeType || "N/A" },
            { label: "Department", value: data.departmentName || data.department || "N/A" },
            { label: "Designation", value: data.designationName || data.designation || "N/A" },
            { label: "Subject", value: data.subjectName || data.subject || "N/A" },
            { label: "Agreed Periods Per Week", value: data.agreedPeriods ? `${data.agreedPeriods} Periods` : "N/A"},
            { label: "Orientation", value: data.orientation || data.programName || "N/A" }
        ];
    }, [categoryList]);

    if (isLoading) return <div>Loading Category Info...</div>;

    return (
        <div className={styles.category_Info_Container}>
            <div className={styles.category_accordians}>
                <BankInfoWidget 
                    title="Category Info" 
                    data={categoryInfo} 
                    onEdit={() => setShowEdit(true)}
                />
            </div>
            
            <EditPopup
                isOpen={showEdit}
                title="Edit Category Information"
                onClose={() => setShowEdit(false)}
                // 3. Trigger the Save via Ref
                onSave={() => {
                    console.log("🖱️ Save Button Clicked");
                    if (saveRef.current) {
                        saveRef.current(); 
                    }
                }}
            >
                {/* 4. Pass 'activeId' and 'saveRef' down */}
                <CategoryInfoUpdate 
                    activeId={activeId} 
                    data={categoryList.length > 0 ? categoryList[0] : null} 
                    onSaveRef={saveRef}
                    onSuccess={() => {
                        console.log("✅ Update Successful! Closing popup...");
                        setShowEdit(false);
                        refetch(); // Refresh data on screen
                    }}
                />
            </EditPopup>
        </div>
    );
};

export default CategoryInfoContainer;