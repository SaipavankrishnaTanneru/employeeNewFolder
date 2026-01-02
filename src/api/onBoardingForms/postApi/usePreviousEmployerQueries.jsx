// modules/employeeModule/api/onBoardingForms/postApi/usePreviousEmployerQueries.js

import axios from "axios";

// Ensure this base URL matches your backend configuration
const API_BASE = "http://localhost:8080/api/employee"; 

export const postPreviousEmployerInfo = async (tempPayrollId, payload) => {
  const url = `${API_BASE}/tab/previous-employer`;
  console.log("📡 POST Request URL:", url);
  console.log("📦 Payload:", JSON.stringify(payload, null, 2));

  const response = await axios.post(url, payload, {
    params: { tempPayrollId: tempPayrollId },
  });
  return response.data;
};