// components/EmployeeModuleHeader/EmployeeModuleHeader.js
import React from "react";
import styles from "./ManagerMappingHeaderContainer.module.css";
import EmployeeModuleHeaderTop from "./ManagerMappingHeaderTop";
import EmployeeModuleHeaderSearch from "./ManagerMappingHeaderSearch";

const EmployeeModuleHeader = ({ title, subtitle, searchTerm, onSearchChange }) => {
  return (
    <div className={styles.search_header_wrapper}>
      <EmployeeModuleHeaderTop title={title} subtitle={subtitle} />
      <EmployeeModuleHeaderSearch />
    </div>
  );
};

export default EmployeeModuleHeader;