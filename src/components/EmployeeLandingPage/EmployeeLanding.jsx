// components/EmployeeLanding/EmployeeLanding.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../useAuth";
import styles from "./EmployeeLanding.module.css";
import SelectEmployeeTypeModal from "../SelectEmployeeTypeModal/SelectEmployeeTypeModal";
import EmployeeModuleHeader from '../EmployeeLandingPage/EmployeeModuleHeader/EmployeeModuleHeader';
import EmployeeCardWithoutCheckBox from "../../widgets/EmployeeDetailsCard/EmployeeCardWithoutCheckBox";
import empprofile from 'assets/managermappingsearch/empprofile.svg';
import blueLine from 'assets/managermappingsearch/bluefilterline.svg';

const PlusIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.8333 0C14.2919 0 14.7318 0.18218 15.056 0.506462C15.3803 0.830743 15.5625 1.27056 15.5625 1.72917V12.1042H25.9375C26.3961 12.1042 26.8359 12.2863 27.1602 12.6106C27.4845 12.9349 27.6667 13.3747 27.6667 13.8333C27.6667 14.2919 27.4845 14.7318 27.1602 15.056C26.8359 15.3803 26.3961 15.5625 25.9375 15.5625H15.5625V25.9375C15.5625 26.3961 15.3803 26.8359 15.056 27.1602C14.7318 27.4845 14.2919 27.6667 13.8333 27.6667C13.3747 27.6667 12.9349 27.4845 12.6106 27.1602C12.2863 26.8359 12.1042 26.3961 12.1042 25.9375V15.5625H1.72917C1.27056 15.5625 0.830743 15.3803 0.506462 15.056C0.18218 14.7318 0 14.2919 0 13.8333C0 13.3747 0.18218 12.9349 0.506462 12.6106C0.830743 12.2863 1.27056 12.1042 1.72917 12.1042H12.1042V1.72917C12.1042 1.27056 12.2863 0.830743 12.6106 0.506462C12.9349 0.18218 13.3747 0 13.8333 0Z" fill="url(#paint0_linear_1806_19529)" />
    <defs>
      <linearGradient id="paint0_linear_1806_19529" x1="0" y1="0" x2="17.1529" y2="33.0963" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF2525" />
        <stop offset="1" stopColor="#B10BE8" />
      </linearGradient>
    </defs>
  </svg>
);

const StatusIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M30.377 13.9608C30.7848 17.3081 30.0328 20.694 28.2464 23.554C26.4599 26.414 23.7471 28.5751 20.5602 29.6771C17.3733 30.7791 13.905 30.7552 10.7335 29.6096C7.56203 28.464 4.87914 26.2657 3.13219 23.3815C2.94206 23.068 2.88427 22.6917 2.97154 22.3356C3.0588 21.9795 3.28397 21.6726 3.59751 21.4824C3.91104 21.2923 4.28727 21.2345 4.64341 21.3218C4.99955 21.4091 5.30645 21.6342 5.49657 21.9478C6.43761 23.5017 7.71977 24.8212 9.24603 25.8065C10.7723 26.7918 12.5027 27.4171 14.3062 27.6349C16.1098 27.8528 17.9393 27.6576 19.6562 27.0641C21.3732 26.4706 22.9327 25.4943 24.2167 24.2091C25.5007 22.924 26.4756 21.3636 27.0676 19.6461C27.6595 17.9286 27.8531 16.0989 27.6336 14.2956C27.4141 12.4922 26.7873 10.7624 25.8007 9.23704C24.814 7.71167 23.4933 6.43069 21.9385 5.49104C21.6248 5.30141 21.3992 4.99489 21.3114 4.63892C21.2236 4.28294 21.2808 3.90668 21.4705 3.5929C21.6601 3.27912 21.9666 3.05352 22.3226 2.96574C22.6786 2.87796 23.0548 2.93518 23.3686 3.12481C25.282 4.28137 26.9072 5.85794 28.1214 7.73526C29.3356 9.61257 30.1069 11.7414 30.377 13.9608ZM17.5857 2.84286C17.5857 3.33161 17.3916 3.80035 17.046 4.14595C16.7004 4.49156 16.2316 4.68571 15.7429 4.68571C15.2541 4.68571 14.7854 4.49156 14.4398 4.14595C14.0942 3.80035 13.9 3.33161 13.9 2.84286C13.9 2.3541 14.0942 1.88536 14.4398 1.53976C14.7854 1.19416 15.2541 1 15.7429 1C16.2316 1 16.7004 1.19416 17.046 1.53976C17.3916 1.88536 17.5857 2.3541 17.5857 2.84286ZM6.16737 10.2143C6.29029 10.0046 6.37051 9.77272 6.40344 9.53192C6.43636 9.29113 6.42133 9.0462 6.35921 8.81123C6.29709 8.57627 6.18911 8.35592 6.04148 8.16286C5.89385 7.96979 5.70949 7.80784 5.49902 7.68632C5.28854 7.5648 5.05611 7.48611 4.8151 7.45479C4.5741 7.42346 4.32927 7.44012 4.09472 7.50379C3.86018 7.56747 3.64054 7.67691 3.44847 7.82582C3.25639 7.97473 3.09566 8.16015 2.97554 8.37143C2.73502 8.79447 2.67159 9.29548 2.79909 9.76512C2.9266 10.2348 3.23468 10.6349 3.65612 10.8782C4.07756 11.1215 4.57813 11.1883 5.04861 11.0639C5.51908 10.9395 5.92126 10.6341 6.16737 10.2143ZM2.84286 13.9C3.33161 13.9 3.80035 14.0942 4.14595 14.4398C4.49156 14.7854 4.68571 15.2541 4.68571 15.7429C4.68571 16.2316 4.49156 16.7004 4.14595 17.046C3.80035 17.3916 3.33161 17.5857 2.84286 17.5857C2.3541 17.5857 1.88536 17.3916 1.53976 17.046C1.19416 16.7004 1 16.2316 1 15.7429C1 15.2541 1.19416 14.7854 1.53976 14.4398C1.88536 14.0942 2.3541 13.9 2.84286 13.9ZM10.2143 6.16737C10.4256 6.04725 10.611 5.88652 10.7599 5.69445C10.9088 5.50237 11.0182 5.28274 11.0819 5.04819C11.1456 4.81364 11.1623 4.56882 11.1309 4.32781C11.0996 4.0868 11.0209 3.85437 10.8994 3.6439C10.7779 3.43342 10.6159 3.24906 10.4229 3.10144C10.2298 2.95381 10.0094 2.84582 9.77448 2.7837C9.53952 2.72158 9.29459 2.70655 9.05379 2.73948C8.813 2.7724 8.58109 2.85263 8.37143 2.97554C7.95161 3.22166 7.64619 3.62383 7.5218 4.09431C7.39742 4.56478 7.46417 5.06536 7.70749 5.48679C7.95082 5.90823 8.35096 6.21632 8.8206 6.34382C9.29024 6.47133 9.79124 6.4079 10.2143 6.16737Z" fill="#3425FF" stroke="#3425FF" strokeWidth="2" />
  </svg>
);

