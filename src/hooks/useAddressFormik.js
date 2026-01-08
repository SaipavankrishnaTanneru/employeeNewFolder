import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAuth } from "useAuth";
import * as Yup from "yup";
import { addressFormSchema } from "utils/OnboardingSchemas"; 
import {
  usePincodeQuery,
  useCitiesByDistrict,
  postAddressInfo,
  useAddressGetQuery,
} from "api/onBoardingForms/postApi/useAddressQueries";

const initialAddressBlock = {
  name: "",
  addressLine1: "",
  addressLine2: "",
  addressLine3: "",
  pin: "",
  cityId: "",
  districtId: "",
  stateId: "",
  countryId: 1,
  phoneNumber: "",
};

export const useAddressFormik = ({ tempId, onSuccess }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  const { data: savedData, refetch } = useAddressGetQuery(tempId);
  const [isDataPopulated, setIsDataPopulated] = useState(false);

  const formik = useFormik({
    initialValues: {
      permanentAddressSame: false,
      currentAddress: { ...initialAddressBlock },
      permanentAddress: { ...initialAddressBlock },
    },
    // 🔴 DEBUG: Comment out validationSchema if "Save" does nothing. 
    // validationSchema: addressFormSchema, 
    enableReinitialize: true,
    
    onSubmit: async (values) => {
      console.log("🚀 Submitting Address Info...", values);
      const isSame = values.permanentAddressSame;
      
      // Helper: Send null if empty, otherwise number
      const safeNum = (val) => (val && val !== "" ? Number(val) : null);

      const payload = {
        permanentAddressSameAsCurrent: isSame,
        currentAddress: {
          ...values.currentAddress,
          cityId: safeNum(values.currentAddress.cityId),
          districtId: safeNum(values.currentAddress.districtId),
          stateId: safeNum(values.currentAddress.stateId),
          countryId: safeNum(values.currentAddress.countryId) || 1,
        },
        permanentAddress: isSame
          ? {
              ...values.currentAddress,
              cityId: safeNum(values.currentAddress.cityId),
              districtId: safeNum(values.currentAddress.districtId),
              stateId: safeNum(values.currentAddress.stateId),
              countryId: safeNum(values.currentAddress.countryId) || 1,
            }
          : {
              ...values.permanentAddress,
              cityId: safeNum(values.permanentAddress.cityId),
              districtId: safeNum(values.permanentAddress.districtId),
              stateId: safeNum(values.permanentAddress.stateId),
              countryId: safeNum(values.permanentAddress.countryId) || 1,
            },
        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId,
      };

      try {
        await postAddressInfo(tempId, payload);
        alert("Address saved successfully!"); // Visual confirmation
        if (onSuccess) onSuccess();
        refetch();
      } catch (e) {
        console.error("❌ Address submit failed", e);
        alert("Failed to save address. Check console.");
      }
    },
  });

  const { values, setFieldValue, setValues, errors } = formik;

  // 🔴 DEBUG: Log errors whenever they change
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.warn("⚠️ Formik Validation Errors:", errors);
    }
  }, [errors]);

  // 2. POPULATE FORM FROM API
  useEffect(() => {
    if (!isDataPopulated && savedData) {
      let currData = {};
      let permData = {};
      let isSame = false;

      if (savedData.currentAddress) {
        currData = savedData.currentAddress || {};
        permData = savedData.permanentAddress || {};
        isSame = !!savedData.permanentAddressSameAsCurrent;
      } else if (savedData.CURR || Array.isArray(savedData.CURR)) {
        currData = Array.isArray(savedData.CURR) && savedData.CURR.length > 0 ? savedData.CURR[0] : {};
        permData = Array.isArray(savedData.PERM) && savedData.PERM.length > 0 ? savedData.PERM[0] : {};
        isSame = savedData.permanentAddressSameAsCurrent ?? false;
      }

      const normalize = (addr) => ({
        name: addr.name || "",
        addressLine1: addr.addressLine1 || addr.houseNo || "",
        addressLine2: addr.addressLine2 || addr.landmark || "",
        addressLine3: addr.addressLine3 || "",
        pin: String(addr.pin || addr.postalCode || addr.pincode || ""),
        phoneNumber: addr.phoneNumber || addr.emrg_contact_no || "",
        cityId: addr.cityId ? Number(addr.cityId) : "",
        districtId: addr.districtId ? Number(addr.districtId) : "",
        stateId: addr.stateId ? Number(addr.stateId) : "",
        countryId: addr.countryId ? Number(addr.countryId) : 1,
      });

      setValues({
        permanentAddressSame: isSame,
        currentAddress: normalize(currData),
        permanentAddress: isSame ? normalize(currData) : normalize(permData),
      });
      setIsDataPopulated(true);
    }
  }, [savedData, isDataPopulated, setValues]);

  // 3. DROPDOWN LOGIC
  const { data: currPinData } = usePincodeQuery(values.currentAddress.pin);
  const { data: permPinData } = usePincodeQuery(!values.permanentAddressSame ? values.permanentAddress.pin : null);

  useEffect(() => {
    if (currPinData) {
      setFieldValue("currentAddress.stateId", Number(currPinData.stateId));
      setFieldValue("currentAddress.districtId", Number(currPinData.districtId));
      if (values.permanentAddressSame) {
        setFieldValue("permanentAddress.pin", values.currentAddress.pin);
        setFieldValue("permanentAddress.stateId", Number(currPinData.stateId));
        setFieldValue("permanentAddress.districtId", Number(currPinData.districtId));
      }
    }
  }, [currPinData, values.permanentAddressSame, values.currentAddress.pin, setFieldValue]);

  useEffect(() => {
    if (permPinData && !values.permanentAddressSame) {
      setFieldValue("permanentAddress.stateId", Number(permPinData.stateId));
      setFieldValue("permanentAddress.districtId", Number(permPinData.districtId));
    }
  }, [permPinData, values.permanentAddressSame, setFieldValue]);

  const { data: currCities = [] } = useCitiesByDistrict(values.currentAddress.districtId);
  const { data: permCities = [] } = useCitiesByDistrict(values.permanentAddress.districtId);

  const handleCheckboxChange = (checked) => {
    setFieldValue("permanentAddressSame", checked);
    if (checked) setFieldValue("permanentAddress", { ...values.currentAddress });
  };

  const handleFieldChange = (section, field, value) => {
    setFieldValue(`${section}.${field}`, value);
    if (section === "currentAddress" && values.permanentAddressSame) {
      setFieldValue(`permanentAddress.${field}`, value);
    }
  };

  return {
    ...formik,
    handleCheckboxChange,
    handleFieldChange,
    currCities,
    permCities,
    currStateName: currPinData?.stateName,
    currDistrictName: currPinData?.districtName,
    permStateName: permPinData?.stateName,
    permDistrictName: permPinData?.districtName,
    stateOptions: currPinData ? [{ id: currPinData.stateId, name: currPinData.stateName }] : [],
    districtOptions: currPinData ? [{ id: currPinData.districtId, name: currPinData.districtName }] : [],
    cityOptions: currCities,
    permStateOptions: values.permanentAddressSame ? (currPinData ? [{ id: currPinData.stateId, name: currPinData.stateName }] : []) : (permPinData ? [{ id: permPinData.stateId, name: permPinData.stateName }] : []),
    permDistrictOptions: values.permanentAddressSame ? (currPinData ? [{ id: currPinData.districtId, name: currPinData.districtName }] : []) : (permPinData ? [{ id: permPinData.districtId, name: permPinData.districtName }] : []),
    permCityOptions: values.permanentAddressSame ? currCities : permCities,
  };
};