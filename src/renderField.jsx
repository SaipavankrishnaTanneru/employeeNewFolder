// renderField.js

import Dropdown from 'widgets/Dropdown/Dropdown';
import Inputbox from 'widgets/Inputbox/InputBox';

export const renderField = (fieldName, fieldsMap, extraProps = {}) => {
  const field = fieldsMap[fieldName];
  if (!field) return null;

  if (field.type === "text") {
    return (
      <Inputbox
        label={field.label}
        name={field.name}
        placeholder={field.placeholder}
        {...extraProps}
      />
    );
  }

  if (field.options) {
    return (
      <Dropdown
        dropdownname={field.label}
        name={field.name}
        results={field.options}
        {...extraProps}
      />
    );
  }

  return null;
};
