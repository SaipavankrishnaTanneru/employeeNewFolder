import { Field } from "formik";
import Asterisk from "assets/SkillTest/Asterisk";
import FormError from "../FormikError/FormError";
import styles from "./GenderSelection.module.css";

const GenderSelection = ({
  values,
  setFieldValue,
  setFieldTouched,
  touched,
  errors,
  genderOptions = [],
  isSubmitted,
  externalErrors = {},
  onClearFieldError,
}) => {
  return (
    <div className={styles.gender_selection_form_field}>
      <div className={styles.gender_selection_container}>
        {/* ================= LABEL ================= */}
        <div className={styles.gender_selection_field_label_wrapper}>
          <span className={styles.gender_selection_field_label}>
            Gender
            <Asterisk style={{ marginLeft: "4px" }} />
          </span>
        </div>

        {/* ================= OPTIONS ================= */}
        <div className={styles.gender_selection_options}>
          {genderOptions.map((option) => {
            const isActive = Number(values.genderId) === Number(option.value);

            return (
              <label
                key={option.value}
                className={styles.gender_selection_label_wrapper}
              >
                {/* Hidden radio for accessibility */}
                <Field
                  type="radio"
                  name="genderId"               // ✅ FIXED
                  value={String(option.value)}  // Formik radio expects string
                  className={styles.gender_selection_radio}
                />

                <span
                  className={`${styles.gender_selection_label} ${
                    isActive ? styles.gender_selection_active : ""
                  }`}
                  onClick={() => {
                    console.log("🟣 Gender selected:", option.value);

                    // Clear external backend error if exists
                    if (onClearFieldError && externalErrors.genderId) {
                      onClearFieldError("genderId");
                    }

                    setFieldValue("genderId", Number(option.value));
                    setFieldTouched("genderId", true, false);
                  }}
                >
                  <span className={styles.gender_selection_text_with_icon}>
                    {option.label}
                  </span>
                </span>
              </label>
            );
          })}
        </div>

        {/* ================= ERROR ================= */}
        <FormError
          name="genderId"                     // ✅ FIXED
          touched={touched}
          errors={errors}
          className={styles.gender_selection_error}
          showOnChange
          isSubmitted={isSubmitted}
          externalErrors={externalErrors}
        />
      </div>
    </div>
  );
};

export default GenderSelection;
