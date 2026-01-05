import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Base URL
const API_BASE_URL = "http://localhost:8080/api/EmpDetailsFORCODO";

export const useEmployeeProfileView = (employeeId) =>
  useQuery({
    queryKey: ["employeeProfileView", employeeId],
    queryFn: async () => {
      if (!employeeId) return null;

      // Calls: .../EmployeeOnboardingProfileCardView/TEMP5370027
      const { data } = await axios.get(
        `${API_BASE_URL}/EmployeeOnboardingProfileCardView/${employeeId}`
      );
      return data;
    },
    enabled: !!employeeId, 
    refetchOnWindowFocus: false, 
    retry: 1,
  });