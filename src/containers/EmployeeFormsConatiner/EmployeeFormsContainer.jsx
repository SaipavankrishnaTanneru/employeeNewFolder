import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "useAuth";

// Components
import EmployeeOnboardingHeader from "../../components/EmployeeModuleHeaderComponent/EmployeeOnboardingHeader";
import EmployeeNavTabOnBoarding from "../../components/EmployeeOnBoardingForms/EmployeeOnBoardingFormNav/EmployeeNavtab";
import OnboardingFooter from "../../components/OnBoardingStatus/OnBoardingEmployeeFooter/OnboardingFooter";
import SuccessPage from "../../components/SuccessPage/SuccessPage"; 
import SuccessPageForm from "widgets/sale-done/SuccessPage";

// Forms
import QualificationForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/Qualification&DocumentsUpload/QualificationForm";
import UploadDocumentsForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/Qualification&DocumentsUpload/UploadDocumentsForm";
import BasicInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/BasicInfoForms/EmployeeOnboardingForm";
import AddressInfoFormNew from "../../components/EmployeeOnBoardingForms/FormsEmployee/Address/AddressInfoForm";
import FamilyInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/familyInfo/FamilyInfo";
import PreviousEmployerInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/PreviousEmployeeInfo/PreviousEmployeeInfo";
import AgreementInfoForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/AgreementInfoForm/AgreementInfoForm";
import CategoryInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/CategoryInfoForm/CategoryInfoForm";
import BankInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/BankInfoForm/BankInfoForm";
import SalaryInfoForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/SalaryInfo/salaryInfoForm";

import { onboardingSteps } from "../../config/onboardingTabs";
import styles from "./EmployeeFormsContainer.module.css";

