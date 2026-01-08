import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./OnBoardingStatusTable.module.css";
import { useOnboardingStatusQuery } from "../../../api/onBoardingForms/GetApis/useOnboardingStatus"; 

// Assets
import rightarrow from 'assets/onboarding_status_table/rightarrow.svg';
import uparrow from 'assets/onboarding_status_table/uparrow.svg';
import downarrow from 'assets/onboarding_status_table/downarrow.svg';

const OnBoardingStatusTable = ({ selectedStatus, role, onEmployeeSelect, searchValue }) => {
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 20; 

  const { data: employeeData = [], isLoading, isError, error } = useOnboardingStatusQuery();

  // ... (Helper: Badge Styles - SAME AS BEFORE) ...
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

  // ... (Logic: Filtering - SAME AS BEFORE) ...
  const filteredData = useMemo(() => {
    let data = employeeData;

    // 1. Status Filter
    if (selectedStatus && selectedStatus !== "All") {
        const filterKey = selectedStatus.toLowerCase().trim();
        data = data.filter((row) => {
            const rowStatus = (row.status || "").toLowerCase().trim();
            if (rowStatus === filterKey) return true;
            if (filterKey === "pending with do" && rowStatus === "pending at do") return true;
            if (filterKey === "pending with co" && rowStatus === "pending at co") return true;
            if (filterKey === "completed" && rowStatus === "confirm") return true;
            if (filterKey === "incomplete" && rowStatus === "incompleted") return true;
            if (rowStatus.includes(filterKey)) return true;
            return false;
        });
    }

    // 2. Search Filter
    if (searchValue) {
        const lowerSearch = searchValue.toLowerCase();
        data = data.filter((row) => 
            (row.name && row.name.toLowerCase().includes(lowerSearch)) ||
            (row.empNo && row.empNo.toLowerCase().includes(lowerSearch)) ||
            (row.tempPayroll && row.tempPayroll.toLowerCase().includes(lowerSearch)) ||
            (row.payroll && row.payroll.toLowerCase().includes(lowerSearch))
        );
    }

    return data;
  }, [selectedStatus, employeeData, searchValue]);

  // ... (Logic: Pagination) ...
  const total = filteredData.length;
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);
  
  // Ensure pageIndex is valid
  if (pageIndex >= totalPages && totalPages > 0) setPageIndex(0);
  
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const pagedData = filteredData.slice(start, end);

  // 🔢 CALCULATION FOR FOOTER TEXT ("Showing 1 to 20 of 50")
  const startRecord = total === 0 ? 0 : start + 1;
  const endRecord = Math.min(end, total);

  const handlePrevPage = () => { if (pageIndex > 0) setPageIndex(pageIndex - 1); };
  const handleNextPage = () => { if (pageIndex < totalPages - 1) setPageIndex(pageIndex + 1); };

  // ... (Navigation Logic & Row Click - SAME AS BEFORE) ...
  const handleRowClick = (row) => {
    const currentStatus = (row.status || "").toLowerCase().trim();
    const activeId = row.tempPayroll; 

    if (!activeId) { console.error("No TempPayroll ID found"); return; }

    let userRolePrefix = "do";
    if (role === "HR") userRolePrefix = "hr";
    if (role === "CO") userRolePrefix = "co";
    if (role === "ADMIN") userRolePrefix = "admin";

    if (currentStatus === "incomplete" || currentStatus === "incompleted") {
        navigate(`/scopes/employee/${userRolePrefix}-new-employee-onboarding/basic-info`, { state: { tempId: activeId, isEditMode: true } });
        return;
    }
    if (currentStatus.includes("pending")) {
        let reviewScope = "do-review";
        if (currentStatus.includes("pending at co") || currentStatus.includes("pending with co")) reviewScope = "co-review";
        else if (currentStatus.includes("pending at do") || currentStatus.includes("pending with do")) reviewScope = "do-review";
        
        navigate(`/scopes/employee/${reviewScope}/${activeId}/onboarding/working-info`);
        return;
    }
  };

  // ... (Logic: Columns - SAME AS BEFORE) ...
  const columns = useMemo(() => {
    const baseColumns = ["EMPLOYEE NAME", "EMPLOYEE NUMBER", "TEMP PAYROLL", "PAYROLL", "JOIN DATE", "LEFT DATE", "CITY", "CAMPUS", "GENDER", "REMARKS", "JOINING STATUS", "STATUS"];
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
                const isClickable = currentStatus === "incomplete" || currentStatus === "incompleted" || currentStatus.includes("pending");

                return (
                  <tr 
                    key={row.id || index} 
                    onClick={isClickable ? () => handleRowClick(row) : undefined}
                    style={{ cursor: isClickable ? "pointer" : "default" }}
                    className={isClickable ? styles.clickableRow : styles.disabledRow}
                  >
                    <td>{row.name}</td>
                    <td>{row.empNo}</td>
                    <td>{row.tempPayroll}</td>
                    <td>{row.payroll}</td>
                    <td>{row.joinDate}</td>
                    <td>{row.leftDate}</td>
                    <td>{row.city}</td>
                    <td>{row.campus}</td>
                    <td>{row.gender}</td>
                    <td>{row.remarks}</td>
                    <td>{row.joiningStatus}</td>
                    {role === "CO" && (<><td>{row.rejoiner}</td><td>{row.kycStatus}</td><td>{row.verifyKyc}</td></>)}
                    <td><span className={`${styles.statusBadge} ${getStatusBadgeClass(row.status)}`}>{row.status}</span></td>
                    <td>{isClickable && (<img src={rightarrow} alt="Arrow" className={styles.arrowIcon} />)}</td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan={columns.length + 1} style={{ textAlign: "center", padding: "20px" }}>No records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* 🔴 UPDATED PAGINATION FOOTER STRUCTURE 🔴 */}
      {total > 0 && (
        <div className={styles.paginationFooter}>
             <span className={styles.showingText}>
                Showing <b>{startRecord}</b> to <b>{endRecord}</b> of <b>{total}</b> Entries
             </span>
             
             <div className={styles.paginationRight}>
                <span className={styles.pageCountText}>
                    {pageIndex + 1}-{totalPages} of {totalPages}
                </span>
                <div className={styles.buttonGroup}>
                    <button 
                        onClick={handlePrevPage} 
                        disabled={pageIndex === 0} 
                        className={styles.prevBtn}
                    >
                        Prev
                    </button>
                    <button 
                        onClick={handleNextPage} 
                        disabled={pageIndex >= totalPages - 1} 
                        className={styles.nextBtn}
                    >
                        Next
                    </button>
                </div>
             </div>
        </div>
      )}
    </div>
  );
};

export default OnBoardingStatusTable;