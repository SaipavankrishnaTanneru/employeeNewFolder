import React, { useState } from "react";
import styles from "./WorkingInfoUpdate.module.css";
import Dropdown from "widgets/Dropdown/Dropdown";
import InputBox from "widgets/Inputbox/InputBox";

const WorkingInfoUpdate = () => {
  const [formData, setFormData] = useState({
    campus: "Jubilee Hills Res",
    campusCode: "HYD91737",
    campusType: "Days Scholar",
    location: "Jubilee Hills, Hyderabad",
    building: "Tower B",
    manager: "Venkat Boppana",
    workingMode: "Full Time",
    joiningAs: "Teacher",
    replacementEmployee: "Yaswanth",
    modeOfHiring: "Consultant",
    hiredBy: "Venkat Boppana",
    joiningDate: "2025-03-29",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className={styles.form_grid}>
      {/* Campus */}
      <InputBox
        label="Campus"
        value={formData.campus}
        onChange={(e) => handleChange("campus", e.target.value)}
      />

      <InputBox
        label="Campus Code"
        value={formData.campusCode}
        onChange={(e) => handleChange("campusCode", e.target.value)}
      />

      <Dropdown
        dropdownname="Campus Type"
        value={formData.campusType}
        results={["Days Scholar", "Residential"]}
        onChange={(e) =>
          handleChange("campusType", e.target.value)
        }
      />

      <InputBox
        label="Location"
        value={formData.location}
        onChange={(e) => handleChange("location", e.target.value)}
      />

      <InputBox
        label="Building"
        value={formData.building}
        onChange={(e) => handleChange("building", e.target.value)}
      />

      <InputBox
        label="Manager"
        value={formData.manager}
        onChange={(e) => handleChange("manager", e.target.value)}
      />

      <Dropdown
        dropdownname="Working Mode"
        value={formData.workingMode}
        results={["Full Time", "Part Time"]}
        onChange={(e) =>
          handleChange("workingMode", e.target.value)
        }
      />

      <InputBox
        label="Joining As"
        value={formData.joiningAs}
        onChange={(e) => handleChange("joiningAs", e.target.value)}
      />

      <InputBox
        label="Replacement Employee"
        value={formData.replacementEmployee}
        onChange={(e) =>
          handleChange("replacementEmployee", e.target.value)
        }
      />

      <Dropdown
        dropdownname="Mode Of Hiring"
        value={formData.modeOfHiring}
        results={["Consultant", "Direct", "Referral"]}
        onChange={(e) =>
          handleChange("modeOfHiring", e.target.value)
        }
      />

      <InputBox
        label="Hired By"
        value={formData.hiredBy}
        onChange={(e) => handleChange("hiredBy", e.target.value)}
      />

      <InputBox
        label="Joining Date"
        type="date"
        value={formData.joiningDate}
        onChange={(e) =>
          handleChange("joiningDate", e.target.value)
        }
      />
    </div>
  );
};

export default WorkingInfoUpdate;
