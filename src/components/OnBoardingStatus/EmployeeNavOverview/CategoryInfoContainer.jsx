import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom"; // 1. Import useParams
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import styles from "../EmployeeNavOverview/CategoryInfoContainer.module.css";
import EditPopup from "widgets/Popup/EditPopup";
import CategoryInfoUpdate from "../CoDoUpdatePopup/CategoryInfoUpdate";

// 2. Import the new hook
import { useCategoryInfo } from "../../../api/do/getpapis/useCategoryInfo";

const CategoryInfoContainer = () => {
    const [showEdit, setShowEdit] = useState(false);

    // 3. Get the Temp ID from URL
    const params = useParams();
    const activeId = params.tempId || params.id || params.employeeId;

    // 4. Fetch Data
    const { data: categoryList = [], isLoading } = useCategoryInfo(activeId);

    // Debugging: Check the exact keys in your console
    useEffect(() => {
        if (categoryList.length > 0) {
            console.log("Category Info API Response:", categoryList[0]);
        }
    }, [categoryList]);

    // 5. Map API Data to Widget Format
    const categoryInfo = useMemo(() => {
        // The API returns a list, usually we take the first active category
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
                onSave={() => {
                    console.log("Save Category Info");
                    setShowEdit(false);
                }}
            >
                {/* Pass data to the update form so it can pre-fill fields */}
                <CategoryInfoUpdate data={categoryList.length > 0 ? categoryList[0] : null} />
            </EditPopup>
        </div>
    );
};

export default CategoryInfoContainer;