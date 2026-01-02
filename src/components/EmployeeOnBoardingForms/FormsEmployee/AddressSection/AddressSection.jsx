import React from "react";
import FormField from "../AdressFormFields/FormField";
import styles from "./AddressSection.module.css";

const AddressSection = ({
  title,
  fields,
  section,
  values,
  errors,
  touched,
  onFieldChange,
  onFieldBlur,
  isDisabled = false,
  showDivider = false,
}) => {
  return (
    <>
      {showDivider && (
        <div className={styles.section_header}>
          <h3 className={styles.section_title}>{title}</h3>
          <div className={styles.section_divider} />
        </div>
      )}

      <div className={styles.address_grid}>
        {fields.map((field) => (
          <FormField
            key={field.key}
            field={field}
            section={section}
            value={values[field.key]}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
            error={errors[field.key]}
            touched={touched[field.key]}
            disabled={isDisabled || field.disabled}
          />
        ))}
      </div>
    </>
  );
};

export default AddressSection;
