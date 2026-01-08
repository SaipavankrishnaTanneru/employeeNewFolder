import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Base URL
const API_BASE_URL = "http://localhost:8080/api/EmpDetailsFORCODO";

export const useAgreementChequeDetails = (tempId) =>
  useQuery({
    queryKey: ["agreementCheque", tempId],
    queryFn: async () => {
      if (!tempId) return null;

      // Calls: .../agreement-cheque/TEMP12345
      const { data } = await axios.get(`${API_BASE_URL}/agreement-cheque/${tempId}`);
      return data || null;
    },
    enabled: !!tempId,
    refetchOnWindowFocus: false,
    retry: 1,
  });