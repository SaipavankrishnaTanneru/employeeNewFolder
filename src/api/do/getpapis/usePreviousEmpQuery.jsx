// modules/employeeModule/api/usePreviousEmpQuery.js
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:8080/api/EmpDetailsFORCODO";

export const usePreviousEmpDetails = (tempId) => {
  return useQuery({
    queryKey: ["previousEmployeeInfo", tempId],
    queryFn: async () => {
      // Expecting an Array of objects: [{ companyName: "A"... }, { companyName: "B"... }]
      const response = await axios.get(`${API_BASE_URL}/previousEmployeeInfo/${tempId}`);
      return response.data; 
    },
    enabled: !!tempId, // Only fetch if tempId is present
  });
};