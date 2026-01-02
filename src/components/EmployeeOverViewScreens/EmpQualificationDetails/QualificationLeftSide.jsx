import React, { useEffect, useMemo } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import GenericNavTabs from 'widgets/NavTabs/GenericNavTabs';
import styles from "./QualificationLeftSide.module.css";
import tab_icon from "assets/EmployeeQu/tab_icon.svg";

// Child Components
import EmpBachelorsInfo from "./Bachelors/EmpBachelorsInfo";
import EmpIntermediateInfo from "./Intermediate/EmpIntermediateInfo";
import EmpSchoolInfo from "./School/EmpSchoolInfo";

const QualificationLeftSide = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🛠️ CRITICAL FIX: Force clean base path
  // Split at the known segment name to remove any trailing sub-routes
  const basePath = location.pathname.split("/qualificationDetails")[0] + "/qualificationDetails";

  const qualificationTabs = useMemo(() => [
    { id: "bachelors", label: "Bachelors", path: `${basePath}/bachelors` },
    { id: "intermediate", label: "Intermediate", path: `${basePath}/intermediate` },
    { id: "school", label: "10Th Class", path: `${basePath}/school` },
  ], [basePath]);

  useEffect(() => {
    // If we are exactly at the parent route, redirect to first tab
    if (location.pathname === basePath || location.pathname === basePath + '/') {
      navigate(`${basePath}/bachelors`, { replace: true });
    }
  }, [location.pathname, navigate, basePath]);

  return (
    <>
      <div className={styles.qualificationLeftTop}>
        <div className={styles.qualificationIconHeading}>
          <figure><img src={tab_icon} alt="tab_icon" /></figure>
          <div className={styles.qualificationTabHeading}>
            <p className={styles.heading}>Qualification Details</p>
            <p className={styles.description}>Analytics And Growth Rate</p>
          </div>
        </div>
      </div>
      <div className={styles.qualificationNavTabNContent}>
        <div className={styles.qualificationNavTabs}>
          <GenericNavTabs tabs={qualificationTabs} />
        </div>
        <Routes>
            <Route index element={<EmpBachelorsInfo />} />
            <Route path="bachelors" element={<EmpBachelorsInfo />} />
            <Route path="intermediate" element={<EmpIntermediateInfo />} />
            <Route path="school" element={<EmpSchoolInfo />} />
        </Routes>
      </div>
    </>
  );
};

export default QualificationLeftSide;