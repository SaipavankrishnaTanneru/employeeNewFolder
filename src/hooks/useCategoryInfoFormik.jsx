import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import * as Yup from "yup";
import { useAuth } from "useAuth"; 
import { 
  postCategoryInfo,
  useEmployeeTypes,
  useDepartmentsByType,
  useDesignationsByDept,
  useSubjects,
  useOrientations
} from "api/onBoardingForms/postApi/useCategoryQueries";
import { useCategoryInfo } from "api/do/getpapis/useCategoryInfo"; 

const initialValues = {
  employeeTypeId: "",
  departmentId: "",
  designationId: "",
  subjectId: "",
  orientationId: "",
  agreedPeriodsPerWeek: "",
};

export const useCategoryInfoFormik = ({ tempId, existingData, onSuccess }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  // 1. Dropdowns Data
  const { data: employeeTypes = [] } = useEmployeeTypes();
  const { data: subjects = [] } = useSubjects();
  const { data: orientations = [] } = useOrientations();

  // 2. Identify IDs dynamically
  const { teachTypeId, nonTeachTypeId } = useMemo(() => {
    const lower = (name) => String(name).toLowerCase();
    const teach = employeeTypes.find(t => lower(t.name).includes("teach") && !lower(t.name).includes("non"));
    const nonTeach = employeeTypes.find(t => lower(t.name).includes("non")); 

    return {
      teachTypeId: teach ? String(teach.id) : null,
      nonTeachTypeId: nonTeach ? String(nonTeach.id) : null
    };
  }, [employeeTypes]);

  // 3. Dynamic Validation Schema
  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      employeeTypeId: Yup.string().required("Employee Type is required"),
      departmentId: Yup.string().required("Department is required"),
      designationId: Yup.string().required("Designation is required"),
      
      // CONDITIONAL: Orientation hidden for Non-Teach
      orientationId: Yup.string().when("employeeTypeId", {
        is: (val) => val && String(val) === nonTeachTypeId,
        then: () => Yup.string().nullable().notRequired(),
        otherwise: () => Yup.string().required("Orientation is required"),
      }),
      
      // CONDITIONAL: Subject hidden for Non-Teach (Usually required for Teach)
      subjectId: Yup.string().when("employeeTypeId", {
        is: (val) => val && String(val) === teachTypeId, 
        then: () => Yup.string().required("Subject is required"),
        otherwise: () => Yup.string().nullable(),
      }),

      // 🔴 UPDATE: Periods is now MANDATORY for EVERYONE (Both Teach & Non-Teach)
      agreedPeriodsPerWeek: Yup.number()
        .typeError("Must be a number")
        .required("Agreed Periods are required"),
    });
  }, [teachTypeId, nonTeachTypeId]);

  // 4. Formik Setup
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    enableReinitialize: true, 
    onSubmit: async (values) => {
      if (!tempId) { alert("Temporary ID is missing."); return; }

      const payload = {
        employeeTypeId: Number(values.employeeTypeId) || 0,
        departmentId: Number(values.departmentId) || 0,
        designationId: Number(values.designationId) || 0,
        subjectId: Number(values.subjectId) || 0,
        orientationId: Number(values.orientationId) || 0,
        agreedPeriodsPerWeek: Number(values.agreedPeriodsPerWeek) || 0,
        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId,
      };

      try {
        await postCategoryInfo(tempId, payload);
        if (onSuccess) onSuccess(); 
      } catch (error) {
        console.error("❌ Failed to save category info:", error);
      }
    },
  });

  const { values, setValues, setFieldValue } = formik;

  // 5. Cascading Dropdowns
  const { data: departments = [] } = useDepartmentsByType(values?.employeeTypeId);
  const { data: designations = [] } = useDesignationsByDept(values?.departmentId);
  const { data: fetchedData = [] } = useCategoryInfo(existingData ? null : tempId);
  const activeData = existingData || (fetchedData.length > 0 ? fetchedData[0] : null);

  // Mapping Logic
  useEffect(() => {
    if (activeData && employeeTypes.length > 0) {
      const findId = (name, list) => list?.find(item => item.name?.toLowerCase() === String(name).toLowerCase())?.id || "";

      setValues({
        ...initialValues,
        employeeTypeId: findId(activeData.employeeType || activeData.empType, employeeTypes),
        subjectId: findId(activeData.subject || activeData.subjectName, subjects),
        orientationId: findId(activeData.orientation || activeData.programName, orientations),
        agreedPeriodsPerWeek: activeData.agreedPeriodsPerWeek || activeData.agreedPeriods || "",
        departmentId: "", 
        designationId: "" 
      });
    }
  }, [activeData, employeeTypes, subjects, orientations, setValues]);

  useEffect(() => {
    if (activeData) {
        const deptName = activeData.department || activeData.departmentName;
        const desigName = activeData.designation || activeData.designationName;

        if (departments.length > 0 && !values.departmentId && deptName) {
            const found = departments.find(d => d.name?.toLowerCase() === deptName.toLowerCase());
            if (found) setFieldValue("departmentId", found.id);
        }

        if (designations.length > 0 && !values.designationId && desigName) {
            const found = designations.find(d => d.name?.toLowerCase() === desigName.toLowerCase());
            if (found) setFieldValue("designationId", found.id);
        }
    }
  }, [activeData, departments, designations, values.departmentId, values.designationId, setFieldValue]);

  return {
    formik,
    values, 
    setFieldValue,
    submitForm: formik.submitForm,
    dropdowns: { employeeTypes, departments, designations, subjects, orientations },
    isTeachSelected: String(values.employeeTypeId) === teachTypeId,
    isNonTeachSelected: String(values.employeeTypeId) === nonTeachTypeId 
  };
};