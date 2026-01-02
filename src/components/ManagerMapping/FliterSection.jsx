// FilterSection.jsx
import React from "react";
import styles from "./FilterSection.module.css";

const PlusIcon = ({ open }) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 17 17"
    className={`${styles.plusIcon} ${open ? styles.rotated : ""}`}
    fill="none"
  >
    <path d="M9.33333 1.16667C9.33333 0.857247 9.21042 0.560501 8.99162 0.341709C8.77283 0.122917 8.47609 0 8.16667 0C7.85725 0 7.5605 0.122917 7.34171 0.341709C7.12292 0.560501 7 0.857247 7 1.16667V7H1.16667C0.857247 7 0.560501 7.12292 0.341709 7.34171C0.122917 7.5605 0 7.85725 0 8.16667C0 8.47609 0.122917 8.77283 0.341709 8.99162C0.560501 9.21042 0.857247 9.33333 1.16667 9.33333H7V15.1667C7 15.4761 7.12292 15.7728 7.34171 15.9916C7.5605 16.2104 7.85725 16.3333 8.16667 16.3333C8.47609 16.3333 8.77283 16.2104 8.99162 15.9916C9.21042 15.7728 9.33333 15.4761 9.33333 15.1667V9.33333H15.1667C15.4761 9.33333 15.7728 9.21042 15.9916 8.99162C16.2104 8.77283 16.3333 8.47609 16.3333 8.16667C16.3333 7.85725 16.2104 7.5605 15.9916 7.34171C15.7728 7.12292 15.4761 7 15.1667 7H9.33333V1.16667Z" fill="black"/>
  </svg>
);

const FilterSection = ({
  title,
  sectionKey,
  sections,
  toggleSection,
  children
}) => {
  const { expanded, closing } = sections[sectionKey];

  return (
    <>
      {/* Section Header */}
      <div className={styles.lineItem} onClick={() => toggleSection(sectionKey)}>
        <span>{title}</span>
        <PlusIcon open={expanded} />
      </div>

      {/* Section Body */}
      {(expanded || closing) && (
        <div className={`${styles.sectionBody} ${closing ? styles.closing : ""}`}>
          {children}
        </div>
      )}
    </>
  );
};

export default FilterSection;
