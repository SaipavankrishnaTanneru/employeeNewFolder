import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NavTabWithIcons.module.css";

const NavTabsWithIcons = ({ tabs, basePath }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavTab = (path) => {
    navigate(`${basePath}/${path}`); // ✅ FIX: absolute correct URL always
  };

  // Get current last path segment
  const current = location.pathname.split("/").pop();

  return (
    <ul className={styles.nav_tab}>
      {tabs.map((tab) => {
        const isActive = current === tab.path; // ✅ Correct highlight

        return (
          <li
            key={tab.id}
            className={styles.nav_list}
            onClick={() => handleNavTab(tab.path)}
          >
            <a className={`${styles.nav_item} ${isActive ? styles.active : ""}`}>
              <figure className={styles.figure}>
                <img
                  src={tab.icon}
                  alt={tab.label}
                  className={styles.icons}
                />
              </figure>
              <span className={styles.tab}>{tab.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default NavTabsWithIcons;