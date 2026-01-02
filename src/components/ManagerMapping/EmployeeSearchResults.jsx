// components/ManagerMapping/EmployeeSearchResults.js
import React from "react";
import { useNavigate } from "react-router-dom";
import EmployeeCard from 'widgets/Cards/EmployeeCard/EmployeeCardWithCheckBox';
import styles from "./EmployeeSearchResults.module.css";

import empprofile from 'assets/managermappingsearch/empprofile.svg';
import blueLine from 'assets/managermappingsearch/bluefilterline.svg';
import breadcrumarrow from 'assets/managermappingsearch/breadcrumarrow.svg';
import rightarrow from 'assets/managermappingsearch/rightarrow.jsx';
import Button from 'widgets/Button/Button';

const EmployeeSearchResults = ({ selectedEmployees, setSelectedEmployees }) => {

  const navigate = useNavigate();

  // SAMPLE LIST
  const sampleEmployees = [
    { id: "HYD-001", name: "Devansh.N", dept: "IT Cell", level: "Level 4", status: "full time", image: empprofile },
    { id: "HYD-002", name: "Devansh.N", dept: "IT Cell", level: "Level 4", status: "Contract", image: empprofile },
    { id: "HYD-003", name: "Devansh.N", dept: "IT Cell", level: "Level 4", status: "Left", image: empprofile },
    { id: "HYD-004", name: "Devansh.N", dept: "IT Cell", level: "Level 4", status: "Full time", image: empprofile },
    { id: "HYD-005", name: "Devansh.N", dept: "IT Cell", level: "Level 4", status: "Contract", image: empprofile },
  ];

  // Handle Select Toggle
  const handleSelect = (employee, checked) => {
    if (checked) {
      setSelectedEmployees(prev => [...prev, employee]);
    } else {
      setSelectedEmployees(prev => prev.filter(e => e.id !== employee.id));
    }
  };

  return (
    <div className={styles.search_wrapper}>

      {/* Top Row */}
      <div className={styles.topRow}>
        <h2 className={styles.title}>Recent Search</h2>

        {selectedEmployees.length > 0 && (
          <p className={styles.selectedCount}>
            <span className={styles.countNumber}>{selectedEmployees.length}</span>
            <span className={styles.countLabel}> Selected</span>
          </p>
        )}
      </div>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <span>Hyderabad</span>
        <img src={breadcrumarrow} className={styles.bcIcon} />
        <span>BanjaraHills</span>
        <img src={breadcrumarrow} className={styles.bcIcon} />
        <span>Teaching</span>
      </div>

      {/* Card List */}
      <div className={styles.cardRow}>
        {sampleEmployees.map((emp, idx) => (
          <EmployeeCard
            key={idx}
            id={emp.id}
            name={emp.name}
            dept={emp.dept}
            image={emp.image}
            level={emp.level}
            status={emp.status}
            styleImg={blueLine}
            isSelected={selectedEmployees.some(e => e.id === emp.id)}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className={styles.buttonRow}>
        <Button
  buttonname="Cancel"
  type="button"
  variant="secondary"
  width="108px"
  onClick={() => {
    setSelectedEmployees([]);   // 🔥 Clear global selected employees
  }}
/>


        <Button
          buttonname="Next"
          type="button"
          righticon={rightarrow}
          variant="primary"
          width="123px"
          onClick={() => navigate("/scopes/employee/employeeManager/mapping-mode")}
        />
      </div>

    </div>
  );
};

export default EmployeeSearchResults;
