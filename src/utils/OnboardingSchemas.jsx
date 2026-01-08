// src/utils/OnboardingSchemas.js
import * as Yup from "yup";

// --- REUSABLE REGEX PATTERNS ---
const phoneRegExp = /^[6-9]\d{9}$/;
const aadhaarRegExp = /^[0-9]{12}$/;
const panRegExp = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const pinRegExp = /^[1-9][0-9]{5}$/;

// --- BASIC INFO SCHEMA ---
export const basicInfoSchema = Yup.object().shape({
  // 1. Personal Identity (Mandatory)
  adhaarName: Yup.string().required("Aadhaar Name is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Surname is required"),
  fatherName: Yup.string().required("Father Name is required"),
  genderId: Yup.string().required("Gender is required"),
  
  // 2. Identity Numbers (Validations & Mandatory)
  adhaarNo: Yup.string()
    .matches(aadhaarRegExp, "Aadhaar must be exactly 12 digits")
    .required("Aadhaar No is required"),
    
  pancardNum: Yup.string()
    .matches(panRegExp, "Invalid PAN Format (e.g., ABCDE1234F)")
    .required("PAN is required"), // Assuming mandatory based on context, make .nullable() if optional

  // 3. Contact Info
  primaryMobileNo: Yup.string()
    .matches(phoneRegExp, "Invalid Mobile Number")
    .required("Mobile Number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  emergencyPhNo: Yup.string()
    .matches(phoneRegExp, "Invalid Emergency Number")
    .required("Emergency Contact is required"),

  // 4. Date Logic
  dateOfBirth: Yup.date()
    .max(new Date(), "Date of Birth cannot be in the future")
    .required("Date of Birth is required"),
    
  dateOfJoin: Yup.date()
    .required("Date of Joining is required")
    .min(
      Yup.ref('dateOfBirth'),
      "Date of Joining cannot be before Date of Birth"
    ),

  // 5. Dropdowns (Mandatory)
  maritalStatusId: Yup.string().required("Marital Status is required"),
  qualificationId: Yup.string().required("Qualification is required"),
  bloodGroupId: Yup.string().required("Blood Group is required"),
  religionId: Yup.string().required("Religion is required"),
  categoryId: Yup.string().required("Category is required"),
  emergencyRelationId: Yup.string().required("Relation is required"),

  // 6. Work Info (Mandatory)
  modeOfHiringId: Yup.string().required("Mode of Hiring is required"),
  campusId: Yup.string().required("Campus is required"),
  managerId: Yup.string().required("Manager is required"),
  joinTypeId: Yup.string().required("Joining As is required"),
  hiredByEmpId: Yup.string().required("Hired By is required"),
  empWorkModeId: Yup.string().required("Work Mode is required"),

  // 7. Conditional Validation for SSC
  sscNo: Yup.string().when("sscNotAvailable", {
    is: false, // If checkbox is NOT checked
    then: () => Yup.string().required("SSC No is required"),
    otherwise: () => Yup.string().nullable(), // If checked, field is optional
  }),
  
  // 8. Optional Fields (Explicitly allow null/empty)
  uanNo: Yup.string().nullable(),
  previousChaitanyaId: Yup.string().nullable(),
  adhaarEnrolmentNo: Yup.string().nullable(),
  
  // 9. Contract Dates (Conditional: Only if Consultant)
  // Assuming '1' is Consultant ID based on your tabs
  contractStartDate: Yup.date().when("modeOfHiringId", {
    is: (val) => Number(val) === 1, 
    then: () => Yup.date().required("Start Date required for Consultants"),
    otherwise: () => Yup.date().nullable()
  }),
  contractEndDate: Yup.date().when("modeOfHiringId", {
    is: (val) => Number(val) === 1,
    then: () => Yup.date()
      .min(Yup.ref('contractStartDate'), "End Date must be after Start Date")
      .required("End Date required for Consultants"),
    otherwise: () => Yup.date().nullable()
  })
});

const addressBlockSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  addressLine1: Yup.string().required("Address Line 1 is required"),
  // Address 2 & 3 are Optional (No .required())
  addressLine2: Yup.string().nullable(),
  addressLine3: Yup.string().nullable(),
  
  pin: Yup.string()
    .matches(pinRegExp, "Invalid Pincode")
    .required("Pincode is required"),
    
  cityId: Yup.string().required("City is required"),
  stateId: Yup.string().required("State is required"),
  countryId: Yup.string().required("Country is required"),
  
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Invalid Phone Number")
    .required("Phone Number is required"),
    
  // District is technically required for logic, though not in your mandatory text list. 
  // Good practice to keep it required if dependent on Pincode.
  districtId: Yup.string().required("District is required"),
});


export const addressFormSchema = Yup.object().shape({
  // 1. Current Address is ALWAYS Mandatory
  currentAddress: addressBlockSchema,

  // 2. Checkbox State
  permanentAddressSame: Yup.boolean(),

  // 3. Permanent Address is CONDITIONAL
  permanentAddress: Yup.mixed().when("permanentAddressSame", {
    is: false, // If Checkbox is UNCHECKED
    then: () => addressBlockSchema, // Validate Permanent Address
    otherwise: () => Yup.object().nullable(), // Else, ignore validation
  }),
});

// --- SINGLE FAMILY MEMBER SCHEMA ---
const familyMemberSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Name (as per Aadhaar) is required"),
  
  nationality: Yup.string().required("Nationality is required"),
  
  genderId: Yup.string().required("Gender is required"),
  
  relationId: Yup.string().required("Relation is required"),

  isLate: Yup.boolean(),

  // CONDITIONAL: Phone is required ONLY if isLate is FALSE
  phoneNumber: Yup.string().when("isLate", {
    is: false, 
    then: () => Yup.string()
        .matches(phoneRegExp, "Phone must be exactly 10 digits")
        .required("Phone Number is required"),
    otherwise: () => Yup.string().nullable().notRequired(),
  }),

  // CONDITIONAL: Email is required ONLY if isLate is FALSE
  email: Yup.string().when("isLate", {
    is: false,
    then: () => Yup.string()
        .email("Invalid email format (abc@xyz.com)")
        .required("Email is required"),
    otherwise: () => Yup.string().nullable().notRequired(),
  }),
  
  // Optional Fields
  adhaarNo: Yup.string().nullable(),
  occupation: Yup.string().nullable(),
  bloodGroupId: Yup.string().nullable(),
  dateOfBirth: Yup.string().nullable(),
});

// --- MAIN FAMILY FORM SCHEMA ---
export const familyFormSchema = Yup.object().shape({
  father: familyMemberSchema,
  mother: familyMemberSchema,
  otherMembers: Yup.array().of(familyMemberSchema),
});