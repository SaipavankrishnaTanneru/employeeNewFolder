// modules/employeeModule/api/onBoardingForms/postApi/useSalaryQueries.js

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_DROPDOWNS = "http://localhost:8080/api/employeeModule";
const API_BASE = "http://localhost:8080/api/employee";

/* --- 1. GET DROPDOWNS --- */

export const useGrades = () =>
  useQuery({
    queryKey: ["grades"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/grade`);
      return Array.isArray(data) ? data : [];
    },
  });

export const useCostCenters = () =>
  useQuery({
    queryKey: ["costCenters"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/costcenters`);
      return Array.isArray(data) ? data : [];
    },
  });

export const useStructures = () =>
  useQuery({
    queryKey: ["structures"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/structures`);
      return Array.isArray(data) ? data : [];
    },
  });

export const useOrganizations = () =>
  useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      // Maps to "orgId" in payload
      const { data } = await axios.get(`${API_DROPDOWNS}/organizations/active`);
      return Array.isArray(data) ? data : [];
    },
  });

/* --- 2. POST API (Forward to DO) --- */

export const postSalaryInfo = async (tempPayrollId, payload) => {
  // URL: http://localhost:8080/api/employee/tab/forward-to-divisional-office/222
  if (!tempPayrollId) throw new Error("Missing Temp Payroll ID");

  const url = `${API_BASE}/tab/forward-to-divisional-office/${tempPayrollId}`;
  
  console.log("📡 POST Salary/Forward URL:", url);
  console.log("📦 Payload:", JSON.stringify(payload, null, 2));

  const response = await axios.post(url, payload);
  return response.data;
};