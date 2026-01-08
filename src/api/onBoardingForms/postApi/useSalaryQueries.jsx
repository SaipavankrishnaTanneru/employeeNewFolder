// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";

// const API_DROPDOWNS = "http://localhost:8080/api/employeeModule";
// const API_BASE = "http://localhost:8080/api/employee";

// /* --- DROPDOWNS --- */
// // (Keep your dropdown queries: useGrades, useCostCenters, etc. here)
// export const useGrades = () => useQuery({ queryKey: ["grades"], queryFn: async () => (await axios.get(`${API_DROPDOWNS}/grade`)).data });
// export const useCostCenters = () => useQuery({ queryKey: ["costCenters"], queryFn: async () => (await axios.get(`${API_DROPDOWNS}/costcenters`)).data });
// export const useStructures = () => useQuery({ queryKey: ["structures"], queryFn: async () => (await axios.get(`${API_DROPDOWNS}/structures`)).data });
// export const useOrganizations = () => useQuery({ queryKey: ["organizations"], queryFn: async () => (await axios.get(`${API_DROPDOWNS}/organizations/active`)).data });

// /* --- POST: Forward to DO (Standard) --- */
// export const postSalaryInfo = async (tempPayrollId, payload) => {
//   const url = `${API_BASE}/tab/forward-to-divisional-office/${tempPayrollId}`;
//   console.log("📡 POST Forward to DO:", url);
//   const response = await axios.post(url, payload);
//   return response.data;
// };

// /* --- POST: Forward to Central Office (DO Logic) --- */
// export const postForwardToCO = async (tempPayrollId, payload) => {
//   // Matches your requirement: /Do Controller/forward-to-central-office/{id}
//   const url = `${API_BASE}/Do Controller/forward-to-central-office/${tempPayrollId}`;
//   console.log("📡 POST Forward to CO:", url);
//   const response = await axios.post(url, payload);
//   return response.data;
// };

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_DROPDOWNS = "http://localhost:8080/api/employeeModule";
const API_BASE = "http://localhost:8080/api/employee";
const API_CO_DO_BASE = "http://localhost:8080/api/EmpDetailsFORCODO"; 

/* --- DROPDOWNS --- */
export const useGrades = () => useQuery({ queryKey: ["grades"], queryFn: async () => (await axios.get(`${API_DROPDOWNS}/grade`)).data });
export const useCostCenters = () => useQuery({ queryKey: ["costCenters"], queryFn: async () => (await axios.get(`${API_DROPDOWNS}/costcenters`)).data });
export const useStructures = () => useQuery({ queryKey: ["structures"], queryFn: async () => (await axios.get(`${API_DROPDOWNS}/structures`)).data });
export const useOrganizations = () => useQuery({ queryKey: ["organizations"], queryFn: async () => (await axios.get(`${API_DROPDOWNS}/organizations/active`)).data });

/* --- GET SALARY INFO (For View/Edit) --- */
export const useSalaryDetails = (tempId) =>
  useQuery({
    queryKey: ["salaryDetails", tempId],
    queryFn: async () => {
      // URL: http://localhost:8080/api/employee/Do Controller/by-temp-payroll-id?tempPayrollId=TEMP5370038
      const url = `http://localhost:8080/api/employee/Do Controller/by-temp-payroll-id`; 
      const { data } = await axios.get(url, {
          params: { tempPayrollId: tempId }
      });
      return data;
    },
    enabled: !!tempId,
  });

/* --- POST: Forward to DO (Standard) --- */
export const postSalaryInfo = async (tempPayrollId, payload) => {
  const url = `${API_BASE}/tab/forward-to-divisional-office/${tempPayrollId}`;
  console.log("📡 POST Forward to DO:", url);
  const response = await axios.post(url, payload);
  return response.data;
};

/* --- POST: Forward to Central Office (DO Logic) --- */
export const postForwardToCO = async (tempPayrollId, payload) => {
  const url = `${API_BASE}/Do Controller/forward-to-central-office/${tempPayrollId}`;
  console.log("📡 POST Forward to CO:", url);
  const response = await axios.post(url, payload);
  return response.data;
};