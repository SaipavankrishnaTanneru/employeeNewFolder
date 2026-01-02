// modules/employeeModule/api/onBoardingForms/postApi/useCategoryQueries.js

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_DROPDOWNS = "http://localhost:8080/api/employeeModule";
const API_BASE = "http://localhost:8080/api/employee";

/* --- 1. GET INDEPENDENT DROPDOWNS --- */

export const useEmployeeTypes = () =>
  useQuery({
    queryKey: ["employeeTypes"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/employee-type`);
      return Array.isArray(data) ? data : [];
    },
  });

export const useSubjects = () =>
  useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/subjects`);
      return Array.isArray(data) ? data : [];
    },
  });

export const useOrientations = () =>
  useQuery({
    queryKey: ["orientations"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/orientations/active`);
      return Array.isArray(data) ? data : [];
    },
  });

/* --- 2. GET DEPENDENT DROPDOWNS (CASCADING) --- */

// Fetch Departments based on Employee Type ID
export const useDepartmentsByType = (employeeTypeId) =>
  useQuery({
    queryKey: ["departments", employeeTypeId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/department/${employeeTypeId}`);
      return Array.isArray(data) ? data : [];
    },
    enabled: !!employeeTypeId, // Only fetch if ID is selected
  });

// Fetch Designations based on Department ID
export const useDesignationsByDept = (departmentId) =>
  useQuery({
    queryKey: ["designations", departmentId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_DROPDOWNS}/designation/${departmentId}`);
      return Array.isArray(data) ? data : [];
    },
    enabled: !!departmentId,
  });

/* --- 3. POST API --- */

export const postCategoryInfo = async (tempPayrollId, payload) => {
  const url = `${API_BASE}/tab/category-info`;
  console.log("📡 POST Request URL:", url);
  console.log("📦 Payload:", JSON.stringify(payload, null, 2));

  const response = await axios.post(url, payload, {
    params: { tempPayrollId: tempPayrollId },
  });
  return response.data;
};