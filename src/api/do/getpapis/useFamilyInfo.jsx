import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Base URL
const API_BASE_URL = "http://localhost:8080/api/EmpDetailsFORCODO";

export const useFamilyInfo = (tempPayrollId) =>
  useQuery({
    queryKey: ["familyInfo", tempPayrollId],
    queryFn: async () => {
      if (!tempPayrollId) return [];

      // Calls: .../family-info/TEMP5540002
      const { data } = await axios.get(
        `${API_BASE_URL}/family-info/${tempPayrollId}`
      );
      
      // Ensure we always return an array, even if API returns null/undefined
      return Array.isArray(data) ? data : [];
    },
    enabled: !!tempPayrollId,
    refetchOnWindowFocus: false,
    retry: 1,
  });