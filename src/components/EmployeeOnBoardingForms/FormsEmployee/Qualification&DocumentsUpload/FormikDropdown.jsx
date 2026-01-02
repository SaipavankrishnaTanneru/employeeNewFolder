import React from 'react';
import Dropdown from 'widgets/Dropdown/Dropdown'; // Import your original, unchanged dropdown

const FormikDropdown = ({ field, form, ...props }) => {
  
  // This function converts Formik's onChange event into the format your Dropdown expects.
  // Your Dropdown's onChange prop is designed to receive an event object.
  // Formik's field.onChange prop is a function that takes an event object.
  // So, they are already compatible! We can just pass it through.
  const handleChange = (event) => {
    field.onChange(event);
  };

  return (
    <Dropdown
      // 1. Pass the props your Dropdown expects
      name={field.name}
      value={field.value}
      onChange={handleChange}
      
      // 2. Pass through all other props like 'dropdownname' and 'results'
      {...props}
    />
  );
};

export default FormikDropdown;