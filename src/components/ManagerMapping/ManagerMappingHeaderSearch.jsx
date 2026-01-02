// components/EmployeeModuleHeader/EmployeeModuleHeaderSearch.js
import React, { useState, useRef, useEffect } from "react";
import styles from "./ManagerMappingHeaderSearch.module.css";
import FilterDropdown from "./FilterDropdown";
import ApplicationSearchBar from "widgets/application-search-bar-component/ApplicationSearchBar";
import { useNavigate } from "react-router-dom";

const EmployeeModuleHeaderSearch = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchIconClick = () => {
    setIsFilterOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className={styles.searchContainerWithDropdown}>

      <ApplicationSearchBar
        placeholderText="Search for Employee Name"
        onClick={handleSearchIconClick}
        customClass={styles.search_bar_zindex}
      />

      <FilterDropdown
        isOpen={isFilterOpen}
        onApplyFilters={() => {
          setIsFilterOpen(false);
          navigate("/scopes/employee/employeeManager/search-results");   // ⭐ FULL PAGE REPLACE
        }}
      />

      {isFilterOpen && (
        <div
          className={styles.backdrop_overlay}
          onClick={() => setIsFilterOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default EmployeeModuleHeaderSearch;
