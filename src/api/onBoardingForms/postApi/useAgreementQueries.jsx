// modules/employeeModule/api/onBoardingForms/postApi/useAgreementQueries.js

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_DROPDOWNS = "http://localhost:8080/api/employeeModule";
const API_BASE = "http://localhost:8080/api/employee";

/* --- 1. GET ACTIVE ORGANIZATIONS --- */
export const useActiveOrganizations = () =>
  useQuery({
    queryKey: ["activeOrganizations"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/organizations/active`);
      // Assuming API returns [{ organizationId: 1, organizationName: "Org A" }, ...]
      return Array.isArray(data) ? data : [];
    },
  });

/* --- 2. POST AGREEMENT INFO --- */
export const postAgreementInfo = async (tempPayrollId, payload) => {
  const url = `${API_BASE}/tab/agreement-info`;
  console.log("📡 POST Request URL:", url);
  console.log("📦 Payload:", JSON.stringify(payload, null, 2));

  const response = await axios.post(url, payload, {
    params: { tempPayrollId: tempPayrollId },
  });
  return response.data;
};