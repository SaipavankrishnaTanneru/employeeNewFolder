import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAuth } from "useAuth"; 
import { postFamilyInfo } from "api/onBoardingForms/postApi/useFamilyQueries";
import { useFamilyInfo } from "api/do/getpapis/useFamilyInfo"; 
import { familyFormSchema } from "utils/OnboardingSchemas";

const memberDefaults = {
  fullName: "",
  adhaarNo: "", // Formik tracks this as a string or number
  isLate: false,
  occupation: "",
  genderId: "",     
  bloodGroupId: "", 
  email: "",
  nationality: "Indian",
  phoneNumber: "",
  relationId: "",   
  dateOfBirth: "",
  isDependent: false,
  isSriChaitanyaEmp: false,
  parentEmpId: "",  
};

export const useFamilyInfoFormik = ({ tempId, onSuccess, dropdownData }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  const { data: familyData } = useFamilyInfo(tempId);
  const [isDataPopulated, setIsDataPopulated] = useState(false);

  useEffect(() => {
    setIsDataPopulated(false);
  }, [tempId]);

  const formik = useFormik({
    initialValues: {
      father: { ...memberDefaults, relationId: 1, genderId: 1 }, 
      mother: { ...memberDefaults, relationId: 2, genderId: 2 }, 
      otherMembers: [], 
      familyGroupPhotoFile: null, 
    },

    validationSchema: familyFormSchema,
    validateOnBlur: true,
    validateOnChange: true,
    
    onSubmit: async (values) => {
      if (!tempId) return alert("Temporary ID is missing.");
      console.log("🚀 Submitting Family Info...", values);

      const getBloodGroupId = (value) => {
        if (!value) return 0;
        if (typeof value === 'number') return value; 
        if (dropdownData?.bloodGroups) {
          const found = dropdownData.bloodGroups.find(
            (bg) => bg.name.toLowerCase() === value.toLowerCase()
          );
          return found ? found.id : 0;
        }
        return 0;
      };

      const sanitizeMember = (member) => {
        // 🗓️ DATE FIX: Ensure valid date before ISO conversion
        let formattedDOB = null;
        if (member.dateOfBirth) {
            const dateObj = new Date(member.dateOfBirth);
            // Check if date is valid (not "Invalid Date")
            if (!isNaN(dateObj.getTime())) {
                formattedDOB = dateObj.toISOString();
            }
        }

        return {
          fullName: member.fullName,
          // 🆔 ADHAAR FIX: Ensure it maps to a number (0 if empty)
          adhaarNo: member.adhaarNo ? Number(member.adhaarNo) : 0,
          isLate: Boolean(member.isLate),
          occupationId: 0, 
          occupation: member.occupation || "",
          genderId: Number(member.genderId) || 0,
          bloodGroupId: getBloodGroupId(member.bloodGroupId),
          email: member.email || "",
          nationality: member.nationality || "Indian",
          phoneNumber: member.phoneNumber ? String(member.phoneNumber) : "",
          relationId: Number(member.relationId) || 0,
          dateOfBirth: formattedDOB, 
          isDependent: Boolean(member.isDependent),
          isSriChaitanyaEmp: Boolean(member.isSriChaitanyaEmp),
          parentEmpId: (member.isSriChaitanyaEmp && member.parentEmpId) ? Number(member.parentEmpId) : 0,
        };
      };

      const allMembers = [];
      if (values.father.fullName) allMembers.push(sanitizeMember(values.father));
      if (values.mother.fullName) allMembers.push(sanitizeMember(values.mother));
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

  const { setValues } = formik;

  useEffect(() => {
    if (!isDataPopulated && familyData && Array.isArray(familyData) && familyData.length > 0 && dropdownData) {
      console.log("✅ Mapping Data...");

      const findBgId = (bgName) => {
         if (!bgName || !dropdownData.bloodGroups) return "";
         const found = dropdownData.bloodGroups.find(b => b.name === bgName);
         return found ? found.id : "";
      };

      const findRelId = (relName) => {
        if (!relName || !dropdownData.emergencyRelations) return "";
        const found = dropdownData.emergencyRelations.find(r => r.name === relName);
        return found ? found.id : "";
      };

      const formatDate = (dateStr) => {
        if (!dateStr) return "";
        // Convert "2026-01-06T..." to "2026-01-06" for Input type="date"
        return dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
      };

      const mapToForm = (apiMem) => ({
        ...memberDefaults,
        fullName: apiMem.name || "",
        email: apiMem.emailId || "",
        phoneNumber: apiMem.phoneNumber || "",
        occupation: apiMem.occupation || "",
        nationality: apiMem.nationality || "Indian",
        adhaarNo: apiMem.adhaarNo || "", // Map back to form
        bloodGroupId: findBgId(apiMem.bloodGroup), 
        dateOfBirth: formatDate(apiMem.dateOfBirth), // Map date back
        isLate: !!apiMem.isLate,
        isSriChaitanyaEmp: !!apiMem.isSriChaitanyaEmp,
        parentEmpId: apiMem.parentEmpId || ""
      });

      const fatherData = familyData.find(m => m.relation === "Father");
      const motherData = familyData.find(m => m.relation === "Mother");
      const otherData = familyData.filter(m => m.relation !== "Father" && m.relation !== "Mother");

      setValues({
        father: fatherData ? { ...mapToForm(fatherData), relationId: 1, genderId: 1 } : { ...memberDefaults, relationId: 1, genderId: 1 },
        mother: motherData ? { ...mapToForm(motherData), relationId: 2, genderId: 2 } : { ...memberDefaults, relationId: 2, genderId: 2 },
        otherMembers: otherData.map(mem => ({ ...mapToForm(mem), relationId: findRelId(mem.relation) })),
        familyGroupPhotoFile: null
      });

      setIsDataPopulated(true);
    }
  }, [familyData, dropdownData, setValues, isDataPopulated]);

  return { formik };
};