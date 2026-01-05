import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Base URL
const API_BASE_URL = "http://localhost:8080/api/EmpDetailsFORCODO";

export const useCategoryInfo = (tempPayrollId) =>
  useQuery({
    queryKey: ["categoryInfo", tempPayrollId],
    queryFn: async () => {
      if (!tempPayrollId) return [];

      // Calls: .../category-info/TEMP5540050
      const { data } = await axios.get(
        `${API_BASE_URL}/category-info/${tempPayrollId}`
      );
      
      // The controller returns a List<CategoryInfoDTO1>, so ensure we return an array
      return Array.isArray(data) ? data : [];
    },
    enabled: !!tempPayrollId,
    refetchOnWindowFocus: false,
    retry: 1,
  });