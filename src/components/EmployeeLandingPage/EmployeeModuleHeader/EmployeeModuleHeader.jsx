import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeModuleHeaderIcon from "../EmployeeModuleHeaderIcon/EmployeeModuleHeaderIcon";
import styles from "./EmployeeModuleHeader.module.css";
import blueLine from "assets/application-analytics/blue_arrow_line.png";
import Searchbox from "../../Searchbox/Searchbox";
import EmployeeFilter from "../EmployeeFilter/EmployeeFilter";
 
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M12.6 12.6L15.75 15.75M14.25 8.25C14.25 11.5637 11.5637 14.25 8.25 14.25C4.93629 14.25 2.25 11.5637 2.25 8.25C2.25 4.93629 4.93629 2.25 8.25 2.25C11.5637 2.25 14.25 4.93629 14.25 8.25Z"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
 
const EmployeeModuleHeader = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
 
  const searchContainerRef = useRef(null);
  const filterRef = useRef(null);
  const navigate = useNavigate();
 
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearchSubmit) {
      onSearchSubmit();
    }
  };
 
  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target)
      ) {
        setIsFilterOpen(false);
      }
    };
 
    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
 
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isFilterOpen]);
 
  return (
    <>
      {/* BLUR EVERYTHING */}
      {isFilterOpen && (
        <div
          className={styles.blurOverlay}
          onClick={() => setIsFilterOpen(false)}
        />
      )}
 
      {/* HEADER (will blur) */}
      <div className={styles.search_header_wrapper}>
        <div className={styles.headerTop}>
          <EmployeeModuleHeaderIcon height="54" width="54" />
 
          <div className={styles.application_header_text}>
            <h2 className={styles.application_search_header}>
              Employee Module
            </h2>
            <p className={styles.application_sub_text}>
              Access and manage employee onboarding, status, and comprehensive
              details seamlessly.
            </p>
          </div>
        </div>
 
        <figure className={styles.blueLine}>
          <img src={blueLine} alt="decorative line" />
        </figure>
 
        <div
          ref={searchContainerRef}
          className={styles.searchContainer}
          onClick={(e) => {
            e.stopPropagation();
            setIsFilterOpen(true);
          }}
          onKeyDown={handleKeyDown}
        >
          <Searchbox
            icon={<SearchIcon />}
            placeholderText="Search with employee code, full name"
            onValueChange={onSearchChange}
            value={searchTerm}
          />
        </div>
      </div>
 
      {/* FILTER (ABOVE BLUR) */}
      {isFilterOpen && (
        <div
          ref={filterRef}
          className={styles.filterWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <EmployeeFilter
            onApplyFilters={() => {
              setIsFilterOpen(false);
              navigate("/scopes/employee/employeeManager/search-results");
            }}
          />
        </div>
      )}
    </>
  );
};
 
export default EmployeeModuleHeader;