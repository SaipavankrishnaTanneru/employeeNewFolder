import React from "react";
import styles from "./NavTabsWidget.module.css";

const NavTabsWidget = ({ options = [], value, onChange }) => {
  return (
    <div className={styles.container} role="tablist">
      {options.map((opt) => {
        const isActive = Number(value) === Number(opt.value);

        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            onClick={() => onChange(Number(opt.value))}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default NavTabsWidget;
