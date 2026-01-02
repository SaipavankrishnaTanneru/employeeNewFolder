// components/EmployeeFilter/EmployeeFilter.js
import React, { useState } from "react";
import Dropdown from "widgets/Dropdown/Dropdown";
import styles from "./EmployeeFilter.module.css";



const EmployeeFilter = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    city: "",
    employeeType: "",
  });

  const cityResults = ["New York", "London", "Mumbai"];
  const employeeTypeResults = ["Full Time", "Part Time", "Contract"];

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    onSearch?.(filters);
  };

  return (
    <div className={styles.filterWrapper}>
      <h4 className={styles.title}>Filter</h4>

      <div className={styles.field}>
        <Dropdown
          dropdownname="City"
          name="city"
          results={cityResults}
          value={filters.city}
          onChange={handleDropdownChange}
        />
      </div>

      <div className={styles.field}>
        <Dropdown
          dropdownname="Employee Type"
          name="employeeType"
          results={employeeTypeResults}
          value={filters.employeeType}
          onChange={handleDropdownChange}
        />
      </div>

      <button className={styles.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default EmployeeFilter;
