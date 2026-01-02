// modules/employeeModule/api/onBoardingForms/postApi/useBankQueries.js

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_DROPDOWNS = "http://localhost:8080/api/employeeModule";
const API_BASE = "http://localhost:8080/api/employee";

/* --- 1. GET DROPDOWNS --- */

export const usePaymentTypes = () =>
  useQuery({
    queryKey: ["paymentTypes"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/employee-payment-type`);
      return Array.isArray(data) ? data : [];
    },
  });

export const useActiveBanks = () =>
  useQuery({
    queryKey: ["activeBanks"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/active/Banks`);
      return Array.isArray(data) ? data : [];
    },
  });

/* --- 2. CASCADING QUERY (Branches by Bank ID) --- */
export const useBranchesByBank = (bankId) =>
  useQuery({
    queryKey: ["bankBranches", bankId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/active/BankBranches/bank/${bankId}`);
      return Array.isArray(data) ? data : [];
    },
    enabled: !!bankId, // Only fetch if Bank ID is present
  });

/* --- 3. POST API --- */
export const postBankInfo = async (tempPayrollId, payload) => {
  const url = `${API_BASE}/tab/bank-info`;
  console.log("📡 POST Request URL:", url);
  console.log("📦 Payload:", JSON.stringify(payload, null, 2));

  const response = await axios.post(url, payload, {
    params: { tempPayrollId: tempPayrollId },
  });
  return response.data;
};