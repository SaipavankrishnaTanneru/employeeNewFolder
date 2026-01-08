import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/employee"; 
const API_MODULE = "http://localhost:8080/api/employeeModule";

/* ---------------- GET Document Types (To map IDs) ---------------- */
export const useDocumentTypes = () =>
  useQuery({
    queryKey: ["documentTypes"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_MODULE}/active/DocumentTypes`);
      return Array.isArray(data) ? data : [];
    },
    staleTime: Infinity, // These IDs rarely change
  });

/* ---------------- POST Documents ---------------- */
export const postDocuments = async (tempPayrollId, payload) => {
  if (!tempPayrollId) throw new Error("Missing tempPayrollId");

  const url = `${API_BASE}/tab/documents`;
  console.log("🚀 Posting Documents to:", url);
  console.log("📦 Payload:", JSON.stringify(payload, null, 2));

  const response = await axios.post(url, payload, {
    params: { tempPayrollId: tempPayrollId },
  });
  return response.data;
};

/* ---------------- MOCK FILE UPLOAD SERVICE ---------------- */
// In a real app, this would send the file to AWS S3 / Cloudinary / Your Server
// and return the actual URL string.
export const uploadFileToCloud = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulating a backend response with a path string
      const fakeUrl = `https://cdn.varsity123.com/docs/${file.name.replace(/\s+/g, "_")}`;
      console.log(`☁️ Uploaded ${file.name} -> ${fakeUrl}`);
      resolve(fakeUrl);
    }, 1000); 
  });
};