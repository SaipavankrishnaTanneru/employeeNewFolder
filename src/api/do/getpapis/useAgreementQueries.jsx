// modules/employeeModule/api/useAgreementQueries.js
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:8080/api/EmpDetailsFORCODO";

export const useAgreementChequeDetails = (tempId) => {
  return useQuery({
    queryKey: ["agreementCheque", tempId],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/agreement-cheque/${tempId}`);
      return response.data;
    },
    enabled: !!tempId, // Only fetch if tempId exists
  });
};