// FilterDropdown.jsx
import React, { useState } from "react";
import styles from "./FilterDropdown.module.css";

import bluefilterline from 'assets/managermappingsearch/bluefilterline.svg';
import Button from "widgets/Button/Button";
import Dropdown from "widgets/Dropdown/Dropdown";

import FilterSection from "./FliterSection";

const FilterDropdown = ({ isOpen, onApplyFilters }) => {

  const [sections, setSections] = useState({
    location: { expanded: false, closing: false },
    campus: { expanded: false, closing: false },
    empType: { expanded: false, closing: false },
    department: { expanded: false, closing: false },
  });

  const [filters, setFilters] = useState({
    state: "",
    city: "",
    campus: "",
    empType: "",
    department: "",
  });

  // Close section animation
  const closeSection = (key) => {
    setSections(prev => ({ ...prev, [key]: { ...prev[key], closing: true }}));

    setTimeout(() => {
      setSections(prev => ({ ...prev, [key]: { expanded: false, closing: false }}));
    }, 300);
  };

  // Toggle any section
  const toggleSection = (key) => {
    const { expanded } = sections[key];

    if (expanded) {
      closeSection(key);
    } else {
      Object.keys(sections).forEach(sec => {
        if (sections[sec].expanded) closeSection(sec);
      });

      setSections(prev => ({
        ...prev,
        [key]: { expanded: true, closing: false }
      }));
    }
  };

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.dropdownWrapper}>

      <figure className={styles.topDecoration}>
        <img src={bluefilterline} alt="decorative line"/>
      </figure>

      {/* LOCATION SECTION */}
      <FilterSection
        title="Location"
        sectionKey="location"
        sections={sections}
        toggleSection={toggleSection}
      >
        <div className={styles.dropdownContainer}>
          <Dropdown
            dropdownname="State"
            placeholder="Select State"
            dropdownsearch
            results={[
              "Maharashtra","Karnataka","Tamil Nadu","Kerala","Gujarat","Rajasthan","Telangana","Andhra Pradesh","Punjab","Haryana","Uttar Pradesh","Madhya Pradesh","Odisha","Bihar","Assam","Goa"
            ]}
            value={filters.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />
        </div>

        <div className={styles.dropdownContainer}>
          <Dropdown
            dropdownname="City"
            placeholder="Select City"
            dropdownsearch
            results={[
              "Mumbai","Pune","Nagpur","Nashik","Thane","Bangalore","Mysore","Chennai","Coimbatore","Madurai","Hyderabad","Delhi","Noida","Chandigarh","Kochi"
            ]}
            value={filters.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>
      </FilterSection>

      {/* CAMPUS SECTION */}
      <FilterSection
        title="Campus"
        sectionKey="campus"
        sections={sections}
        toggleSection={toggleSection}
      >
        <div className={styles.dropdownContainer}>
          <Dropdown
            dropdownname="Campus"
            placeholder="Select Campus"
            dropdownsearch
            results={[
              "Main Campus","North Campus","South Campus","East Campus","West Campus","Central Campus","Tech Park","Science Block","Arts Block"
            ]}
            value={filters.campus}
            onChange={(e) => handleChange("campus", e.target.value)}
          />
        </div>
      </FilterSection>

      {/* EMPLOYEE TYPE */}
      <FilterSection
        title="Employee Type"
        sectionKey="empType"
        sections={sections}
        toggleSection={toggleSection}
      >
        <div className={styles.dropdownContainer}>
          <Dropdown
            dropdownname="Employee Type"
            placeholder="Select Employee Type"
            dropdownsearch
            results={[
              "Permanent","Contract","Intern","Part-Time","Visiting Faculty","Consultant"
            ]}
            value={filters.empType}
            onChange={(e) => handleChange("empType", e.target.value)}
          />
        </div>
      </FilterSection>

      {/* DEPARTMENT */}
      <FilterSection
        title="Department"
        sectionKey="department"
        sections={sections}
        toggleSection={toggleSection}
      >
        <div className={styles.dropdownContainer}>
          <Dropdown
            dropdownname="Department"
            placeholder="Select Department"
            dropdownsearch
            results={[
              "IT","Finance","HR","Admin","Transport","Accounts","Operations","Maintenance","Technical","Security","Library","Sports","Hostel Management","Medical","Counselling"
            ]}
            value={filters.department}
            onChange={(e) => handleChange("department", e.target.value)}
          />
        </div>
      </FilterSection>

      <div className={styles.buttonWrapper}>
        <Button
          buttonname="Search"
          variant="primary"
          width="150px"
          onClick={() => onApplyFilters(filters)}
        />
      </div>

    </div>
  );
};

export default FilterDropdown;
