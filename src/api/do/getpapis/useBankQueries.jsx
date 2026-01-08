import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Base URL
const API_BASE_URL = "http://localhost:8080/api/EmpDetailsFORCODO";

export const useBankInfo = (tempPayrollId) =>
  useQuery({
    queryKey: ["bankInfo", tempPayrollId],
    queryFn: async () => {
      if (!tempPayrollId) return null;

      // Calls: .../EmpBankDetails/TEMP5370034
      const { data } = await axios.get(
        `${API_BASE_URL}/EmpBankDetails/${tempPayrollId}`
      );
      
      return data || null;
    },
    enabled: !!tempPayrollId,
    refetchOnWindowFocus: false,
    retry: 1,
  });