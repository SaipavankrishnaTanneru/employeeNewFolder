import React, { forwardRef, useImperativeHandle } from "react";
import FormCheckbox from "widgets/FormCheckBox/FormCheckBox";
import AddressSection from "../../../EmployeeOnBoardingForms/FormsEmployee/AddressSection/AddressSection";
import { useAddressFormik } from "../../../../hooks/useAddressFormik";
import {
  createAddressFields,
  defaultCountries,
} from "../../../../utils/fieldConfigs";
import styles from "./AddressInfoForm.module.css";

const AddressInfoFormNew = forwardRef(({ tempId, onSuccess }, ref) => {

  const {
    values,
    errors,
    touched,
    handleFieldChange,
    handleCheckboxChange,
    setFieldTouched,
    stateOptions,
    districtOptions,
    cityOptions,
    submitForm,
  } = useAddressFormik({ tempId, onSuccess });

  // 🔴 FIX: Added console log inside the trigger to confirm connection
  useImperativeHandle(ref, () => ({
    submitForm: () => {
        console.log("⚡ Parent triggered submitForm via Ref");
        submitForm();
    },
  }), [submitForm]); // 🔴 Added dependency

  const addressFields = createAddressFields(
    cityOptions,
    stateOptions,
    defaultCountries,
    districtOptions
  );

  const handleFieldBlur = (section, field) =>
    setFieldTouched(`${section}.${field}`, true);

  const onSameAddressToggle = (e) => {
    const isChecked = e?.target ? e.target.checked : e;
    handleCheckboxChange(isChecked);
  };

  return (
    <div className={styles.address_form_container}>
      {/* Current Address */}
      <AddressSection
        title="Current Address"
        fields={addressFields}
        section="currentAddress"
        values={values.currentAddress}
        errors={errors.currentAddress || {}}
        touched={touched.currentAddress || {}}
        onFieldChange={handleFieldChange}
        onFieldBlur={handleFieldBlur}
      />

      {/* Checkbox */}
      <div className={styles.checkbox_section}>
        <div className={styles.checkbox_wrapper}>
          <FormCheckbox
            name="permanentAddressSame"
            checked={values.permanentAddressSame}
            onChange={onSameAddressToggle} 
          />
          <span className={styles.checkbox_label}>
            Permanent Address Same as Current Address
          </span>
        </div>
      </div>

      {/* Permanent Address */}
      {!values.permanentAddressSame && (
        <AddressSection
          title="Permanent Address"
          fields={addressFields}
          section="permanentAddress"
          values={values.permanentAddress}
          errors={errors.permanentAddress || {}}
          touched={touched.permanentAddress || {}}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
          showDivider
        />
      )}
    </div>
  );
});

export default AddressInfoFormNew;