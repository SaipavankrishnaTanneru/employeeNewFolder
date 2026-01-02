import React from "react";
import styles from "./OnboardingFooter.module.css";
import Button from 'widgets/Button/Button';
import leftarrow from 'assets/EmployeeOnBoarding/leftarrow';
import rightarrow from 'assets/EmployeeOnBoarding/rightarrow';
import skipicon from 'assets/EmployeeOnBoarding/skipicon.svg';
import { ReactComponent as EditIcon } from 'assets/icons/editIcon.svg';

const OnboardingFooter = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onEdit,
  onFinish,
  allSteps,
  role,
  isSubmitting = false,
  primaryButtonLabel = null,
  skipButtonLabel = null,
  hideSkip = false,
  showEdit = false
}) => {
  const isLastStep = currentStep === totalSteps - 1;
  const nextStepLabel = allSteps[currentStep + 1]?.label;

  const finishButtonLabel = role === "CO" ? "Proceed to Checklist" : "Add CTC Info";

  const buttonLabel =
    primaryButtonLabel ||
    (isLastStep ? finishButtonLabel : `Proceed to ${nextStepLabel}`);

  const skipLabel =
    skipButtonLabel ||
    (role === "CO"
      ? "Skip all and Proceed to Checklist"
      : "Skip all and Add CTC info");

  const handlePrimaryClick = () => {
    if (isLastStep) {
      if (onFinish && !isSubmitting) onFinish();
    } else {
      onNext();
    }
  };

  const handleSkipClick = () => {
    if (onFinish && !isSubmitting) onFinish();
  };

  const isFormikSubmit =
    typeof onFinish === "function" &&
    primaryButtonLabel?.includes("Checklist");

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.center}>
        {/* BACK */}
        <Button
          buttonname="Back"
          lefticon={leftarrow}
          variant="secondary"
          onClick={onBack}
          type="button"
          disabled={isSubmitting}
          width="110px"
        />

        {/* EDIT - Fixed the icon passing logic */}
        {/* {showEdit && (
          <Button
            buttonname="Edit"
            // Wrap the path in an img tag because Button.js renders {lefticon} directly
           lefticon={<EditIcon width="16" height="16" />}
            variant="secondary"
            onClick={onEdit || onBack}
            type="button"
            disabled={isSubmitting}
            width="110px"
      
          />
        )} */}

        {/* PROCEED */}
        <Button
          buttonname={buttonLabel}
          righticon={rightarrow}
          variant="primary"
          onClick={!isFormikSubmit ? handlePrimaryClick : undefined}
          type={isFormikSubmit ? "submit" : "button"}
          disabled={isSubmitting}
          width="250px"
        />
      </div>

      {!hideSkip && (
        <div className={styles.right}>
          <button
            className={styles.skipButton}
            onClick={handleSkipClick}
            disabled={isSubmitting}
            type="button"
          >
            <img src={skipicon} alt="skip" className={styles.skipIcon} />
            <span className={styles.skipText}>{skipLabel}</span>
          </button>
        </div>
      )}
    </footer>
  );
};

export default OnboardingFooter;