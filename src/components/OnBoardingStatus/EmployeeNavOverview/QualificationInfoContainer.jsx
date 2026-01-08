import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import EditPopup from "widgets/Popup/EditPopup";
import styles from "../EmployeeNavOverview/QualificationInfoContainer.module.css"; 
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import DocumentsWidget from "widgets/InfoCard/DocumentsWidget";
import QualificationUpdate from "../CoDoUpdatePopup/QualificationUpdate";

// API Hook
import { useQualificationDetails } from "api/onBoardingForms/postApi/useQualificationQueries";

const QualificationInfoContainer = ({ activeId }) => {
  const { employeeId } = useParams();
  const tempId = activeId || employeeId; 

  const [showEdit, setShowEdit] = useState(false);
  const [selectedQualId, setSelectedQualId] = useState(null); // 1. Track Selected ID

  // Fetch Data
  const { data = [], isLoading } = useQualificationDetails(tempId);

  const qualificationList = useMemo(() => {
    let list = [];
    if (Array.isArray(data)) list = data;
    else if (data?.qualifications && Array.isArray(data.qualifications)) list = data.qualifications;
    
    if (list.length > 0) {
        return list.map(q => ({
            id: q.qualificationId || q.id,
            details: [
                { label: "Qualification", value: q.qualificationName || q.qualification || "N/A" },
                { label: "Degree", value: q.qualificationDegreeName || q.degree || "N/A" },
                { label: "Specialisation", value: q.specialization || "N/A" },
                { label: "University", value: q.university || "N/A" },
                { label: "Institute", value: q.institute || "N/A" },
                { label: "Passed Out Year", value: q.passedOutYear ? String(q.passedOutYear) : "N/A" },
            ]
        }));
    }
    return [];
  }, [data]);

  // 2. Handle Edit Click
  const handleEditClick = (id) => {
      console.log("Editing Qualification ID:", id);
      setSelectedQualId(id);
      setShowEdit(true);
  };

  if (isLoading) return <div>Loading Qualifications...</div>;

  return (
    <div className={styles.qualification_Info_Container}>
      <div className={styles.qualification_accordians}>
        
        {qualificationList.length > 0 ? (
            qualificationList.map((qual, index) => (
                <div key={index} style={{marginBottom: "20px"}}>
                    <BankInfoWidget
                      title={`Qualification ${index + 1}`}
                      data={qual.details}
                      onEdit={() => handleEditClick(qual.id)} // Pass ID here
                    />
                </div>
            ))
        ) : (
            <div className={styles.noData}>No Qualification Details Found.</div>
        )}

        <EditPopup
          isOpen={showEdit}
          title="Edit Qualification Details"
          onClose={() => setShowEdit(false)}
          onSave={() => setShowEdit(false)} 
        >
          {/* 3. Pass selectedQualId to the Popup */}
          <QualificationUpdate 
             tempId={tempId} 
             selectedQualId={selectedQualId}
             onSuccess={() => setShowEdit(false)}
          />
        </EditPopup>

        <DocumentsWidget
            title="Certificates Submitted"
            documents={[
              { label: "10th Class Certificate", verified: true, onView: () => {} },
              { label: "Intermediate Certificate", verified: true, onView: () => {} },
              { label: "Degree Certificate", verified: true, onView: () => {} },
            ]}
        />
      </div>
    </div>
  );
};

export default QualificationInfoContainer;