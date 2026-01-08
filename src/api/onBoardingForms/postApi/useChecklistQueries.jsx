import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_DROPDOWNS = "http://localhost:8080/api/employeeModule";
const API_BASE = "http://localhost:8080/api/employee";

/* --- 1. GET CHECKLIST IDs --- */
export const useChecklistIds = () =>
  useQuery({
    queryKey: ["checklistIds"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/active/ChecklistDetails`);
      return Array.isArray(data) ? data : [];
    },
  });

/* --- 2. POST: DO Reject (Back to Campus) --- */
export const postBackToCampus = async (payload) => {
  const url = `${API_BASE}/Do Controller/back-to-campus`;
  console.log("📡 DO Reject URL:", url);
  const response = await axios.post(url, payload);
  return response.data;
};

/* --- 3. POST: CO Confirm (Update Checklist & Notice Period) --- */
export const postCOUpdateChecklist = async (payload) => {
  // Payload: { tempPayrollId, checkListIds, noticePeriod }
  // Matches: http://localhost:8080/api/employee/central-office/update-checklist
  const url = `${API_BASE}/central-office/update-checklist`;
  console.log("📡 CO Confirm URL:", url, payload);
  const response = await axios.post(url, payload);
  return response.data;
};

/* --- 4. POST: CO Reject (Back to DO) --- */
export const postCOReject = async (payload) => {
  const url = `${API_BASE}/central-office/reject-back-to-do`;
  console.log("📡 CO Reject URL:", url);
  const response = await axios.post(url, payload);
  return response.data;
};

/* --- 5. POST: DO Forward (Combined Salary + Checklist) --- */
export const postForwardToCO = async (payload) => {
  const { tempPayrollId } = payload;
  const url = `${API_BASE}/Do Controller/forward-to-central-office/${tempPayrollId}`;
  console.log("📡 DO Forward URL:", url);
  const response = await axios.post(url, payload);
  return response.data;
};