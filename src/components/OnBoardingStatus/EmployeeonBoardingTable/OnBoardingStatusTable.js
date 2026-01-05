import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./OnBoardingStatusTable.module.css";
import { useOnboardingStatusQuery } from "../../../api/onBoardingForms/GetApis/useOnboardingStatus"; 

// Assets
import rightarrow from 'assets/onboarding_status_table/rightarrow.svg';
import uparrow from 'assets/onboarding_status_table/uparrow.svg';
import downarrow from 'assets/onboarding_status_table/downarrow.svg';

const OnBoardingStatusTable = ({ selectedStatus, role, onEmployeeSelect }) => {
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 20; 

  const { data: employeeData = [], isLoading, isError, error } = useOnboardingStatusQuery();

  // ... (Helper: Badge Styles) ...
  const getStatusBadgeClass = (status) => {
    if (!status) return styles.statusDefault;
    const s = status.toLowerCase().trim();
    if (s === "confirm" || s === "completed") return styles.statusCompleted;
    if (s === "pending at co" || s === "pending with co") return styles.statusPendingWithCO;
    if (s === "pending at do" || s === "pending with do") return styles.statusPendingWithDO;
    if (s === "incompleted" || s === "incomplete") return styles.statusIncomplete;
    if (s === "rejected") return styles.statusRejected;
    if (s === "left") return styles.statusLeft;
    return styles.statusDefault;
  };

  // ... (Logic: Filtering) ...
  const filteredData = useMemo(() => {
    if (!selectedStatus || selectedStatus === "All") return employeeData;
    const filterKey = selectedStatus.toLowerCase().trim();
    return employeeData.filter((row) => {
      const rowStatus = (row.status || "").toLowerCase().trim();
      if (rowStatus === filterKey) return true;
      if (filterKey === "pending with do" && rowStatus === "pending at do") return true;
      if (filterKey === "pending with co" && rowStatus === "pending at co") return true;
      if (filterKey === "completed" && rowStatus === "confirm") return true;
      if (filterKey === "incomplete" && rowStatus === "incompleted") return true;
      if (rowStatus.includes(filterKey)) return true;
      return false;
    });
  }, [selectedStatus, employeeData]);

  // ... (Logic: Pagination) ...
  const total = filteredData.length;
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);
  if (pageIndex >= totalPages && totalPages > 0) setPageIndex(0);
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const pagedData = filteredData.slice(start, end);
  const handlePrevPage = () => { if (pageIndex > 0) setPageIndex(pageIndex - 1); };
  const handleNextPage = () => { if (pageIndex < totalPages - 1) setPageIndex(pageIndex + 1); };

  // 🔴 UPDATED NAVIGATION LOGIC 🔴
  const handleRowClick = (row) => {
    const currentStatus = (row.status || "").toLowerCase().trim();
    
    // 🔴 1. Extract TEMP ID specifically
    const activeId = row.tempPayroll; 

    if (!activeId) {
        console.error("No TempPayroll ID found for row:", row);
        return;
    }

    // 2. Determine Role Prefix for URL (do, hr, co, admin)
    let rolePrefix = "do";
    if (role === "HR") rolePrefix = "hr";
    if (role === "CO") rolePrefix = "co";
    if (role === "ADMIN") rolePrefix = "admin";

    // 🔴 CASE A: INCOMPLETE -> Go to FORM WIZARD
    if (currentStatus === "incomplete" || currentStatus === "incompleted") {
        const targetPath = `/scopes/employee/${rolePrefix}-new-employee-onboarding/basic-info`;
        navigate(targetPath, { 
            state: { 
                tempId: activeId, // Using Temp ID
                isEditMode: true 
            } 
        });
        return;
    }

    // 🔴 CASE B: PENDING (DO/CO) -> Go to REVIEW SCREEN
    if (currentStatus.includes("pending")) {
        // Navigates to the review module container using TEMP ID in URL
        const targetPath = `/scopes/employee/${rolePrefix}-review/${activeId}/onboarding/working-info`;
        navigate(targetPath);
        return;
    }
  };

  // ... (Logic: Columns) ...
  const columns = useMemo(() => {
    const baseColumns = [
      "EMPLOYEE NAME", "EMPLOYEE NUMBER", "TEMP PAYROLL", "JOIN DATE",
      "LEFT DATE", "CITY", "CAMPUS", "GENDER", "REMARKS",
      "JOINING STATUS", "STATUS",
    ];
    if (role === "CO") {
      const idx = baseColumns.indexOf("JOINING STATUS");
      baseColumns.splice(idx + 1, 0, "REJOINER", "KYC STATUS", "VERIFY KYC");
    }
    return baseColumns;
  }, [role]);

  if (isLoading) return <div className={styles.loading}>Loading Status...</div>;
  if (isError) return <div className={styles.error}>Error: {error?.message || "Failed to load data"}</div>;

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((header, index) => (
                <th key={index}>
                  <div className={styles.sortableHeader}>
                    <span>{header}</span>
                    <div className={styles.sortIcons}>
                      <img src={uparrow} alt="Up" className={styles.arrowUp} />
                      <img src={downarrow} alt="Down" className={styles.arrowDown} />
                    </div>
                  </div>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pagedData.length > 0 ? (
              pagedData.map((row, index) => {
                const currentStatus = (row.status || "").toLowerCase().trim();
                
                // 🔴 LOGIC: Row is clickable if Incomplete OR Pending
                const isClickable = 
                    currentStatus === "incomplete" || 
                    currentStatus === "incompleted" || 
                    currentStatus.includes("pending"); // e.g., "Pending at DO", "Pending at CO"

                return (
                  <tr 
                    key={row.id || index} 
                    // 🔴 Disable click for Completed/Confirmed rows
                    onClick={isClickable ? () => handleRowClick(row) : undefined}
                    style={{ cursor: isClickable ? "pointer" : "default" }}
                    className={isClickable ? styles.clickableRow : styles.disabledRow}
                  >
                    <td>{row.name}</td>
                    <td>{row.empNo}</td>
                    <td>{row.tempPayroll}</td>
                    <td>{row.joinDate}</td>
                    <td>{row.leftDate}</td>
                    <td>{row.city}</td>
                    <td>{row.campus}</td>
                    <td>{row.gender}</td>
                    <td>{row.remarks}</td>
                    <td>{row.joiningStatus}</td>

                    {role === "CO" && (
                      <>
                        <td>{row.rejoiner}</td>
                        <td>{row.kycStatus}</td>
                        <td>{row.verifyKyc}</td>
                      </>
                    )}

                    <td>
                      <span className={`${styles.statusBadge} ${getStatusBadgeClass(row.status)}`}>
                        {row.status}
                      </span>
                    </td>

                    <td>
                      {/* Only show arrow if actionable */}
                      {isClickable && (
                        <img src={rightarrow} alt="Arrow" className={styles.arrowIcon} />
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length + 1} style={{ textAlign: "center", padding: "20px" }}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      {total > 0 && (
        <div className={styles.paginationFooter}>
             <button onClick={handlePrevPage} disabled={pageIndex === 0} className={styles.pageBtn}>&lt; Previous</button>
             <span className={styles.pageNumber}>Page {pageIndex + 1} of {totalPages}</span>
             <button onClick={handleNextPage} disabled={pageIndex >= totalPages - 1} className={styles.pageBtn}>Next &gt;</button>
        </div>
      )}
    </div>
  );
};

export default OnBoardingStatusTable;