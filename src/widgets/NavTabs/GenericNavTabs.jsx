import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./GenericNavTabs.module.css";

const GenericNavTabs = ({ tabs, activeTab }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavTab = (tab) => {
    // 1. Use custom onClick if provided (Fixes your switching issue)
    if (tab.onClick) {
      tab.onClick();
    } 
    // 2. Fallback to path navigation if no custom handler
    else if (tab.path) {
      navigate(tab.path);
    }
  };

  return (
    <ul className={styles.nav_tab}>
      {tabs.map((tab) => {
        // Logic: specific activeTab ID (controlled) vs URL path (uncontrolled)
        let isActive = false;
        
        if (activeTab !== undefined) {
            // Fix: Compare explicit ID passed from parent
            isActive = activeTab === tab.id;
        } else if (tab.path) {
            // Fallback: Check URL
            isActive = location.pathname.includes(tab.path);
        }

        return (
          <li
            key={tab.id}
            className={styles.nav_list}
            onClick={() => handleNavTab(tab)}
          >
            {/* Added style for pointer cursor */}
            <a 
              className={`${styles.nav_item} ${isActive ? styles.active : ""}`}
              style={{ cursor: "pointer" }} 
            >
              {tab.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default GenericNavTabs;