import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_8080 = "http://localhost:8080/api/employeeModule";
const EMP_8080 = "http://localhost:8080/api/employee/onboarding";
const API_9000 = "http://localhost:9000/common/get";
const API_BASE = "http://localhost:8080/api/employee"; // New Base

/* ---------------- HELPERS & DROPDOWN QUERIES (Keep existing code here) ---------------- */
const safeArray = (data) => (Array.isArray(data) ? data : []);

export const useEmployeeFormQueries = (campusId = null, buildingId = null) => {
  // ... (Keep all your existing dropdown queries exactly as they are)
  // I am hiding them here for brevity, but DO NOT DELETE THEM in your file.
  const bloodGroupsQ = useQuery({ queryKey: ["bloodGroups"], queryFn: () => axios.get(`${API_9000}/BloodGroup/all`).then((r) => r.data) });
  const gendersQ = useQuery({ queryKey: ["genders"], queryFn: () => axios.get(`${API_9000}/genders`).then((r) => r.data) });
  const castesQ = useQuery({ queryKey: ["castes"], queryFn: () => axios.get(`${API_9000}/castes`).then((r) => r.data) });
  const hiringModesQ = useQuery({ queryKey: ["hiringModes"], queryFn: () => axios.get(`${API_8080}/mode-of-hiring`).then((r) => r.data) });
  const categoriesQ = useQuery({ queryKey: ["categories"], queryFn: () => axios.get(`${API_8080}/categories/active`).then((r) => r.data) });
  const maritalStatusQ = useQuery({ queryKey: ["maritalStatus"], queryFn: () => axios.get(`${API_8080}/marital-status`).then((r) => r.data) });
  const qualificationsQ = useQuery({ queryKey: ["qualifications"], queryFn: () => axios.get(`${API_8080}/qualifications`).then((r) => r.data) });
  const campusesQ = useQuery({ queryKey: ["campuses"], queryFn: () => axios.get(`${API_8080}/campuses/active`).then((r) => r.data) });
  const workModesQ = useQuery({ queryKey: ["workModes"], queryFn: () => axios.get(`${API_8080}/work-mode`).then((r) => r.data) });
  const religionsQ = useQuery({ queryKey: ["religions"], queryFn: () => axios.get(`${API_9000}/religions`).then((r) => r.data) });
  const relationsQ = useQuery({ queryKey: ["emergencyRelations"], queryFn: () => axios.get(`${API_8080}/getAll/Relations`).then((r) => r.data) });
  const joinTypesQ = useQuery({ queryKey: ["joinTypes"], queryFn: () => axios.get(`${API_8080}/joining-as`).then((r) => r.data) });
  const employeesQ = useQuery({ queryKey: ["employees"], queryFn: () => axios.get(`${API_8080}/employees/active`).then((r) => r.data) });
  
  const buildingsQ = useQuery({
    queryKey: ["buildings", Number(campusId)],
    queryFn: () => axios.get(`${API_8080}/${Number(campusId)}/building`).then((r) => r.data),
    enabled: Number(campusId) > 0,
  });

  const campusDetailsQ = useQuery({
    queryKey: ["campusDetails", Number(campusId)],
    queryFn: async () => {
      const { data } = await axios.get(`${API_8080}/campusDetl/${Number(campusId)}`);
      return {
        campusCode: data.campusCode || "",
        campusType: data.campusType || "",
        location: data.cityName || data.city || "",
      };
    },
    enabled: Number(campusId) > 0,
  });

  const buildingDetailsQ = useQuery({
    queryKey: ["buildingDetails", Number(campusId), Number(buildingId)],
    queryFn: async () => {
      const { data } = await axios.get(`${API_8080}/campus/building/details/${Number(campusId)}/${Number(buildingId)}`);
      return {
        deanName: data?.find((d) => d.degination?.toUpperCase() === "DEAN")?.name || "",
        agmName: data?.find((d) => d.degination?.toUpperCase() === "ASST GENERAL MANAGER")?.name || "",
      };
    },
    enabled: Number(campusId) > 0 && Number(buildingId) > 0,
  });

  return {
    dropdowns: {
      bloodGroups: safeArray(bloodGroupsQ.data),
      genders: safeArray(gendersQ.data),
      castes: safeArray(castesQ.data),
      hiringModes: safeArray(hiringModesQ.data),
      categories: safeArray(categoriesQ.data),
      maritalStatus: safeArray(maritalStatusQ.data),
      qualifications: safeArray(qualificationsQ.data),
      religions: safeArray(religionsQ.data),
      emergencyRelations: safeArray(relationsQ.data).filter((r) => r.isActive === 1).map((r) => ({ id: r.studentRelationId, name: r.studentRelationType })),
      campuses: safeArray(campusesQ.data),
      buildings: safeArray(buildingsQ.data),
      workModes: safeArray(workModesQ.data),
      joinTypes: safeArray(joinTypesQ.data),
      employees: safeArray(employeesQ.data),
    },
    campusInfo: campusDetailsQ.data || null,
    buildingInfo: buildingDetailsQ.data || null,
  };
};

/* ---------------- AXIOS POSTS ---------------- */

// 1. CREATE NEW (Generates Temp ID)
export const generateTempPayrollId = async (hrEmployeeId, payload) => {
  const response = await axios.post(
    `${EMP_8080}/generate-temp-payroll-id/${hrEmployeeId}`,
    payload
  );
  return response.data;
};

// 2. UPDATE EXISTING (Uses the Tab URL you provided)
export const updateBasicInfo = async (tempPayrollId, payload) => {
  const url = `${API_BASE}/tab/basic-info`;
  console.log("📡 UPDATING Basic Info URL:", url);
  
  const response = await axios.post(url, payload, {
    params: { tempPayrollId: tempPayrollId }
  });
  return response.data;
};