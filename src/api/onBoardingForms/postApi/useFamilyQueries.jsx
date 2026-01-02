// modules/employeeModule/api/onBoardingForms/postApi/useFamilyQueries.js
import axios from "axios";

const API_BASE = "http://localhost:8080/api/employee"; 

export const postFamilyInfo = async (tempPayrollId, payload) => {
  if (!tempPayrollId) throw new Error("Missing tempPayrollId for Family POST");

  const url = `${API_BASE}/tab/family-info`;
  
  console.log("📡 POST Family URL:", url);
  console.log("🔑 Params:", { tempPayrollId });
  console.log("📦 Payload:", JSON.stringify(payload, null, 2));

  const response = await axios.post(url, payload, {
    params: { tempPayrollId: tempPayrollId },
  });
  return response.data;
};