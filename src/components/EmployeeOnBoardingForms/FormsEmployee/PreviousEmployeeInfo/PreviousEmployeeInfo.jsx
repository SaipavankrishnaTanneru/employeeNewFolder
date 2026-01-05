
 
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FieldArray, FormikProvider, Field } from "formik";
import styles from "./PreviousEmployeeInfo.module.css";
 
// Assets & Widgets
import dividerline from 'assets/Qualification/border.svg';
import UploadBeforeImg from 'assets/EmployeeOnBoarding/UploadBeforeImg.svg';
import UploadAfterImg from 'assets/EmployeeOnBoarding/UploadAfterImg.svg';
import SuccessUploadedImg from 'assets/EmployeeOnBoarding/SuccessUploadTick.svg';
import BeforeUploadedImg from 'assets/EmployeeOnBoarding/BeforeUploadEmptyC.svg';
import AddFieldWidget from "widgets/AddFieldWidget/AddFieldWidget";
import Inputbox from "widgets/Inputbox/InputBox";
import DocumentUploadModal from "./DocumentUploadModal";
 
// Hook
import { usePreviousEmployerFormik } from "../../../../hooks/usePreviousEmployerFormik";
 
 
const PreviousEmployerInfo = forwardRef(({ tempId, onSuccess }, ref) => {
 
  const { formik, initialEmployer } = usePreviousEmployerFormik({ tempId, onSuccess });
  const { values, handleChange, setFieldValue } = formik;
  const [openModalIndex, setOpenModalIndex] = useState(null);
 
  // Expose submitForm to parent component via ref
  useImperativeHandle(ref, () => ({
    submitForm: () => formik.submitForm(),
  }));
 
  return (
    <div className={styles.formContainer}>
      <FormikProvider value={formik}>
        <form>
          {/* HEADER */}
          <div className={styles.section_header}>
            <h3 className={styles.section_title}>Previous Employer Details</h3>
            <img src={dividerline} alt="divider" className={styles.dividerImage} />
          </div>
 
          <FieldArray name="previousEmployers">
            {({ push, remove, replace }) => (
              <>
                {values.previousEmployers.map((item, index) => (
                  <AddFieldWidget
                    key={index}
                    index={index}
                    title={`Employer ${index + 1}`}
                    enableFieldset={true} // Forces Card Style
                    showSimpleTitle={false}
                    onRemove={() => remove(index)}
                    onClear={() => replace(index, initialEmployer)}
                  >
                    <div className={styles.formGrid}>
                     
                      {/* Row 1 */}
                      <Inputbox
                        label="Company Name"
                        name={`previousEmployers.${index}.companyName`}
                        value={item.companyName}
                        onChange={handleChange}
                        placeholder="Enter Company Name"
                      />
                      <Inputbox
                        label="Designation"
                        name={`previousEmployers.${index}.designation`}
                        value={item.designation}
                        onChange={handleChange}
                        placeholder="Enter Designation"
                      />
                     
                      {/* Dates: Changed to type="date" for correct ISO conversion */}
                      <Inputbox
                        type="date"
                        label="From Date"
                        name={`previousEmployers.${index}.fromDate`}
                        value={item.fromDate}
                        onChange={handleChange}
                      />
                      <Inputbox
                        type="date"
                        label="To Date"
                        name={`previousEmployers.${index}.toDate`}
                        value={item.toDate}
                        onChange={handleChange}
                      />
 
                      {/* Row 2 */}
                      <Inputbox
                        label="Leaving Reason"
                        name={`previousEmployers.${index}.leavingReason`}
                        value={item.leavingReason}
                        onChange={handleChange}
                        placeholder="Enter Reason"
                      />
                      <Inputbox
                        label="Address Line 1"
                        name={`previousEmployers.${index}.companyAddressLine1`}
                        value={item.companyAddressLine1}
                        onChange={handleChange}
                        placeholder="Address Line 1"
                      />
                      <Inputbox
                        label="Address Line 2"
                        name={`previousEmployers.${index}.companyAddressLine2`}
                        value={item.companyAddressLine2}
                        onChange={handleChange}
                        placeholder="Address Line 2"
                      />
                      <Inputbox
                        label="Nature of Duties"
                        name={`previousEmployers.${index}.natureOfDuties`}
                        value={item.natureOfDuties}
                        onChange={handleChange}
                        placeholder="Enter Duties"
                      />
 
                      {/* Row 3 - Salary Fields */}
                      <Inputbox
                        type="number"
                        label="Gross Salary (Monthly)"
                        name={`previousEmployers.${index}.grossSalaryPerMonth`}
                        value={item.grossSalaryPerMonth}
                        onChange={handleChange}
                        placeholder="Enter Salary"
                      />
                      <Inputbox
                        type="number"
                        label="CTC"
                        name={`previousEmployers.${index}.ctc`}
                        value={item.ctc}
                        onChange={handleChange}
                        placeholder="Enter CTC"
                      />
                     
                      {/* Upload Documents Button */}
                     
                      <div className={styles.uploadDocumentsContainer}>
                        {(() => {
                          const documents = item.documents || {};
                          const hasFiles = Object.values(documents).some(
                            (files) => files && files.length > 0
                          );
                         
                          return (
                            <>
                            <label className={styles.fieldLabel}>
                               <span>Upload Documents</span>
                           </label>
                           
                            <button
                              type="button"
                              label="Upload Documents"
                              className={`${styles.uploadDocumentsButton} ${hasFiles ? styles.uploadDocumentsButtonSuccess : ''}`}
                              onClick={() => setOpenModalIndex(index)}
                            >
                              {hasFiles ? (
                                <>
                                  <div className={styles.uploadIconCircle}>
                                    <img src={UploadAfterImg} alt="upload" className={styles.uploadIcon} />
                                  </div>
                                  <span>Successfully Uploaded</span>
                                  <div className={styles.checkmarkCircle}>
                                    <img src={SuccessUploadedImg} alt="upload" className={styles.uploadIcon} />
                                  </div>
                                </>
                              ) : (
                                <>
                                 <img src={UploadBeforeImg} alt="upload" className={styles.uploadIcon} />
                                  <span>Click Here To Upload </span>
                                  <div className={styles.checkmarkCircle}>
                                    <img src={BeforeUploadedImg} alt="upload" className={styles.uploadIcon} />
                                  </div>
                                </>
                              )}
                            </button>
                          </>);
                        })()}
                       
                      </div>
 
                    </div>
                   
                  </AddFieldWidget>
                ))}
 
                {/* ADD BUTTON */}
                <div className={styles.addButtonContainer}>
                  <button
                    type="button"
                    className={styles.addButton}
                    onClick={() => push(initialEmployer)}
                  >
                    + Add Employer
                  </button>
                </div>
              </>
            )}
          </FieldArray>
 
        </form>
      </FormikProvider>
     
      {/* Document Upload Modals */}
      {values.previousEmployers.map((item, index) => (
        <DocumentUploadModal
          key={index}
          isOpen={openModalIndex === index}
          onClose={() => setOpenModalIndex(null)}
          companyName={item.companyName || `Company ${index + 1}`}
          documents={item.documents || {}}
          onDocumentsChange={(newDocuments) => {
            setFieldValue(`previousEmployers.${index}.documents`, newDocuments);
          }}
        />
      ))}
    </div>
  );
});
 
 
 
export default PreviousEmployerInfo;
 