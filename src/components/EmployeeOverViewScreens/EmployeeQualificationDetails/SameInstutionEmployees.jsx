import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
} from "@mui/material";
import { ReactComponent as ExpandIcon } from "assets/Family/expandIcon.svg";
import styles from "./SameInstitutionEmployee.module.css";
import accordionheadericon from "assets/Family/accordionheadericon.svg";
import EmployeeDetailsCard from "widgets/EmployeeDetailsCard/EmployeeDetailsCard";
import rightDividerIcon from "assets/Family/dividerRightImg.svg";
import leftDividerIcon from "assets/Family/dividerLeftImg.svg";
import profileIcon from "assets/Family/profile.svg";
 
const employees = [
  {
    name: "Venkateswarao Boppana",
    emp_id: "EMP ID: HYD 09817298",
    role: "Testing Engineer",
    phoneNumber: "+91 9876543210",
    email: "venkatBoppana@example.com",
  },
  {
    name: "Suresh Kumar",
    emp_id: "EMP ID: HYD 09817299",
    role: "Senior Engineer",
    phoneNumber: "+91 9876543211",
    email: "suresh@example.com",
  },
  {
    name: "Ravi Teja",
    emp_id: "EMP ID: HYD 09817300",
    role: "Lead Engineer",
    phoneNumber: "+91 9876543212",
    email: "ravi@example.com",
  },
  // 👉 add more employees here
];
 
const SameInstutionEmployees = ({ expanded, onChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = employees.length;
 
  const currentEmployee = employees[currentPage - 1];
 
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
 
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
 
  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      sx={{
        "& .MuiAccordionDetails-root": { padding: "0px 16px 16px" },
        "&::before": { display: "none" },
        borderRadius: "10px",
        border: "1px solid #E6E4F0",
        background: "rgba(255, 255, 255, 0.40)",
        backdropFilter: "blur(9.1px)",
        boxShadow:
          "0 8px 16px rgba(0,0,0,0.14), 0 0 2px rgba(0,0,0,0.12)",
        "&.Mui-expanded": {
          border: "1px solid #B4BCFF",
          background: "rgba(255, 255, 255, 0.30)",
          margin: 0,
        },
      }}
    >
      {/* HEADER */}
      <AccordionSummary
        expandIcon={<ExpandIcon />}
        sx={{
          padding: "15px 18px",
          "& .MuiAccordionSummary-content": {
            margin: 0,
            alignItems: "center",
          },
        }}
      >
        <Typography component="span" sx={{ width: "100%" }}>
          <figure className={styles.header_figure}>
            <div className={styles.header_left}>
              <img src={accordionheadericon} alt="accordion icon" />
              <p className={styles.header_text}>
                Samne Institution Employees
              </p>
            </div>
 
            {!expanded && (
              <Chip
                label={`+${totalPages}`}
                size="small"
                sx={{
                  backgroundColor: "#E8E6FF",
                  color: "#3425FF",
                  border: "1px solid #3425FF",
                  height: "28px",
                  borderRadius: "16px",
                  fontSize: "0.75rem",
                }}
              />
            )}
          </figure>
        </Typography>
      </AccordionSummary>
 
      {/* CONTENT */}
      <AccordionDetails>
        <Typography component="div" className="divider_content">
          <div className={styles.driver_cards_wrapper}>
            <div className={styles.driver_cards}>
              <EmployeeDetailsCard
                titleLable="Employee Name"
                name={currentEmployee.name}
                emp_id={currentEmployee.emp_id}
                role={currentEmployee.role}
                phoneNumber={currentEmployee.phoneNumber}
                email={currentEmployee.email}
                profileIcon={profileIcon}
                leftDividerIcon={leftDividerIcon}
                rightDividerIcon={rightDividerIcon}
                dividerColor="#3425ff"
              />
            </div>
 
            {/* PAGINATION */}
            <div className={styles.pagination_wrapper}>
              <button
                className={styles.page_btn}
                onClick={handlePrev}
                disabled={currentPage === 1}
                style={{ opacity: currentPage === 1 ? 0.4 : 1 }}
              >
                &#8249;
              </button>
 
              <span className={styles.page_text}>
                {currentPage} / {totalPages}
              </span>
 
              <button
                className={styles.page_btn}
                onClick={handleNext}
                disabled={currentPage === totalPages}
                style={{ opacity: currentPage === totalPages ? 0.4 : 1 }}
              >
                &#8250;
              </button>
            </div>
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
 
export default SameInstutionEmployees;
 