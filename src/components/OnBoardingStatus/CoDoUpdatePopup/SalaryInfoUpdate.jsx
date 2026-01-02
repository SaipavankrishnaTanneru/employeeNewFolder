import React, { useState } from "react";
import styles from "./SalaryInfoUpdate.module.css";
import InputBox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";

const SalaryInfoUpdate = () => {
  const [formData, setFormData] = useState({
    monthlyCtc: "",
    ctcInWords: "",
    yearlyCtc: "",
    grade: "",
    structure: "",
    costCenter: "",
    companyName: "",

    includePf: true,
    includeEsi: true,
    pfNumber: "",
    esiNumber: "",
    pfJoinDate: "",
    uanNumber: "",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className={styles.container}>
      {/* ================= Salary Info ================= */}
      <h4 className={styles.section_title}>Salary Info</h4>

      <div className={styles.form_grid}>
        <InputBox
          label="Monthly CTC"
          placeholder="Enter CTC"
          value={formData.monthlyCtc}
          onChange={(e) => handleChange("monthlyCtc", e.target.value)}
        />

        <InputBox
          label="CTC in Words"
          placeholder="CTC in Words"
          value={formData.ctcInWords}
          onChange={(e) => handleChange("ctcInWords", e.target.value)}
        />

        <InputBox
          label="Yearly CTC"
          placeholder="Yearly CTC"
          value={formData.yearlyCtc}
          onChange={(e) => handleChange("yearlyCtc", e.target.value)}
        />

        <Dropdown
          dropdownname="Grade"
          value={formData.grade}
          results={["A", "B", "C"]}
          onChange={(e) => handleChange("grade", e.target.value)}
        />

        <Dropdown
          dropdownname="Structure"
          value={formData.structure}
          results={["Structure 1", "Structure 2"]}
          onChange={(e) => handleChange("structure", e.target.value)}
        />

        <Dropdown
          dropdownname="Cost Center"
          value={formData.costCenter}
          results={["Cost Center 1", "Cost Center 2"]}
          onChange={(e) => handleChange("costCenter", e.target.value)}
        />

        <InputBox
          label="Company Name"
          placeholder="Enter Company Name"
          value={formData.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
        />
      </div>

      {/* ================= PF Info ================= */}
      <h4 className={styles.section_title}>PF Info</h4>

      {/* <div className={styles.checkbox_row}>
        <label>
          <input
            type="checkbox"
            checked={formData.includePf}
            onChange={(e) => handleChange("includePf", e.target.checked)}
          />
          Include in PF Scheme
        </label>

        <label>
          <input
            type="checkbox"
            checked={formData.includeEsi}
            onChange={(e) => handleChange("includeEsi", e.target.checked)}
          />
          Include in ESI Scheme
        </label>
      </div> */}

      <div className={styles.form_grid}>
        <InputBox
          label="PF Number"
          placeholder="Enter PF Number"
          value={formData.pfNumber}
          onChange={(e) => handleChange("pfNumber", e.target.value)}
        />

        <InputBox
          label="ESI Number"
          placeholder="Enter ESI Number"
          value={formData.esiNumber}
          onChange={(e) => handleChange("esiNumber", e.target.value)}
        />

        <InputBox
          label="PF Join Date"
          type="date"
          value={formData.pfJoinDate}
          onChange={(e) => handleChange("pfJoinDate", e.target.value)}
        />

        <InputBox
          label="UAN Number"
          placeholder="Enter UAN Number"
          value={formData.uanNumber}
          onChange={(e) => handleChange("uanNumber", e.target.value)}
        />
      </div>
    </div>
  );
};

export default SalaryInfoUpdate;