const ManagementIcon = () => (
  <svg width="28" height="28" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40.625 32.7486V24.3961C40.625 23.5341 40.2826 22.7075 39.6731 22.098C39.0636 21.4885 38.237 21.1461 37.375 21.1461H24.375V12.7936C25.9068 12.3981 27.2418 11.4575 28.1297 10.1481C29.0177 8.8387 29.3976 7.25042 29.1982 5.68097C28.9989 4.11152 28.234 2.66866 27.0469 1.62282C25.8598 0.576993 24.3321 0 22.75 0C21.168 0 19.6402 0.576993 18.4531 1.62282C17.2661 2.66866 16.5012 4.11152 16.3018 5.68097C16.1025 7.25042 16.4824 8.8387 17.3703 10.1481C18.2582 11.4575 19.5932 12.3981 21.125 12.7936V21.1461H8.12502C7.26306 21.1461 6.43641 21.4885 5.82692 22.098C5.21742 22.7075 4.87502 23.5341 4.87502 24.3961V32.7486C3.3432 33.1441 2.00821 34.0847 1.12029 35.3941C0.232368 36.7035 -0.147523 38.2918 0.0518228 39.8612C0.251169 41.4307 1.01607 42.8735 2.20314 43.9194C3.39021 44.9652 4.91796 45.5422 6.50002 45.5422C8.08207 45.5422 9.60982 44.9652 10.7969 43.9194C11.984 42.8735 12.7489 41.4307 12.9482 39.8612C13.1476 38.2918 12.7677 36.7035 11.8797 35.3941C10.9918 34.0847 9.65684 33.1441 8.12502 32.7486V24.3961H37.375V32.7486C35.8432 33.1441 34.5082 34.0847 33.6203 35.3941C32.7324 36.7035 32.3525 38.2918 32.5518 39.8612C32.7512 41.4307 33.5161 42.8735 34.7031 43.9194C35.8902 44.9652 37.418 45.5422 39 45.5422C40.5821 45.5422 42.1098 44.9652 43.2969 43.9194C44.484 42.8735 45.2489 41.4307 45.4482 39.8612C45.6476 38.2918 45.2677 36.7035 44.3797 35.3941C43.4918 34.0847 42.1568 33.1441 40.625 32.7486ZM9.75002 39.0211C9.75002 39.6639 9.55941 40.2922 9.20229 40.8267C8.84518 41.3612 8.3376 41.7777 7.74374 42.0237C7.14988 42.2697 6.49641 42.3341 5.86597 42.2086C5.23553 42.0832 4.65644 41.7737 4.20192 41.3192C3.7474 40.8647 3.43787 40.2856 3.31246 39.6551C3.18706 39.0247 3.25142 38.3712 3.49741 37.7774C3.74339 37.1835 4.15995 36.6759 4.69441 36.3188C5.22887 35.9617 5.85723 35.7711 6.50002 35.7711C7.36197 35.7711 8.18862 36.1135 8.79811 36.723C9.40761 37.3325 9.75002 38.1591 9.75002 39.0211ZM19.5 6.5211C19.5 5.87831 19.6906 5.24995 20.0477 4.7155C20.4049 4.18104 20.9124 3.76447 21.5063 3.51849C22.1002 3.2725 22.7536 3.20814 23.3841 3.33355C24.0145 3.45895 24.5936 3.76848 25.0481 4.223C25.5026 4.67752 25.8122 5.25662 25.9376 5.88705C26.063 6.51749 25.9986 7.17096 25.7526 7.76482C25.5066 8.35868 25.0901 8.86626 24.5556 9.22337C24.0212 9.58049 23.3928 9.7711 22.75 9.7711C21.8881 9.7711 21.0614 9.42869 20.4519 8.81919C19.8424 8.2097 19.5 7.38305 19.5 6.5211ZM39 42.2711C38.3572 42.2711 37.7289 42.0805 37.1944 41.7234C36.66 41.3663 36.2434 40.8587 35.9974 40.2648C35.7514 39.671 35.6871 39.0175 35.8125 38.3871C35.9379 37.7566 36.2474 37.1775 36.7019 36.723C37.1564 36.2685 37.7355 35.9589 38.366 35.8335C38.9964 35.7081 39.6499 35.7725 40.2437 36.0185C40.8376 36.2645 41.3452 36.681 41.7023 37.2155C42.0594 37.75 42.25 38.3783 42.25 39.0211C42.25 39.8831 41.9076 40.7097 41.2981 41.3192C40.6886 41.9287 39.862 42.2711 39 42.2711Z" fill="#48A924" />
  </svg>
);

