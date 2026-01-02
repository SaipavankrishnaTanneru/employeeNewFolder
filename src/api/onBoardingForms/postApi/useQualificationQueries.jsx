// modules/employeeModule/api/onBoardingForms/postApi/useQualificationQueries.js

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_DROPDOWNS = "http://localhost:8080/api/employeeModule";
const API_BASE = "http://localhost:8080/api/employee";

/* --- 1. GET ALL QUALIFICATIONS --- */
export const useQualificationsList = () =>
  useQuery({
    queryKey: ["qualificationsList"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/qualifications`);
      // Ensure we always return an array
      return Array.isArray(data) ? data : [];
    },
  });

/* --- 2. GET DEGREES BY QUALIFICATION ID --- */
export const useDegreesByQualId = (qualificationId) =>
  useQuery({
    queryKey: ["degrees", qualificationId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/degree/${qualificationId}`);
      return Array.isArray(data) ? data : [];
    },
    // Only fetch if an ID is selected
    enabled: !!qualificationId && qualificationId !== "", 
  });

/* --- 3. POST QUALIFICATION INFO --- */
export const postQualificationInfo = async (tempPayrollId, payload) => {
  const url = `${API_BASE}/tab/qualification`;
  console.log("📡 POST Request URL:", url);
  console.log("📦 Payload:", JSON.stringify(payload, null, 2));

  const response = await axios.post(url, payload, {
    params: { tempPayrollId: tempPayrollId },
  });
  return response.data;
};