import React, { useEffect } from "react";
import styles from "./AddressInfoUpdate.module.css";
import Dropdown from "widgets/Dropdown/Dropdown";
import InputBox from "widgets/Inputbox/InputBox";
import FormCheckbox from "widgets/FormCheckBox/FormCheckBox";
import { useAddressFormik } from "hooks/useAddressFormik"; 

const AddressInfoUpdate = ({ activeId, onSaveRef, onSuccess }) => {
  
  const { 
    values, 
    setFieldValue, 
    handleCheckboxChange,
    submitForm,
    // Data for Current Address
    currCities,
    currStateName,
    currDistrictName,
    // Data for Permanent Address
    permCities,
    permStateName,
    permDistrictName
  } = useAddressFormik({ tempId: activeId, onSuccess });

  // Connect Save Button from Parent to Formik Submit
  useEffect(() => {
    if (onSaveRef) {
        console.log("🔗 Connecting Save Button to Address Form");
        onSaveRef.current = submitForm;
    }
  }, [submitForm, onSaveRef]);

  const getCityName = (id, list) => list.find(c => c.id === Number(id))?.name || "";
  const getCityId = (name, list) => list.find(c => c.name === name)?.id || "";

  const renderAddressBlock = (type, cities, stateName, districtName) => {
    const prefix = type === "Current" ? "currentAddress" : "permanentAddress";
    const data = values[prefix];

    return (
      <div className={styles.block}>
        <div className={styles.block_header}>{type} Address</div>
        <div className={styles.form_grid}>
          <InputBox
            label="Address Line 1"
            value={data.addressLine1}
            onChange={(e) => setFieldValue(`${prefix}.addressLine1`, e.target.value)}
          />
          <InputBox
            label="Address Line 2"
            value={data.addressLine2}
            onChange={(e) => setFieldValue(`${prefix}.addressLine2`, e.target.value)}
          />
          <InputBox
            label="Pincode"
            value={data.pin}
            onChange={(e) => setFieldValue(`${prefix}.pin`, e.target.value)}
            placeholder="Enter Pincode"
          />
          <InputBox label="State" value={stateName || ""} disabled />
          <InputBox label="District" value={districtName || ""} disabled />
          <Dropdown
            dropdownname="City"
            value={getCityName(data.cityId, cities)}
            results={cities.map(c => c.name)}
            onChange={(e) => setFieldValue(`${prefix}.cityId`, getCityId(e.target.value, cities))}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {renderAddressBlock("Current", currCities, currStateName, currDistrictName)}
      <div className={styles.checkbox_row}>
        <FormCheckbox
          checked={values.permanentAddressSame}
          onChange={(e) => handleCheckboxChange(e.target.checked)}
        />
        <span>Permanent Address same as Current Address</span>
      </div>
      {!values.permanentAddressSame && (
        renderAddressBlock("Permanent", permCities, permStateName, permDistrictName)
      )}
    </div>
  );
};

export default AddressInfoUpdate;