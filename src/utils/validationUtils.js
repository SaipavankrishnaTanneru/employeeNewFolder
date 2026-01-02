import * as Yup from "yup";

export const validateField = (value, schema) => {
  try {
    if (!schema) return undefined;
    schema.validateSync(value);
    return undefined;
  } catch (error) {
    return error.message;
  }
};

// 🔴 FIX: Keys must match initialAddress in useAddressFormik
export const addressValidationSchema = {
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),

  addressLine1: Yup.string()
    .required("Address Line 1 is required")
    .min(10, "Address must be at least 10 characters"),

  pin: Yup.string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),

  // 🔴 Use 'cityId', not 'city'
  cityId: Yup.number()
    .required("City is required")
    .min(1, "City is required"),

  // 🔴 Use 'districtId', not 'district'
  districtId: Yup.number()
    .required("District is required")
    .min(1, "District is required"),

  // 🔴 Use 'stateId', not 'state'
  stateId: Yup.number()
    .required("State is required")
    .min(1, "State is required"),

  countryId: Yup.number()
    .required("Country is required"),

  // 🔴 Use 'phoneNumber', not 'phone'
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
};