const NewEmployeeOnboardingForms = ({ hideSalary = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const role = user?.roles?.[0] || "DO";
  const isHR = role === "HR";

  const navStateTempId = location.state?.tempId || "";
  const navStateEditMode = location.state?.isEditMode || false;

  const [tempId, setTempId] = useState(navStateTempId);

  // ✅ TWO DIFFERENT SUCCESS STATES
  const [showTempSuccess, setShowTempSuccess] = useState(false); // modal
  const [showFinalSuccess, setShowFinalSuccess] = useState(false); // full page

  const stepRefs = useRef({});

  const activeSteps = useMemo(() => {
    if (hideSalary) {
      return onboardingSteps.filter(
        (step) => step.path !== "salary-info"
      );
    }
    return onboardingSteps;
  }, [hideSalary]);

  const pathParts = location.pathname.replace(/\/$/, "").split("/");
  const lastSegment = pathParts[pathParts.length - 1];

  const basePath = activeSteps.some((s) => s.path === lastSegment)
    ? pathParts.slice(0, -1).join("/")
    : location.pathname.replace(/\/$/, "");

  let currentStepIndex = activeSteps.findIndex(
    (s) => s.path === lastSegment
  );
  if (currentStepIndex === -1) currentStepIndex = 0;

  const totalSteps = activeSteps.length;
  const currentStepPath = activeSteps[currentStepIndex].path;

  // ---------------- REFRESH PROTECTION ----------------
  useEffect(() => {
    if (currentStepIndex > 0 && !tempId) {
      navigate(`${basePath}/basic-info`, { replace: true });
    }
  }, [currentStepIndex, tempId, navigate, basePath]);

  // ---------------- REFS ----------------
  const assignRef = useCallback(
    (path) => (el) => {
      if (el) stepRefs.current[path] = el;
    },
    []
  );

  // ---------------- NEXT / FINISH ----------------
  const handleNextClick = () => {
    const currentRef = stepRefs.current[currentStepPath];
    if (currentRef?.submitForm) {
      currentRef.submitForm();
    } else {
      handleStepSuccess();
    }
  };

  // ---------------- STEP SUCCESS ----------------
  const handleStepSuccess = () => {
    // ✅ FINAL STEP → FULL PAGE SUCCESS
    if (currentStepIndex === totalSteps - 1) {
      setShowFinalSuccess(true);
      return;
    }

    navigate(`${basePath}/${activeSteps[currentStepIndex + 1].path}`);
  };

  // ---------------- FINAL REDIRECT ----------------
  const handleFinalRedirect = () => {
    let reviewPath = "do-review";
    if (role === "HR") reviewPath = "hr-review";
    if (role === "CO") reviewPath = "co-review";
    if (role === "ADMIN") reviewPath = "admin-review";

    navigate(`/scopes/employee/${reviewPath}/onboarding`);
  };

  // ---------------- TEMP ID GENERATED ----------------
  const handleTempIdGenerated = (generatedId) => {
    setTempId(generatedId);

    if (navStateEditMode || navStateTempId) {
      handleStepSuccess();
    } else {
      // ✅ TEMP ID → MODAL SUCCESS
      setShowTempSuccess(true);
    }
  };

  const goBack = () => {
    if (currentStepIndex > 0) {
      navigate(`${basePath}/${activeSteps[currentStepIndex - 1].path}`);
    } else {
      navigate("/scopes/employee");
    }
  };

  const getPrimaryButtonLabel = () => {
    if (currentStepIndex === 0) {
      return tempId || navStateEditMode
        ? "Update & Proceed"
        : "Create Temp ID and Proceed";
    }
    if (currentStepIndex === totalSteps - 1) {
      return "Forward To Divisional Officer";
    }
    return null;
  };

  // ================= FINAL SUCCESS (FULL PAGE) =================
  if (showFinalSuccess) {
    return (
      <SuccessPageForm
        title="Application Forwarded Successfully"
        subTitle="Employee details sent to Divisional Officer"
        applicationNo={tempId}
        statusType="confirmation"
        onBack={handleFinalRedirect}
      />
    );
  }

  return (
    <div className={`${styles.mainContainer} ${isHR ? styles.hrContainer : ""}`}>
      <div className={styles.headerWrapper}>
        <EmployeeOnboardingHeader
          step={currentStepIndex + 1}
          totalSteps={totalSteps}
          onBack={goBack}
          mainTitle={
            isHR ? "New Onboarding Management" : "New Employee Onboarding"
          }
          subHeading={hideSalary ? "" : ""}
        />
      </div>

      {!showTempSuccess && (
        <div className={styles.navTabsWrapper}>
          <EmployeeNavTabOnBoarding
            basePath={basePath}
            steps={activeSteps}
            disabled={!tempId}
          />
        </div>
      )}

      <div className={styles.contentArea}>
        <Routes>
          <Route index element={<Navigate to="basic-info" replace />} />

          <Route
            path="basic-info"
            element={
              <BasicInfo
                ref={assignRef("basic-info")}
                tempId={tempId}
                isEditMode={!!tempId || navStateEditMode}
                onTempIdGenerated={handleTempIdGenerated}
              />
            }
          />

          <Route
            path="address-info"
            element={
              <AddressInfoFormNew
                ref={assignRef("address-info")}
                tempId={tempId}
                onSuccess={handleStepSuccess}
              />
            }
          />

          <Route
            path="family-info"
            element={
              <FamilyInfo
                ref={assignRef("family-info")}
                tempId={tempId}
                onSuccess={handleStepSuccess}
              />
            }
          />

          <Route
            path="previous-employer-info"
            element={
              <PreviousEmployerInfo
                ref={assignRef("previous-employer-info")}
                tempId={tempId}
                onSuccess={handleStepSuccess}
              />
            }
          />

          <Route
            path="qualification"
            element={
              <QualificationForm
                ref={assignRef("qualification")}
                tempId={tempId}
                onSuccess={handleStepSuccess}
              />
            }
          />

          <Route
            path="upload-documents"
            element={
              <UploadDocumentsForm
                ref={assignRef("upload-documents")}
                tempId={tempId}
                onSuccess={handleStepSuccess}
              />
            }
          />

          <Route
            path="category-info"
            element={
              <CategoryInfo
                ref={assignRef("category-info")}
                tempId={tempId}
                onSuccess={handleStepSuccess}
              />
            }
          />

          <Route
            path="bank-info"
            element={
              <BankInfo
                ref={assignRef("bank-info")}
                tempId={tempId}
                onSuccess={handleStepSuccess}
              />
            }
          />

          <Route
            path="agreements"
            element={
              <AgreementInfoForm
                ref={assignRef("agreements")}
                tempId={tempId}
                onSuccess={handleStepSuccess}
              />
            }
          />

          {!hideSalary && (
            <Route
              path="salary-info"
              element={
                <SalaryInfoForm
                  ref={assignRef("salary-info")}
                  tempId={tempId}
                  onSuccess={handleStepSuccess}
                />
              }
            />
          )}
        </Routes>
      </div>

      {!showTempSuccess && (
        <OnboardingFooter
          currentStep={currentStepIndex}
          totalSteps={totalSteps}
          allSteps={activeSteps}
          role={role}
          onNext={handleNextClick}
          onFinish={handleNextClick}
          onBack={goBack}
          hideSkip
          primaryButtonLabel={getPrimaryButtonLabel()}
        />
      )}

      {/* ================= TEMP ID SUCCESS (MODAL) ================= */}
      {showTempSuccess && (
        <SuccessPage
          mode="modal"
          title="Temp Id Generated Successfully"
          subTitle={`ID: ${tempId}`}
          statusType="confirmation"
          onClose={() => setShowTempSuccess(false)}
          onProceed={() => {
            setShowTempSuccess(false);
            navigate(`${basePath}/address-info`);
          }}
          proceedLabel="Proceed"
        />
      )}
    </div>
  );
};

export default NewEmployeeOnboardingForms;
