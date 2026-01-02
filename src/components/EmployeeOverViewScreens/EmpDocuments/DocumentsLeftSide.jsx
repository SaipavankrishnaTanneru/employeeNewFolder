import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import GenericNavTabs from 'widgets/NavTabs/GenericNavTabs';
import styles from "./DocumentsLeftSide.module.css";
import tab_icon from 'assets/EmployeeQu/tab_icon.svg';

import FilledForms from "./Filled Forms/FilledForms";
import IdProofs from "./Id Proofs/IdProofs";
import SubmittedDocuments from "./SubmittedDocuments/SubmittedDocuments";

const DocumentsLeftSide = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🛠️ CRITICAL FIX: Force clean base path
  const basePath = location.pathname.split("/documents")[0] + "/documents";

  const documentsNavTabs = useMemo(() => [
      { id: "submittedDocuments", label: "Submitted Documents", path: `${basePath}/submittedDocuments` },
      { id: "filledForms", label: "Filled Forms", path: `${basePath}/filledForms` },
      { id: "idProofs", label: "ID Proofs", path: `${basePath}/idProofs` },
    ], [basePath]
  );

  useEffect(() => {
    if (location.pathname === basePath || location.pathname === basePath + '/') {
      navigate(`${basePath}/submittedDocuments`, { replace: true });
    }
  }, [location.pathname, navigate, basePath]);

  return (
    <>
      <div className={styles.documentsLeftTop}>
        <div className={styles.documentsIconHeading}>
          <figure><img src={tab_icon} alt="tab_icon" /></figure>
          <div className={styles.documentsTabHeading}>
            <p className={styles.heading}>Employee Documents</p>
            <p className={styles.description}>Manage all employee documents</p>
          </div>
        </div>
      </div>

      <div className={styles.documentsNavTabNContent}>
        <div className={styles.documentsNavTabs}>
          <GenericNavTabs tabs={documentsNavTabs} />
        </div>
        <Routes>
          <Route index element={<SubmittedDocuments />} />
          <Route path="submittedDocuments" element={<SubmittedDocuments />} />
          <Route path="filledForms" element={<FilledForms />} />
          <Route path="idProofs" element={<IdProofs />} />
        </Routes>
      </div>
    </>
  );
};

export default DocumentsLeftSide;