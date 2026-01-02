// hooks/useOnboardingStatus.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:8080/api/EmpDetailsFORCODO/status";

export const useOnboardingStatusQuery = () => {
  return useQuery({
    queryKey: ["onboardingStatus"],
    queryFn: async () => {
      console.log("Fetching Onboarding Status API...");
      const response = await axios.get(API_URL);
      const rawData = Array.isArray(response.data) ? response.data : [];

      console.log("🔴 API Raw Data Sample:", rawData[0]);

      // --- TRANSFORM DATA ---
      // Maps Backend Keys -> Frontend Keys
      return rawData.map((item) => ({
        id: item.emp_id,
        
        // Basic Info
        name: item.employee_name || "--",
        empNo: item.emp_id || "--",
        tempPayroll: item.temp_payroll_id || item.payroll_id || "N/A",
        
        // Dates & Location
        joinDate: item.date_of_join || "--",
        leftDate: item.leaving_date || "-",
        city: item.city_name || "--",
        campus: item.cmps_name || "--",
        
        // Details
        gender: item.gender_name || "-",
        remarks: item.remarks || "No Remarks",
        
        // Status Mappings
        status: item.check_app_status_name || "Pending",
        joiningStatus: item.join_type || "New",
        
        // CO Specifics (Defaults if not in API)
        rejoiner: item.join_type === "Rejoin" ? "Yes" : "No",
        kycStatus: "Pending", 
        verifyKyc: "Pending"
      }));
    },
    // Optional: Cache time settings
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};