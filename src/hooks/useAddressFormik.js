import { useFormik } from "formik";
import { useEffect } from "react";
import { useAuth } from "useAuth";
import {
  validateField,
  addressValidationSchema,
} from "../utils/validationUtils";
import {
  usePincodeQuery,
  useCitiesByDistrict,
  postAddressInfo,
  useAddressGetQuery,
} from "api/onBoardingForms/postApi/useAddressQueries";

const initialAddress = {
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

  const formik = useFormik({
    initialValues: {
      permanentAddressSame: false,
      currentAddress: { ...initialAddress },
      permanentAddress: { ...initialAddress },
    },

    validate: (values) => {
      const errors = {};

      const validateAddr = (addr) => {
        const e = {};
        Object.keys(addressValidationSchema).forEach((k) => {
          const err = validateField(addr[k], addressValidationSchema[k]);
          if (err) e[k] = err;
        });
        return e;
      };

      const currErrors = validateAddr(values.currentAddress);
      if (Object.keys(currErrors).length) {
        errors.currentAddress = currErrors;
      }

      if (!values.permanentAddressSame) {
        const permErrors = validateAddr(values.permanentAddress);
        if (Object.keys(permErrors).length) {
          errors.permanentAddress = permErrors;
        }
      }

      return errors;
    },

    onSubmit: async (values) => {
      const isSame = values.permanentAddressSame;

      const payload = {
        permanentAddressSameAsCurrent: isSame,
        currentAddress: {
          ...values.currentAddress,
          cityId: Number(values.currentAddress.cityId) || 0,
          districtId: Number(values.currentAddress.districtId) || 0,
          stateId: Number(values.currentAddress.stateId) || 0,
          countryId: Number(values.currentAddress.countryId) || 1,
        },
        permanentAddress: isSame
          ? {
              ...values.currentAddress,
              cityId: Number(values.currentAddress.cityId) || 0,
              districtId: Number(values.currentAddress.districtId) || 0,
              stateId: Number(values.currentAddress.stateId) || 0,
              countryId: Number(values.currentAddress.countryId) || 1,
            }
          : {
              ...values.permanentAddress,
              cityId: Number(values.permanentAddress.cityId) || 0,
              districtId: Number(values.permanentAddress.districtId) || 0,
              stateId: Number(values.permanentAddress.stateId) || 0,
              countryId: Number(values.permanentAddress.countryId) || 1,
            },
        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId,
      };

      try {
        await postAddressInfo(tempId, payload);
        if (onSuccess) onSuccess();
      } catch (e) {
        console.error("❌ Address submit failed", e);
      }
    },
  });

  const { values, setValues, setFieldValue } = formik;

  /* ======================================================================
     1️⃣ FETCH & POPULATE (EDIT MODE)
     ====================================================================== */
  const { data: savedData } = useAddressGetQuery(tempId);

  useEffect(() => {
    if (savedData) {
      console.log("✅ Address Data Fetched:", savedData);

      // Backend returns arrays CURR: [], PERM: []
      const curr = Array.isArray(savedData.CURR) ? savedData.CURR[0] : {};
      const perm = Array.isArray(savedData.PERM) ? savedData.PERM[0] : {};
      
      const isSame = !!savedData.permanentAddressSameAsCurrent;

      const normalize = (addr) => ({
        ...initialAddress,
        ...addr,
        pin: addr.pin || addr.pincode || "", // handle both naming conventions
        cityId: addr.cityId ? Number(addr.cityId) : "",
        districtId: addr.districtId ? Number(addr.districtId) : "",
        stateId: addr.stateId ? Number(addr.stateId) : "",
        countryId: addr.countryId ? Number(addr.countryId) : 1,
      });

      const currentAddress = normalize(curr || {});
      const permanentAddress = isSame
        ? { ...currentAddress }
        : normalize(perm || {});

      setValues({
        permanentAddressSame: isSame,
        currentAddress,
        permanentAddress,
      });
    }
  }, [savedData, setValues]);

  /* ======================================================================
     2️⃣ PINCODE → STATE & DISTRICT (SOURCE OF TRUTH)
     ====================================================================== */
  const { data: pinData } = usePincodeQuery(values.currentAddress.pin);

  useEffect(() => {
    if (!pinData) return;

    // ✅ Always update CURRENT
    setFieldValue("currentAddress.stateId", Number(pinData.stateId));
    setFieldValue("currentAddress.districtId", Number(pinData.districtId));

    // ✅ Sync PERMANENT if same
    if (values.permanentAddressSame) {
      setFieldValue("permanentAddress.pin", values.currentAddress.pin);
      setFieldValue("permanentAddress.stateId", Number(pinData.stateId));
      setFieldValue("permanentAddress.districtId", Number(pinData.districtId));
    }
  }, [
    pinData,
    values.permanentAddressSame,
    values.currentAddress.pin,
    setFieldValue,
  ]);

  /* ======================================================================
     3️⃣ CITIES → AUTO SELECT
     ====================================================================== */
  const { data: cities = [] } = useCitiesByDistrict(
    values.currentAddress.districtId
  );

  useEffect(() => {
    if (cities.length === 1 && !values.currentAddress.cityId) {
      const cityId = Number(cities[0].id);
      setFieldValue("currentAddress.cityId", cityId);

      if (values.permanentAddressSame) {
        setFieldValue("permanentAddress.cityId", cityId);
      }
    }
  }, [
    cities,
    values.currentAddress.cityId,
    values.permanentAddressSame,
    setFieldValue,
  ]);

  /* ======================================================================
     4️⃣ HANDLERS
     ====================================================================== */
  const handleCheckboxChange = (checked) => {
    const isChecked = !!checked;
    setFieldValue("permanentAddressSame", isChecked);

    if (isChecked) {
      setFieldValue("permanentAddress", {
        ...values.currentAddress,
        cityId: Number(values.currentAddress.cityId) || "",
        districtId: Number(values.currentAddress.districtId) || "",
        stateId: Number(values.currentAddress.stateId) || "",
        countryId: Number(values.currentAddress.countryId) || 1,
        pin: values.currentAddress.pin || "",
      });
    }
  };

  const handleFieldChange = (section, field, value) => {
    setFieldValue(`${section}.${field}`, value);

    if (section === "currentAddress" && values.permanentAddressSame) {
      setFieldValue(`permanentAddress.${field}`, value);
    }
  };

  return {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    submitForm: formik.submitForm,
    setFieldTouched: formik.setFieldTouched,
    handleFieldChange,
    handleCheckboxChange,
    stateOptions: pinData
      ? [{ id: pinData.stateId, name: pinData.stateName }]
      : [],
    districtOptions: pinData
      ? [{ id: pinData.districtId, name: pinData.districtName }]
      : [],
    cityOptions: cities,
  };
};