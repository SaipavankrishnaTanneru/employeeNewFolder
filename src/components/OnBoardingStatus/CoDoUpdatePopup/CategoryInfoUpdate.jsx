import React, { useState } from "react";
import styles from "./WorkingInfoUpdate.module.css";
 
import Dropdown from "widgets/Dropdown/Dropdown";
import InputBox from "widgets/Inputbox/InputBox";
 
const CategoryInfoUpdate = () => {
  const [categoryData, setCategoryData] = useState({
    employeeType: "Teaching",
    department: "Mathematics",
    designation: "Senior Teacher",
    orientation: "Online",
    subjects: "Algebra, Geometry",
    agreedNoOfPeriods: "24",
  });
 
  const handleChange = (key, value) => {
    setCategoryData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
 
  return (
    <div className={styles.form_grid}>
      {/* Employee Type */}
      <Dropdown
        dropdownname="Employee Type"
        value={categoryData.employeeType}
        results={["Teaching", "Non-Teaching", "Administrative"]}
        onChange={(e) =>
          handleChange("employeeType", e.target.value)
        }
      />
 
      {/* Department */}
      <Dropdown
        dropdownname="Department"
        value={categoryData.department}
        results={["Mathematics", "Science", "English", "Social"]}
        onChange={(e) =>
          handleChange("department", e.target.value)
        }
      />
 
      {/* Designation */}
      <Dropdown
        dropdownname="Designation"
        value={categoryData.designation}
        results={[
          "Junior Teacher",
          "Senior Teacher",
          "HOD",
          "Principal",
        ]}
        onChange={(e) =>
          handleChange("designation", e.target.value)
        }
      />
 
      {/* Orientation */}
      <Dropdown
        dropdownname="Orientation"
        value={categoryData.orientation}
        results={["Online", "Offline", "Hybrid"]}
        onChange={(e) =>
          handleChange("orientation", e.target.value)
        }
      />
 
      {/* Subjects */}
      <Dropdown
        dropdownname="Subjects"
        value={categoryData.subjects}
        results={[
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "English",
        ]}
        onChange={(e) =>
          handleChange("subjects", e.target.value)
        }
      />
 
      {/* Agreed No of Periods */}
      <InputBox
        label="Agreed No. of Periods"
        type="number"
        value={categoryData.agreedNoOfPeriods}
        onChange={(e) =>
          handleChange("agreedNoOfPeriods", e.target.value)
        }
      />
    </div>
  );
};
 
export default CategoryInfoUpdate;
 
 