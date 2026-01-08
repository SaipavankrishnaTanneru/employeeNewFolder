// // modules/employeeModule/api/onBoardingForms/postApi/useQualificationQueries.js

// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";

// const API_DROPDOWNS = "http://localhost:8080/api/employeeModule";
// const API_BASE = "http://localhost:8080/api/employee";

// /* --- 1. GET ALL QUALIFICATIONS --- */
// export const useQualificationsList = () =>
//   useQuery({
//     queryKey: ["qualificationsList"],
//     queryFn: async () => {
//       const { data } = await axios.get(`${API_DROPDOWNS}/qualifications`);
//       // Ensure we always return an array
//       return Array.isArray(data) ? data : [];
//     },
//   });

// /* --- 2. GET DEGREES BY QUALIFICATION ID --- */
// export const useDegreesByQualId = (qualificationId) =>
//   useQuery({
//     queryKey: ["degrees", qualificationId],
//     queryFn: async () => {
//       const { data } = await axios.get(`${API_DROPDOWNS}/degree/${qualificationId}`);
//       return Array.isArray(data) ? data : [];
//     },
//     // Only fetch if an ID is selected
//     enabled: !!qualificationId && qualificationId !== "", 
//   });

// /* --- 3. POST QUALIFICATION INFO --- */
// export const postQualificationInfo = async (tempPayrollId, payload) => {
//   const url = `${API_BASE}/tab/qualification`;
//   console.log("📡 POST Request URL:", url);
//   console.log("📦 Payload:", JSON.stringify(payload, null, 2));

//   const response = await axios.post(url, payload, {
//     params: { tempPayrollId: tempPayrollId },
//   });
//   return response.data;
// };

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_DROPDOWNS = "http://localhost:8080/api/employeeModule";
const API_BASE = "http://localhost:8080/api/employee";
const API_CO_DO_BASE = "http://localhost:8080/api/EmpDetailsFORCODO";

/* --- 1. GET ALL QUALIFICATIONS (Dropdown) --- */
export const useQualificationsList = () =>
  useQuery({
    queryKey: ["qualificationsList"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/qualifications`);
      return Array.isArray(data) ? data : [];
    },
  });

/* --- 2. GET DEGREES BY QUALIFICATION ID (Dropdown) --- */
export const useDegreesByQualId = (qualificationId) =>
  useQuery({
    queryKey: ["degrees", qualificationId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/degree/${qualificationId}`);
      return Array.isArray(data) ? data : [];
    },
    enabled: !!qualificationId && qualificationId !== "", 
  });

/* --- 3. GET SAVED QUALIFICATIONS (For View/Edit) --- */
export const useQualificationDetails = (tempId) => 
  useQuery({
    queryKey: ["qualificationDetails", tempId],
    queryFn: async () => {
      // URL: http://localhost:8080/api/EmpDetailsFORCODO/qualifications/TEMP5370033
      const { data } = await axios.get(`${API_CO_DO_BASE}/qualifications/${tempId}`);
      return data;
    },
    enabled: !!tempId,
  });

/* --- 4. POST QUALIFICATION INFO --- */
export const postQualificationInfo = async (tempPayrollId, payload) => {
  const url = `${API_BASE}/tab/qualification`;
  console.log("📡 POST Request URL:", url);
  
  const response = await axios.post(url, payload, {
    params: { tempPayrollId: tempPayrollId },
  });
  return response.data;
};