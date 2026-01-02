import { useFormik } from "formik";
import { useAuth } from "useAuth"; 
import { postFamilyInfo } from "api/onBoardingForms/postApi/useFamilyQueries";
import * as Yup from "yup"; // Ensure Yup is imported

// --- Defaults ---
const memberDefaults = {
  fullName: "",
  adhaarNo: "",
  isLate: false,
  occupation: "",
  genderId: "",     
  bloodGroupId: "", // This stores the ID or Name temporarily
  email: "",
  nationality: "",
  phoneNumber: "",
  relationId: "",   
  dateOfBirth: "",
  isDependent: false,
  isSriChaitanyaEmp: false,
  parentEmpId: "",  
};

// --- Validation Schema ---
const familySchema = Yup.object().shape({
  father: Yup.object().shape({
    fullName: Yup.string().required("Father's Name is required"),
    // Add other validations as per your story
  }),
  // mother validation etc...
});

export const useFamilyInfoFormik = ({ tempId, onSuccess, dropdownData }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  const formik = useFormik({
    initialValues: {
      father: { ...memberDefaults, relationId: 1, genderId: 1 }, 
      mother: { ...memberDefaults, relationId: 2, genderId: 2 }, 
      otherMembers: [], 
    },
    // validationSchema: familySchema, // Uncomment when ready

    onSubmit: async (values) => {
      if (!tempId) {
        alert("Temporary ID is missing.");
        return;
      }

      console.log("🚀 Submitting Family Info...");

      // --- HELPER: Find ID by Name ---
      const getBloodGroupId = (value) => {
        if (!value) return 0;
        // If value is already a number (ID), return it
        if (typeof value === 'number') return value;
        
        // If value is a string name (e.g., "A+"), find the ID
        if (dropdownData?.bloodGroups) {
          const found = dropdownData.bloodGroups.find(
            (bg) => bg.name.toLowerCase() === value.toLowerCase()
          );
          return found ? found.id : 0;
        }
        return 0;
      };

      // --- DATA TRANSFORMATION ---
      const allMembers = [];

      const sanitizeMember = (member) => {
        let formattedDOB = null;
        if (member.dateOfBirth) {
            try {
               formattedDOB = new Date(member.dateOfBirth).toISOString();
            } catch (e) { formattedDOB = null; }
        }

        return {
          fullName: member.fullName,
          adhaarNo: Number(member.adhaarNo) || 0,
          isLate: Boolean(member.isLate),
          occupationId: 0, 
          occupation: member.occupation || "",
          genderId: Number(member.genderId) || 0,
          
          // 🔴 FIX: MAP NAME TO ID HERE
          bloodGroupId: getBloodGroupId(member.bloodGroupId),
          
          email: member.email || "",
          nationality: member.nationality || "Indian",
          phoneNumber: member.phoneNumber || "",
          relationId: Number(member.relationId) || 0,
          dateOfBirth: formattedDOB, 
          isDependent: Boolean(member.isDependent),
          isSriChaitanyaEmp: Boolean(member.isSriChaitanyaEmp),
          parentEmpId: (member.isSriChaitanyaEmp && member.parentEmpId) 
              ? Number(member.parentEmpId) 
              : 0,
        };
      };

      // Push Father
      if (values.father.fullName) allMembers.push(sanitizeMember(values.father));
      
      // Push Mother
      if (values.mother.fullName) allMembers.push(sanitizeMember(values.mother));

      // Push Others
      values.otherMembers.forEach((mem) => {
        if (mem.fullName) allMembers.push(sanitizeMember(mem));
      });

      const apiPayload = {
        familyMembers: allMembers,
        familyGroupPhotoPath: "string", 
        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId,
      };

      try {
        const response = await postFamilyInfo(tempId, apiPayload);
        console.log("✅ Family Info Saved:", response);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("❌ Failed to save family info:", error);
      }
    },
  });

  return { formik };
};