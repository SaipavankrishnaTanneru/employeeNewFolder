import React, { useState, useMemo } from "react";
import styles from "./OnBoardingStatusLayout.module.css";
import { useLocation, useNavigate } from "react-router-dom";

// Icons
import leftarrow from "assets/onboarding_status_table/leftarrow.svg";
import filtericon from "assets/onboarding_status_table/filtericon.svg";
import plusIcon from "assets/onboarding_status_table/PlusIconForOnboardNewEmployee.svg";
import { searchicon } from "assets/onboarding_status_table/searchicon";

// Components
import SearchBox from "widgets/Searchbox/Searchbox";
import Button from "widgets/Button/Button";
import GenericNavTabs from "widgets/NavTabs/GenericNavTabs";
import StatusFilterPopup from "../../OnBoardingStatus/EmployeeonBoardingTable/StatusFilterPopup/StatusFilterPopup";
import OnBoardingStatusTable from "./OnBoardingStatusTable";
import SkillTestApprovalTable from "../EmployeeonBoardingTable/SkillTestApproval/SkillTestApprovalTable";
import SelectEmployeeTypeModal from "../../SelectEmployeeTypeModal/SelectEmployeeTypeModal";

const OnBoardingStatusLayout = ({ role, onEmployeeSelect }) => {
  // FIX 1: Removed 'role' from dependency array since the array content is static
  const { filterOptions } = useMemo(() => {
    return {
      filterOptions: [
        "Completed", "Incomplete", "Pending With CO", "Pending With DO",
        "Skill Test Approval", "Skill Test Approved", "Rejected", "Left",
      ],
    };
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  
  // FIX 2: searchValue is defined here
  const [searchValue, setSearchValue] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  
  // Modal State
  const [showTypeModal, setShowTypeModal] = useState(false);

  // 1. Determine Active Tab ID (Integer 1 or 2)
  const isSkillTestTab = location.pathname.includes("skillTest");
  const activeTabId = isSkillTestTab ? 2 : 1;

  // 2. Helper to get base path
  const getParentPath = () => {
     return location.pathname.replace(/\/onboarding\/?$|\/skillTest\/?$/, "");
  };

  // 3. Navigation Handlers
  const handleTabClick = (pathSuffix) => {
     const basePath = getParentPath();
     navigate(`${basePath}/${pathSuffix}`);
  };

  const handleBackClick = () => {
    navigate("/scopes/employee");
  };

  // 4. Handle "Onboard New Employee" Logic
  const handleSubmitEmployeeType = (employeeType, isSkip) => {
    const prefix = role ? role.toLowerCase() : "do";

    if (employeeType === "Teach" && !isSkip) {
      navigate(`/scopes/employee/${prefix}-employee-onboarding/skilltest`, { state: { employeeType } });
    } else {
      navigate(`/scopes/employee/${prefix}-new-employee-onboarding/basic-info`, {
        state: { employeeType: "Non Teach", skipSkillTest: true },
      });
    }
    setShowTypeModal(false);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setShowFilter(false);
  };

  const handleClearFilter = () => setSelectedStatus("");
  const handleSearchChange = (value) => setSearchValue(value);
  const handleFilterClose = () => setShowFilter(false);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <figure 
          onClick={handleBackClick} 
          style={{ cursor: "pointer" }} 
        >
          <img src={leftarrow} alt="Back" className={styles.arrowIcon} />
          <figcaption>Onboarding Status</figcaption>
        </figure>
        
        <Button
          buttonname="Onboard New Employee"
          lefticon={<img src={plusIcon} alt="Plus" />}
          variant="primary"
          onClick={() => setShowTypeModal(true)}
        />
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <GenericNavTabs
          activeTab={activeTabId} 
          tabs={[
            { 
              id: 1, 
              label: "Onboarding Status", 
              onClick: () => handleTabClick("onboarding") 
            },
            { 
              id: 2, 
              label: "Skill Test Approval", 
              onClick: () => handleTabClick("skillTest") 
            },
          ]}
        />
      </div>

      {/* Search + Filter */}
      <div className={styles.filterRow}>
        <div>
          {selectedStatus && (
            <div className={styles.filterBadge}>
              <span className={styles.closeIcon} onClick={handleClearFilter}>×</span>
              {selectedStatus}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div className={styles.searchWrapper}>
            <SearchBox 
              searchicon={searchicon} 
              placeholder="Search for anything" 
              width="320px" 
              // FIX 2: Pass value to make it controlled (optional)
              value={searchValue} 
              onValueChange={handleSearchChange} 
            />
          </div>
          <figure className={styles.filterFigure} onClick={() => setShowFilter(!showFilter)}>
            <img src={filtericon} alt="Filter" className={styles.filterIcon} />
            <figcaption>Status</figcaption>
            {selectedStatus && <span className={styles.redDot} />}
          </figure>
          <StatusFilterPopup 
            open={showFilter} 
            filterOptions={filterOptions} 
            selectedStatus={selectedStatus} 
            onStatusChange={handleStatusChange} 
            onApply={handleStatusChange} 
            onClose={handleFilterClose} 
          />
        </div>
      </div>

      {/* Render Correct Table */}
      {/* FIX 2: Passed 'searchValue' to both tables so the variable is used */}
      {activeTabId === 2 ? (
        <SkillTestApprovalTable
          selectedStatus={selectedStatus}
          role={role}
          onEmployeeSelect={onEmployeeSelect}
          searchValue={searchValue} 
        />
      ) : (
        <OnBoardingStatusTable
          selectedStatus={selectedStatus}
          role={role}
          onEmployeeSelect={onEmployeeSelect}
          searchValue={searchValue}
        />
      )}

      <SelectEmployeeTypeModal
        open={showTypeModal}
        onClose={() => setShowTypeModal(false)}
        onSubmit={handleSubmitEmployeeType}
      />
    </div>
  );
};

export default OnBoardingStatusLayout;