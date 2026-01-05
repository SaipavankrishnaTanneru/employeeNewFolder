import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import FamilyInfoCard from 'widgets/InfoCard/FamilyInfoCard';
import DocumentsWidget from 'widgets/InfoCard/DocumentsWidget';
import EditPopup from "widgets/Popup/EditPopup";
import FamilyInfoUpdate from "../CoDoUpdatePopup/FamilyInfoUpdate";

// Import the new hook
import { useFamilyInfo } from "../../../api/do/getpapis/useFamilyInfo";

const IconMale = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_850_2465)">
      <path d="M9.375 1C10.4796 1 11.375 1.89544 11.375 3C11.375 4.10456 10.4796 5 9.375 5C8.27044 5 7.375 4.10456 7.375 3C7.375 1.89544 8.27044 1 9.375 1ZM10.875 5.5H10.52C9.81028 5.82634 8.97031 5.84044 8.23 5.5H7.875C7.04656 5.5 6.375 6.17156 6.375 7V11.25C6.375 11.6642 6.71078 12 7.125 12H7.625V16.25C7.625 16.6642 7.96078 17 8.375 17H10.375C10.7892 17 11.125 16.6642 11.125 16.25V12H11.625C12.0392 12 12.375 11.6642 12.375 11.25V7C12.375 6.17156 11.7034 5.5 10.875 5.5Z" fill="#3240DA"/>
    </g>
    <defs>
      <clipPath id="clip0_850_2465">
        <rect width="6.75" height="18" fill="white" transform="translate(6)"/>
      </clipPath>
    </defs>
  </svg>
);

const IconFemale = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.9951 9.79609C14.9951 10.0252 14.9149 10.2199 14.7546 10.3802C14.5943 10.5406 14.3995 10.6207 14.1705 10.6207C13.8784 10.6207 13.6494 10.4976 13.4833 10.2514L11.5334 7.32219H11.1468V8.45606L13.2685 11.9865C13.3201 12.0724 13.3458 12.1669 13.3458 12.27C13.3458 12.4189 13.2914 12.5477 13.1826 12.6565C13.0738 12.7653 12.945 12.8198 12.7961 12.8198H11.1468V15.1562C11.1468 15.4196 11.0523 15.6458 10.8634 15.8348C10.6744 16.0238 10.4482 16.1183 10.1848 16.1183H8.81036C8.54694 16.1183 8.32074 16.0238 8.13176 15.8348C7.94278 15.6458 7.84829 15.4196 7.84829 15.1562V12.8198H6.19902C6.05013 12.8198 5.92128 12.7653 5.81248 12.6565C5.70367 12.5477 5.64927 12.4189 5.64927 12.27C5.64927 12.1669 5.67504 12.0724 5.72658 11.9865L7.84829 8.45606V7.32219H7.46174L5.51183 10.2514C5.34576 10.4976 5.11669 10.6207 4.82463 10.6207C4.59557 10.6207 4.40086 10.5406 4.24052 10.3802C4.08017 10.2199 4 10.0252 4 9.79609C4 9.63002 4.04581 9.47827 4.13744 9.34083L6.33646 6.04229C6.75451 5.42954 7.25845 5.12317 7.84829 5.12317H11.1468C11.7367 5.12317 12.2406 5.42954 12.6587 6.04229L14.8577 9.34083C14.9493 9.47827 14.9951 9.63002 14.9951 9.79609ZM11.4217 2.92415C11.4217 3.45672 11.2342 3.91056 10.8591 4.28565C10.484 4.66074 10.0301 4.84829 9.49756 4.84829C8.96498 4.84829 8.51115 4.66074 8.13605 4.28565C7.76096 3.91056 7.57341 3.45672 7.57341 2.92415C7.57341 2.39157 7.76096 1.93773 8.13605 1.56264C8.51115 1.18755 8.96498 1 9.49756 1C10.0301 1 10.484 1.18755 10.8591 1.56264C11.2342 1.93773 11.4217 2.39157 11.4217 2.92415Z" fill="#902688"/>
  </svg>
);

const FamilyInfoContainer = () => {
  const [showEdit, setShowEdit] = useState(false);
  
  // 1. Get the Temp ID from URL
  const params = useParams();
  const activeId = params.tempId || params.id || params.employeeId;

  // 2. Fetch Data
  const { data: familyList = [], isLoading } = useFamilyInfo(activeId);

  // 3. Helper to transform API object -> Widget format
  const transformData = (person) => {
    if (!person) return [];
    return [
      { label: "Name", value: person.name || "-" },
      { label: "Blood Group", value: person.bloodGroup || "-" },
      { label: "Nationality", value: person.nationality || "-" },
      { label: "Occupation", value: person.occupation || "-" },
      { label: "Email Id", value: person.emailId || "-" },
      { label: "Phone Number", value: person.phoneNumber ? `+91 ${person.phoneNumber}` : "-" },
    ];
  };

  // 4. Split data into Father and Mother based on Relation
  const { fatherData, motherData } = useMemo(() => {
    // Find objects in the array where relation is 'Father' or 'Mother'
    const fatherObj = familyList.find(item => item.relation?.toLowerCase() === "father");
    const motherObj = familyList.find(item => item.relation?.toLowerCase() === "mother");

    return {
      fatherData: transformData(fatherObj),
      motherData: transformData(motherObj)
    };
  }, [familyList]);

  if (isLoading) return <div>Loading Family Info...</div>;

  return (
    <div className="familyInfo">
      <FamilyInfoCard
        title="Family Info"
        fatherData={fatherData}
        motherData={motherData}
        fatherIcon={<IconMale />}
        motherIcon={<IconFemale />}
        onEdit={() => setShowEdit(true)}
      />

      <EditPopup
        isOpen={showEdit}
        title="Edit Family Information"
        onClose={() => setShowEdit(false)}
        onSave={() => {
          console.log("Save Family Info");
          setShowEdit(false);
        }}
      >
        <FamilyInfoUpdate data={familyList} />
      </EditPopup>

      <DocumentsWidget
        title="Photos Uploaded"
        documents={[
          {
            label: "Family photo",
            verified: true,
            onView: () => console.log("View Offer Letter"),
          }
        ]}
      />
    </div>
  );
};

export default FamilyInfoContainer;