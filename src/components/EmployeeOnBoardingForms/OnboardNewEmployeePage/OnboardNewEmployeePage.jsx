
import React, { useState } from 'react'; // <-- Import useState
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './OnboardNewEmployeePage.module.css';
import SkillTestForm from '../../EmployeeSkillTest/SkillTestForm';
import SuccessPage from '../../SuccessPage/SuccessPage'; // <-- 1. Import the new SuccessPage
import leftarrow from 'assets/SkillTest/LeftArrow.svg';
import rightarrow from 'assets/SkillTest/RightArrow.svg';
import Backarrow from 'assets/onboarding_status_table/leftarrow.svg';

// This is the header for the *page*
const PageHeader = () => {
  const navigate = useNavigate();
  // Send user back to the main employee landing page
  const goBack = () => navigate('/scopes/employee'); 

  return (
    <div className={styles.pageHeader}>
      <img src={Backarrow} alt="Back" className={styles.backArrow} onClick={goBack} />
      <h3>Onboard New Employee</h3>
    </div>
  );
};

const OnboardNewEmployeePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const employeeType = location.state?.employeeType;
  const formRef = React.useRef();

  // --- 2. Add state for loading and submission success ---
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Set to true for testing the SuccessPage

  // This is called when the form's internal validation succeeds
  const handleFormSubmit = (values) => {
    console.log("Form Submitted Successfully:", values);
    setIsLoading(true);

    // --- 3. Simulate an API call ---
    // In a real app, you would make your API call here
    // api.submitEmployee(values).then(() => { ... })
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true); // <-- This triggers the success screen
    }, 1500); // Simulate a 1.5 second network request
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page (the modal)
  };

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <PageHeader />
      
    {isSubmitted ? (
  <SuccessPage 
    mode="page"
    title="Temp Id Generated Successfully"
    showButtons={false}
  />
) : (



        <>
          <div className={styles.formTitle}>
            <h4>Employee Info for Skill Test</h4>
          </div>

          <div className={styles.formContainer}>
            {employeeType === 'Teach' ? (
              <SkillTestForm ref={formRef} onSubmitSuccess={handleFormSubmit} />
            ) : (
              <div>This is the "Non Teach" form (to be built)</div>
            )}
          </div>

          {/* Footer with Back/Submit buttons
          <div className={styles.footer}>
            <button
              type="button"
              className={`${styles.footerButton} ${styles.footerBack}`}
              onClick={handleBackClick}
            >
              <img src={leftarrow} alt="Back" />
              <span>Back</span>
            </button>
            <button
              type="button"
              className={`${styles.footerButton} ${styles.footerSubmit}`}
              onClick={handleSubmitClick}
              disabled={isLoading} // <-- 5. Disable button while loading
            >
              <span>{isLoading ? 'Submitting...' : 'Submit'}</span>
              {!isLoading && <img src={rightarrow} alt="Submit" />}
            </button>
          </div> */}
        </>
      )}
    </div>
  );
};

export default OnboardNewEmployeePage;