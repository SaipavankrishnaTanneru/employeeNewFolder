import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Base URL matches your controller
const API_BASE_URL = "http://localhost:8080/api/EmpDetailsFORCODO";

export const useWorkingInfo = (tempPayrollId) =>
  useQuery({
    queryKey: ["workingInfo", tempPayrollId],
    queryFn: async () => {
      if (!tempPayrollId) return null;

      // Calls: .../working-info/TEMP5370024
      const { data } = await axios.get(
        `${API_BASE_URL}/working-info/${tempPayrollId}`
      );
      return data;
    },
    enabled: !!tempPayrollId, // Only run if ID exists
    refetchOnWindowFocus: false,
    retry: 1,
  });