import React, { useState, useEffect } from "react";
import styles from "./PaymentPopup.module.css";
import PopupHeader from "../popup-headerpart/PopupHeader";
import PopupNavTabs from "../popup-navtabs/PopupNavTabs";
import CashForms from "../popup-formspart/CashForms";
import DDForms from "../popup-formspart/DDForms";
import ChequeForms from "../popup-formspart/ChequeForms";
import CardForms from "../popup-formspart/CardForms";
import Button from "../../Button/Button";
import { submitSchoolApplicationSale, mapFormDataToPayload, submitSchoolFastSale, mapFormDataToFastSalePayload, submitSchoolApplicationSaleCreate, mapSchoolApplicationSaleToPayload } from "../../../hooks/school-apis/SchoolSubmissionApi";
import { submitCollegeApplicationConfirmation, mapCollegeFormDataToPayload, submitCollegeApplicationSale, mapCollegeApplicationSaleToPayload, submitCollegeFastSale, mapCollegeFastSaleToPayload, submitCollegeApplicationSaleComplete, mapCollegeApplicationSaleCompleteToPayload } from "../../../hooks/college-apis/CollegeSubmissionApi";
import { getCurrentDate } from "../../../utils/getCurrentDate";

const PaymentPopup = ({ 
  onClose, 
  title, 
  formData: schoolFormData, 
  siblings, 
  detailsObject,
  type = "school", // "school" or "college"
  collegeFormData, // For college: concession form data
  collegeAcademicFormData, // For college: academic form data (orientation info)
  saleType = "regular", // "regular" or "fast"
  isConfirmation = false, // true for confirmation flow, false for sale flow
  onSuccess // Callback function when submission is successful
}) => {
  // Determine button text based on sale type, form type, and confirmation status
  const getButtonText = () => {
    if (saleType === "fast") {
      // For college fast sale, show "Finish Fast Sale"
      if (type === "college") {
        return "Finish Fast Sale";
      }
      // For school fast sale, show "Finish Sale"
      return "Finish Sale";
    }
    // For regular sale/confirmation
    if (isConfirmation) {
      // For confirmation flows
      if (type === "school") {
        return "Finish Sale & Confirmation";
      }
      if (type === "college") {
        return "Finish College Confirmation";
      }
    }
    // For regular college application sale, show "Finish College Sale"
    if (type === "college" && saleType === "regular") {
      return "Finish College Sale";
    }
    // For regular sale - school shows "Finish Sale"
    return "Finish Sale";
  };

  const buttonText = getButtonText();
  const [activeTab, setActiveTab] = useState("cash");
  const [paymentFormData, setPaymentFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Set current date when component mounts
  useEffect(() => {
    const currentDate = getCurrentDate();
    setPaymentFormData((prev) => ({
      ...prev,
      paymentDate: currentDate
    }));
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinishSale = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      let payload;
      let response;

      if (type === "college") {
        // Check if it's confirmation first, then fast sale, then regular sale (application sale)
        if (isConfirmation) {
          // Map college confirmation form data to API payload
          console.log('🔍 ===== COLLEGE CONFIRMATION DATA BEFORE MAPPING (PaymentPopup) =====');
          console.log('collegeFormData:', collegeFormData);
          console.log('collegeAcademicFormData:', collegeAcademicFormData);
          console.log('paymentFormData:', paymentFormData);
          console.log('detailsObject:', detailsObject);
          console.log('activeTab:', activeTab);
          console.log('==============================================================');
          
          payload = mapCollegeFormDataToPayload(
            collegeFormData || {},
            collegeAcademicFormData || {},
            paymentFormData,
            detailsObject || {},
            activeTab
          );

          // Log the complete payload object to console in a readable format
          console.log("===========================================");
          console.log("📤 SUBMITTING COLLEGE CONFIRMATION PAYLOAD TO BACKEND");
          console.log("===========================================");
          console.log("📋 Complete Payload Object:");
          console.log(payload);
          console.log("===========================================");
          console.log("📄 Payload as JSON (formatted):");
          console.log(JSON.stringify(payload, null, 2));
          console.log("===========================================");
          console.log("📊 Payload Summary:");
          console.log("  - studAdmsNo:", payload.studAdmsNo);
          console.log("  - academicYearId:", payload.academicYearId);
          console.log("  - joiningClassId:", payload.joiningClassId);
          console.log("  - branchId:", payload.branchId);
          console.log("  - studentTypeId:", payload.studentTypeId);
          console.log("  - cityId:", payload.cityId);
          console.log("  - courseNameId:", payload.courseNameId);
          console.log("  - Concessions count:", payload.concessions?.length || 0);
          console.log("  - Payment Mode ID:", payload.paymentDetails?.paymentModeId);
          console.log("  - Payment Amount:", payload.paymentDetails?.amount);
          console.log("===========================================");

          // Submit to college confirmation API
          response = await submitCollegeApplicationConfirmation(payload);
        } else if (saleType === "fast") {
          // Map college fast sale form data to API payload
          console.log('🔍 ===== COLLEGE FAST SALE DATA BEFORE MAPPING (PaymentPopup) =====');
          console.log('collegeFormData (full form):', collegeFormData);
          console.log('paymentFormData:', paymentFormData);
          console.log('detailsObject:', detailsObject);
          console.log('activeTab:', activeTab);
          console.log('==============================================================');
          
          payload = mapCollegeFastSaleToPayload(
            collegeFormData || {},
            paymentFormData,
            detailsObject || {},
            activeTab
          );

          // Log the complete payload object to console in a readable format
          console.log("===========================================");
          console.log("📤 SUBMITTING COLLEGE FAST SALE PAYLOAD TO BACKEND");
          console.log("===========================================");
          console.log("📋 Complete Payload Object:");
          console.log(payload);
          console.log("===========================================");
          console.log("📄 Payload as JSON (formatted):");
          console.log(JSON.stringify(payload, null, 2));
          console.log("===========================================");
          console.log("📊 Payload Summary:");
          console.log("  - studAdmsNo:", payload.studAdmsNo);
          console.log("  - firstName:", payload.firstName);
          console.log("  - lastName:", payload.lastName);
          console.log("  - genderId:", payload.genderId);
          console.log("  - academicYearId:", payload.academicYearId);
          console.log("  - branchId:", payload.branchId);
          console.log("  - classId:", payload.classId);
          console.log("  - orientationId:", payload.orientationId);
          console.log("  - studentTypeId:", payload.studentTypeId);
          console.log("  - Payment Mode ID:", payload.paymentDetails?.paymentModeId);
          console.log("  - Payment Amount:", payload.paymentDetails?.amount);
          console.log("===========================================");

          // Submit to college fast sale API
          console.log("📤 Using college fast sale endpoint: /student_fast_sale/fast-sale");
          response = await submitCollegeFastSale(payload);
        } else if (saleType === "regular") {
          // Map college application sale complete form data to API payload
          console.log('🔍 ===== COLLEGE APPLICATION SALE COMPLETE DATA BEFORE MAPPING (PaymentPopup) =====');
          console.log('collegeFormData (full form):', collegeFormData);
          console.log('paymentFormData:', paymentFormData);
          console.log('detailsObject:', detailsObject);
          console.log('activeTab:', activeTab);
          console.log('==============================================================');
          
          payload = mapCollegeApplicationSaleCompleteToPayload(
            collegeFormData || {},
            paymentFormData,
            detailsObject || {},
            activeTab
          );

          // Log the complete payload object to console in a readable format
          console.log("===========================================");
          console.log("📤 SUBMITTING COLLEGE APPLICATION SALE COMPLETE PAYLOAD TO BACKEND");
          console.log("===========================================");
          console.log("📋 Complete Payload Object:");
          console.log(payload);
          console.log("===========================================");
          console.log("📄 Payload as JSON (formatted):");
          console.log(JSON.stringify(payload, null, 2));
          console.log("===========================================");
          console.log("📊 Payload Summary:");
          console.log("  - studAdmsNo:", payload.studAdmsNo);
          console.log("  - firstName:", payload.firstName);
          console.log("  - lastName:", payload.lastName);
          console.log("  - genderId:", payload.genderId);
          console.log("  - appTypeId:", payload.appTypeId);
          console.log("  - quotaId:", payload.quotaId);
          console.log("  - academicYearId:", payload.academicYearId);
          console.log("  - branchId:", payload.branchId);
          console.log("  - classId:", payload.classId);
          console.log("  - orientationId:", payload.orientationId);
          console.log("  - studentTypeId:", payload.studentTypeId);
          console.log("  - Siblings count:", payload.siblings?.length || 0);
          console.log("  - Concessions count:", payload.concessions?.length || 0);
          console.log("  - Payment Mode ID:", payload.paymentDetails?.paymentModeId);
          console.log("  - Payment Amount:", payload.paymentDetails?.amount);
          console.log("===========================================");

          // Submit to college application sale complete API
          console.log("📤 Using college application sale complete endpoint: /student_fast_sale/college-application-sale");
          response = await submitCollegeApplicationSaleComplete(payload);
        }
      } else {
        // Check if it's fast sale
        if (saleType === "fast") {
          // Map school form data to fast sale API payload
          payload = mapFormDataToFastSalePayload(
            schoolFormData || {},
            paymentFormData,
            detailsObject || {},
            activeTab
          );

          // Log the complete payload object to console in a readable format
          console.log("===========================================");
          console.log("📤 SUBMITTING SCHOOL FAST SALE PAYLOAD TO BACKEND");
          console.log("===========================================");
          console.log("📋 Complete Payload Object:");
          console.log(payload);
          console.log("===========================================");
          console.log("📄 Payload as JSON (formatted):");
          console.log(JSON.stringify(payload, null, 2));
          console.log("===========================================");
          console.log("📊 Payload Summary:");
          console.log("  - studAdmsNo:", payload.studAdmsNo);
          console.log("  - firstName:", payload.firstName);
          console.log("  - academicYearId:", payload.academicYearId);
          console.log("  - branchId:", payload.branchId);
          console.log("  - classId:", payload.classId);
          console.log("  - Payment Mode ID:", payload.paymentDetails?.paymentModeId);
          console.log("  - Payment Amount:", payload.paymentDetails?.amount);
          console.log("===========================================");

          // Submit to fast sale API
          response = await submitSchoolFastSale(payload);
        } else {
          // Check if it's confirmation or sale
          if (isConfirmation) {
            // Map school confirmation form data to confirmation API payload (with parents, siblings, languages, concessions)
            console.log('🔍 ===== SCHOOL CONFIRMATION DATA BEFORE MAPPING (PaymentPopup) =====');
            console.log('schoolFormData (full form):', schoolFormData);
            console.log('siblings:', siblings);
            console.log('paymentFormData:', paymentFormData);
            console.log('detailsObject:', detailsObject);
            console.log('activeTab:', activeTab);
            console.log('==============================================================');
            
            payload = mapFormDataToPayload(
              schoolFormData || {},
              siblings || [],
              paymentFormData,
              detailsObject || {},
              activeTab
            );

            // Log the complete payload object to console in a readable format
            console.log("===========================================");
            console.log("📤 SUBMITTING SCHOOL CONFIRMATION PAYLOAD TO BACKEND");
            console.log("===========================================");
            console.log("📋 Complete Payload Object:");
            console.log(payload);
            console.log("===========================================");
            console.log("📄 Payload as JSON (formatted):");
            console.log(JSON.stringify(payload, null, 2));
            console.log("===========================================");
            console.log("📊 Payload Summary:");
            console.log("  - studAdmsNo:", payload.studAdmsNo);
            console.log("  - appConfDate:", payload.appConfDate);
            console.log("  - orientationId:", payload.orientationId);
            console.log("  - Parents count:", payload.parents?.length || 0);
            console.log("  - Siblings count:", payload.siblings?.length || 0);
            console.log("  - Languages count:", payload.languages?.length || 0);
            console.log("  - Concessions count:", payload.concessions?.length || 0);
            console.log("  - Payment Mode ID:", payload.paymentDetails?.paymentModeId);
            console.log("  - Payment Amount:", payload.paymentDetails?.amount);
            console.log("===========================================");

            // Submit to school confirmation API
            console.log("📤 Using school confirmation endpoint: /application-confirmation/confirm-school");
            response = await submitSchoolApplicationSale(payload);
          } else {
            // Map school form data to create API payload (simpler structure)
            console.log('🔍 ===== SCHOOL APPLICATION SALE DATA BEFORE MAPPING (PaymentPopup) =====');
            console.log('schoolFormData (full form):', schoolFormData);
            console.log('schoolFormData keys:', Object.keys(schoolFormData || {}));
            console.log('Personal Info:', {
              firstName: schoolFormData?.firstName,
              lastName: schoolFormData?.surName,
              gender: schoolFormData?.gender,
              aaparNo: schoolFormData?.aaparNo,
              dob: schoolFormData?.dob,
              aadharCardNo: schoolFormData?.aadharCardNo,
            });
            console.log('Orientation Info:', {
              academicYearId: schoolFormData?.academicYearId,
              branchId: schoolFormData?.branchId,
              campusId: schoolFormData?.campusId,
              classId: schoolFormData?.classId,
              joiningClassId: schoolFormData?.joiningClassId,
              orientationId: schoolFormData?.orientationId,
              studentTypeId: schoolFormData?.studentTypeId,
              joiningClass: schoolFormData?.joiningClass,
              orientationName: schoolFormData?.orientationName,
              studentType: schoolFormData?.studentType,
            });
            console.log('Parent Info:', {
              fatherName: schoolFormData?.fatherName,
              fatherMobile: schoolFormData?.fatherMobile,
            });
            console.log('Address Info:', {
              doorNo: schoolFormData?.doorNo,
              streetName: schoolFormData?.streetName,
              cityId: schoolFormData?.cityId,
              stateId: schoolFormData?.stateId,
              districtId: schoolFormData?.districtId,
              pincode: schoolFormData?.pincode,
            });
            console.log('paymentFormData:', paymentFormData);
            console.log('detailsObject:', detailsObject);
            console.log('activeTab:', activeTab);
            console.log('==============================================================');
            
            payload = mapSchoolApplicationSaleToPayload(
              schoolFormData || {},
              paymentFormData,
              detailsObject || {},
              activeTab
            );

            // Log the complete payload object to console in a readable format
            console.log("===========================================");
            console.log("📤 SUBMITTING SCHOOL APPLICATION SALE CREATE PAYLOAD TO BACKEND");
            console.log("===========================================");
            console.log("📋 Complete Payload Object:");
            console.log(payload);
            console.log("===========================================");
            console.log("📄 Payload as JSON (formatted):");
            console.log(JSON.stringify(payload, null, 2));
            console.log("===========================================");
            console.log("📊 Payload Summary:");
            console.log("  - studAdmsNo:", payload.studAdmsNo);
            console.log("  - firstName:", payload.firstName);
            console.log("  - lastName:", payload.lastName);
            console.log("  - genderId:", payload.genderId);
            console.log("  - academicYearId:", payload.academicYearId);
            console.log("  - branchId:", payload.branchId);
            console.log("  - classId:", payload.classId);
            console.log("  - orientationId:", payload.orientationId);
            console.log("  - Payment Mode ID:", payload.paymentDetails?.paymentModeId);
            console.log("  - Payment Amount:", payload.paymentDetails?.amount);
            console.log("===========================================");

            // Submit to school sale create API
            console.log("📤 Using school sale create endpoint: /student-admissions-sale/create");
            response = await submitSchoolApplicationSaleCreate(payload);
          }
        }
      }
      
      console.log("✅ Submission successful:", response);
      setSubmitSuccess(true);
      
      // Call onSuccess callback if provided
      console.log("🔍 Checking if onSuccess callback exists:", !!onSuccess);
      if (onSuccess) {
        console.log("📞 Calling onSuccess callback with response and detailsObject");
        onSuccess(response, detailsObject);
        console.log("✅ onSuccess callback executed");
      } else {
        console.log("⚠️ No onSuccess callback provided, using fallback close");
        // Fallback: Close popup after a short delay if no onSuccess callback
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setSubmitError(error.response?.data?.message || error.message || "Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCashFinishSale = () => {
    handleFinishSale();
  };

  const handleCardFinishSale = () => {
    handleFinishSale();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <PopupHeader step={3} onClose={onClose} title={title} />

        <PopupNavTabs onChange={handleTabChange} />

        <div className={styles.modalContent}>
          {submitError && (
            <div style={{ padding: '10px', margin: '10px', backgroundColor: '#fee', color: '#c00', borderRadius: '4px' }}>
              Error: {submitError}
            </div>
          )}
          {submitSuccess && (
            <div style={{ padding: '10px', margin: '10px', backgroundColor: '#efe', color: '#0c0', borderRadius: '4px' }}>
              Success! Form submitted successfully.
            </div>
          )}

          {activeTab === "cash" && (
            <CashForms formData={paymentFormData} onChange={handleFormChange} />
          )}

          {activeTab === "dd" && (
            <>
              <DDForms formData={paymentFormData} onChange={handleFormChange} />
              <div className={styles.footer}>
                <Button
                  buttonname={isSubmitting ? "Submitting..." : buttonText}
                  righticon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 10H16M16 10L10 4M16 10L10 16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  variant="primary"
                  onClick={handleFinishSale}
                  disabled={isSubmitting}
                />
              </div>
            </>
          )}

          {activeTab === "cheque" && (
            <>
              <ChequeForms formData={paymentFormData} onChange={handleFormChange} />
              <div className={styles.footer}>
                <Button
                  buttonname={isSubmitting ? "Submitting..." : buttonText}
                  righticon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 10H16M16 10L10 4M16 10L10 16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  variant="primary"
                  onClick={handleFinishSale}
                  disabled={isSubmitting}
                />
              </div>
            </>
          )}

          {activeTab === "card" && (
            <CardForms formData={paymentFormData} onChange={handleFormChange} />
          )}
        </div>

        {activeTab === "cash" && (
          <div className={styles.footer}>
            <Button
              buttonname={isSubmitting ? "Submitting..." : buttonText}
              righticon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 10H16M16 10L10 4M16 10L10 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              variant="primary"
              onClick={handleCashFinishSale}
              disabled={isSubmitting}
            />
          </div>
        )}

        {activeTab === "card" && (
          <div className={styles.footer}>
            <Button
              buttonname={isSubmitting ? "Submitting..." : buttonText}
              righticon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 10H16M16 10L10 4M16 10L10 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              variant="primary"
              onClick={handleCardFinishSale}
              disabled={isSubmitting}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPopup;
