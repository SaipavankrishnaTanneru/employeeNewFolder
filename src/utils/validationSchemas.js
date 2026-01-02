import * as Yup from 'yup';

// Base address validation schema
export const addressSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  addressLine1: Yup.string()
    .required('Address Line 1 is required')
    .min(5, 'Address Line 1 must be at least 5 characters')
    .max(100, 'Address Line 1 must be less than 100 characters'),
  
  addressLine2: Yup.string()
    .max(100, 'Address Line 2 must be less than 100 characters'),
  
  addressLine3: Yup.string()
    .max(100, 'Address Line 3 must be less than 100 characters'),
  
  pin: Yup.string()
    .required('Pin is required')
    .matches(/^[0-9]{6}$/, 'Pin must be 6 digits'),
  
  city: Yup.string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters'),
  
  state: Yup.string()
    .required('State is required'),
  
  country: Yup.string()
    .required('Country is required'),
  
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
});

// Complete form validation schema
export const addressFormSchema = Yup.object().shape({
  permanentAddressSame: Yup.boolean(),
  
  currentAddress: addressSchema,
  
  permanentAddress: addressSchema
});

// Custom validation for phone number
export const phoneValidation = Yup.string()
  .required('Phone number is required')
  .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits');

// Custom validation for email
export const emailValidation = Yup.string()
  .email('Please enter a valid email address')
  .required('Email is required');

// Custom validation for pin code
export const pinValidation = Yup.string()
  .required('Pin code is required')
  .matches(/^[0-9]{6}$/, 'Pin code must be exactly 6 digits');
