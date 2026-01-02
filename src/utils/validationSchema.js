import * as Yup from "yup";

const phoneRegExp = /^[6-9]\d{9}$/;
const aadhaarRegExp = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$|^[2-9]{1}[0-9]{11}$/; // Supports 12 digits with or without space
const panRegExp = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const uanRegExp = /^\d{12}$/; // Assuming 12 digit UAN

export const onboardingValidationSchema = Yup.object().shape({
  // --- Mandatory Fields ---
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Surname is required"),
  genderId: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.date()
    .max(new Date(), "Date of Birth cannot be in the future")
    .test("age-validation", "Age must be between 18 and 58", (value) => {
      if (!value) return false;
      const today = new Date();
      const dob = new Date(value);
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age >= 18 && age <= 58;
    })
    .required("Date of Birth is required"),
  
  // --- Identity ---
  aadharNum: Yup.string()
    .matches(aadhaarRegExp, "Invalid Aadhaar Number")
    .required("Aadhaar Number is required"),
  pancardNum: Yup.string()
    .matches(panRegExp, "Invalid PAN Format (e.g., ABCDE1234F)")
    .required("PAN is required"), // Requirement: Mandatory
    
  // --- Contact ---
  email: Yup.string().email("Invalid email format").required("Email is required"),
  primaryMobileNo: Yup.string()
    .matches(phoneRegExp, "Invalid Mobile Number")
    .required("Contact Number is required"),
  fatherName: Yup.string().required("Father Name is required"),
  maritalStatusId: Yup.string().required("Marital Status is required"),

  // --- Work/Campus (Mandatory per User Story) ---
  campusId: Yup.string().required("Campus is required"),
  // Building is dependent on Campus, usually mandatory if campus is selected
  buildingId: Yup.string().required("Building is required"), 
  managerId: Yup.string().required("Manager is required"),
  modeOfHiringId: Yup.string().required("Mode of Hiring is required"),
  joinTypeId: Yup.string().required("Joining As is required"),
  dateOfJoin: Yup.date()
    .min(Yup.ref('dateOfBirth'), "Date of Joining cannot be before Date of Birth")
    .required("Date of Joining is required"),
  qualificationId: Yup.string().required("Highest Qualification is required"),
  
  // --- Specific Business Rules ---
  uanNo: Yup.string()
    .matches(uanRegExp, "UAN must be numeric")
    .required("UAN number is mandatory"), // User Story: "UAN number is mandatory"
});