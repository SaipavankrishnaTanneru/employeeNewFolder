import React, { forwardRef, useImperativeHandle } from "react";
import { FieldArray, FormikProvider } from "formik";
import styles from "./css/QualificationForm.module.css";

// Assets & Widgets
import BorderIcon from 'assets/Qualification/border.svg'; // Correct string import
import AddFieldWidget from "widgets/AddFieldWidget/AddFieldWidget";

// Hook
import { useQualificationFormik } from "../../../../hooks/useQualificationFormik";

// Row Component
import QualificationRow from "./QualificationRow";

const AddIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const QualificationForm = forwardRef(({ tempId, onSuccess }, ref) => {
  
  const { formik, initialQualification } = useQualificationFormik({ tempId, onSuccess });
  const { values } = formik;

  useImperativeHandle(ref, () => ({
    submitForm: () => formik.submitForm(),
  }));

  return (
    <div className={styles.formContainer}>
      <FormikProvider value={formik}>
        <form>
          
          <FieldArray name="qualifications">
            {({ push, remove, replace }) => (
              <>
                {values.qualifications.length > 0 && (
                  <h2 className={styles.formSectionTitle}>
                    Qualification Details 
                    <img src={BorderIcon} alt="border" />
                  </h2>
                )}

                {values.qualifications.map((item, index) => (
                  <AddFieldWidget
                    key={index}
                    index={index}
                    title={`Qualification ${index + 1}`}
                    enableFieldset={true}
                    onRemove={() => remove(index)}
                    onClear={() => replace(index, initialQualification)}
                  >
                    {/* Render the Smart Row */}
                    <QualificationRow index={index} formik={formik} />
                  </AddFieldWidget>
                ))}

                {/* ADD BUTTON */}
                <div className={styles.addButtonContainer}>
                  <button
                    type="button"
                    className={styles.addButton}
                    onClick={() => push(initialQualification)}
                  >
                    <AddIcon /> Add Qualification
                  </button>
                </div>
              </>
            )}
          </FieldArray>

        </form>
      </FormikProvider>
    </div>
  );
});

export default QualificationForm;