const EmployeeLanding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Helper to get role-based prefix string
  const getRolePrefix = () => {
    return user?.roles?.[0]?.toLowerCase() || "do";
  };

  // ✅ 1. Use Role Prefix in URL for New Onboarding
  const handleSubmitEmployeeType = (employeeType, isSkip) => {
    const prefix = getRolePrefix(); // e.g. "do", "hr", "admin"

    if (employeeType === "Teach" && !isSkip) {
      // ✅ TEACH -> Skill Test URL
      navigate(`/scopes/employee/${prefix}-employee-onboarding/skilltest`, {
        state: { employeeType }
      });
    } else {
      // ✅ NON-TEACH / SKIP -> New Onboarding URL (Go to Basic Info)
      navigate(`/scopes/employee/${prefix}-new-employee-onboarding/basic-info`, {
        state: {
          employeeType: "Non Teach",
          skipSkillTest: true
        },
      });
    }
    setShowTypeModal(false);
  };

  // ✅ 2. Status Table Navigation
  const handleOnboardingStatusClick = () => {
    const prefix = getRolePrefix();
    navigate(`/scopes/employee/${prefix}-review/onboarding`);
  };

  const handleManagerMappingClick = () => {
    navigate("/scopes/employee/employeeManager/manage");
  };

  const handleSearchChange = (value) => setSearchTerm(value);

  // 🔴 3. FIX: Append '/basic-info' for Search Bar Navigation
  const handleSearchSubmit = () => {
    if (searchTerm && searchTerm.trim() !== '') {
      const role = user?.roles?.[0] || "DO";
      const pathSegment = role === "ADMIN" ? "admin-overview" : "profile-overview";
      
      // ✅ NAVIGATE TO EXACT TAB: Basic Info
      navigate(`/scopes/employee/${pathSegment}/${searchTerm}/basic-info`);
    }
  };

  const employee = {
    id: "HYD 5627182",
    name: "Devansh.N",
    dept: "IT Cell",
    image: empprofile,
    styleImg: blueLine,
    level: "Level 4",
    status: "Permanent",
  };

  return (
    <div className={styles.wrapper_container}>
      <EmployeeModuleHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      <h4 className={styles.recentSearchTitle}>Recent Search</h4>
      <div className={styles.employeeGrid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            style={{ cursor: "pointer" }}
            // 🔴 4. FIX: Append '/basic-info' for Recent Search Card Navigation
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/scopes/employee/profile-overview/${employee.id}/basic-info`);
            }}
          >
            <EmployeeCardWithoutCheckBox employee={employee} />
          </div>
        ))}
      </div>

      <h2 className={styles.heading}>Additional Features</h2>

      <div className={styles.cardContainer}>
        {/* Pink Card: Onboard New Employee */}
        <div className={`${styles.card} ${styles.cardPink}`} onClick={() => setShowTypeModal(true)}>
          <div className={styles.cardHeader}><PlusIcon /></div>
          <div className={styles.cardContent}>
            <h3>Onboard New Employee</h3>
            <p>Create a new employee profile and assign roles.</p>
          </div>
        </div>

        {/* Blue Card: Status */}
        <div className={`${styles.card} ${styles.cardBlue}`} onClick={handleOnboardingStatusClick}>
          <div className={styles.cardHeader}><StatusIcon /></div>
          <div className={styles.cardContent}>
            <h3>On Boarding Status</h3>
            <p>Check the onboarding progress and pending tasks.</p>
          </div>
        </div>

        {/* Green Card: Management */}
        <div className={`${styles.card} ${styles.cardGreen}`} onClick={handleManagerMappingClick}>
          <div className={styles.cardHeader}><ManagementIcon /></div>
          <div className={styles.cardContent}>
            <h3>Employee Management</h3>
            <p>Manage mapping, campuses, and reporting managers.</p>
          </div>
        </div>
      </div>

      <SelectEmployeeTypeModal
        open={showTypeModal}
        onClose={() => setShowTypeModal(false)}
        onSubmit={handleSubmitEmployeeType}
      />
    </div>
  );
};

export default EmployeeLanding;