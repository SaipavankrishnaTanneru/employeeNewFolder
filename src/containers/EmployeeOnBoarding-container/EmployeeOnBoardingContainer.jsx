import React from 'react';
import { Routes, Route } from 'react-router-dom';

import EmployeeLanding from '../../components/EmployeeLandingPage/EmployeeLanding';
import OnboardNewEmployeePage from '../../components/EmployeeOnBoardingForms/OnboardNewEmployeePage/OnboardNewEmployeePage';
import EmployeeModuleContainer from '../EmployeeModuleConatiner/EmployeeModuleConatianer';
import ManagerMappingContainer from '../ManagerMappingContainer/ManagerMappingContainer';


// ... imports

const EmployeeOnBoardingContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeLanding />} />
      <Route path="/start" element={<OnboardNewEmployeePage />} />
      
      {/* ⚠️ DELETE THIS LINE COMPLETELY ⚠️ */}
      {/* <Route path="/new-employee-onboarding/*" ... /> */} 
      
      {/* Only these should remain: */}
      <Route path="/status/*" element={<EmployeeModuleContainer />} />
      <Route path="/employeeManager/*" element={<ManagerMappingContainer />} />
    </Routes>
  );
};

export default EmployeeOnBoardingContainer;