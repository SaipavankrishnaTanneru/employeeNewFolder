import React, { forwardRef, useImperativeHandle } from "react";
import FormCheckbox from "widgets/FormCheckBox/FormCheckBox";
import { FormikProvider } from "formik";
import AddressSection from "../../../EmployeeOnBoardingForms/FormsEmployee/AddressSection/AddressSection";
import FormValidationAlert from "utils/FormValidationAlert";
import { useAddressFormik } from "../../../../hooks/useAddressFormik";
import {
  createAddressFields,
  defaultCountries,
} from "../../../../utils/fieldConfigs";
import styles from "./AddressInfoForm.module.css";

const AddressInfoFormNew = forwardRef(({ tempId, onSuccess }, ref) => {
  const formikBag = useAddressFormik({ tempId, onSuccess });

  const {
    values,
    errors,
    touched,
    handleFieldChange,
    handleCheckboxChange,
    setFieldTouched,
    submitForm,
    
    // 🟢 CURRENT Address Options
    stateOptions,
    districtOptions,
    cityOptions,

    // 🟢 PERMANENT Address Options (New fields from Hook)
    permStateOptions,
    permDistrictOptions,
    permCityOptions,

  } = formikBag;

  useImperativeHandle(ref, () => ({
    submitForm: () => {
        console.log("⚡ Parent triggered submitForm via Ref");
        submitForm();
    },
  }), [submitForm]);

  // 1️⃣ Create Configuration for CURRENT Address
  const currentAddressFields = createAddressFields(
    cityOptions,
    stateOptions,
    defaultCountries,
    districtOptions
  );

  // 2️⃣ Create Configuration for PERMANENT Address
  // Uses the specific 'perm' options so they update independently
  const permanentAddressFields = createAddressFields(
    permCityOptions,
    permStateOptions,
    defaultCountries,
    permDistrictOptions
  );

  const handleFieldBlur = (section, field) =>
    setFieldTouched(`${section}.${field}`, true);

  const onSameAddressToggle = (e) => {
    const isChecked = e?.target ? e.target.checked : e;
    handleCheckboxChange(isChecked);
  };

  return (

    <FormikProvider value={formikBag}>
      <FormValidationAlert />
    <div className={styles.address_form_container}>
      {/* Current Address Section */}
      <AddressSection
        title="Current Address"
        fields={currentAddressFields} // 👈 Uses Current Config
        section="currentAddress"
        values={values.currentAddress}
        errors={errors.currentAddress || {}}
        touched={touched.currentAddress || {}}
        onFieldChange={handleFieldChange}
        onFieldBlur={handleFieldBlur}
      />

      {/* Checkbox Section */}
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

      {/* Permanent Address Section */}
      {!values.permanentAddressSame && (
        <AddressSection
          title="Permanent Address"
          fields={permanentAddressFields} // 👈 Uses Permanent Config
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
    </FormikProvider>
  );
});

export default AddressInfoFormNew;