// modules/employeeModule/api/onBoardingForms/postApi/useAddressQueries.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// API Base URLs
const API_EMPLOYEE_BASE = "http://localhost:8080/api/employee"; 
const API_COMMON_BASE = "http://localhost:9000/common/get";
const API_MODULE_BASE = "http://localhost:8080/api/employeeModule";

// 🔴 NEW: Base URL for fetching saved data
const API_FETCH_BASE = "http://localhost:8080/api/EmpDetailsFORCODO/address";

/* ---------------- GET QUERIES ---------------- */

// 1. Existing Pincode Query
export const usePincodeQuery = (pincode, enabled = true) =>
  useQuery({
    queryKey: ["pincode", pincode],
    queryFn: async () => {
      const { data } = await axios.get(`${API_COMMON_BASE}/${pincode}`);
      return data;
    },
    enabled: enabled && !!pincode && pincode.length === 6,
    retry: false,
    staleTime: Infinity, // Cache pincode data
  });

// 2. Existing City Query
export const useCitiesByDistrict = (districtId) =>
  useQuery({
    queryKey: ["cities", districtId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_MODULE_BASE}/cities/district/${districtId}`
      );
      return Array.isArray(data) ? data : [];
    },
    enabled: !!districtId && Number(districtId) > 0,
    retry: false,
    staleTime: Infinity,
  });

// 🔴 3. NEW: Get Saved Address Info (Auto-populate)
export const useAddressGetQuery = (tempPayrollId) =>
  useQuery({
    queryKey: ["addressInfo", tempPayrollId],
    queryFn: async () => {
      console.log(`Fetching Address Info for: ${tempPayrollId}`);
      const { data } = await axios.get(`${API_FETCH_BASE}/${tempPayrollId}`);
      return data;
    },
    enabled: !!tempPayrollId, // Only fetch if ID exists
    refetchOnWindowFocus: false,
  });

/* ---------------- POST ADDRESS API ---------------- */

export const postAddressInfo = async (tempPayrollId, payload) => {
  if (!tempPayrollId) throw new Error("Missing tempPayrollId for Address POST");
  
  const url = `${API_EMPLOYEE_BASE}/tab/address-info`;
  
  const response = await axios.post(url, payload, {
    params: { tempPayrollId: tempPayrollId } 
  });
  return response.data;
};