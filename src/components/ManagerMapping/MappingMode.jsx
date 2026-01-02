import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeCard from "widgets/Cards/EmployeeCard/EmployeeCardWithCheckBox";

import styles from "./MappingMode.module.css";

import backarrow from 'assets/managermappingsearch/topleftarrow.svg';
import unmapicon from 'assets/managermappingsearch/unmapicon.svg';
import mapicon from 'assets/managermappingsearch/mapicon.svg';
import plusicon from 'assets/managermappingsearch/plusicon.svg';
import closeicon from 'assets/managermappingsearch/closeicon.svg';
import groupicon from 'assets/managermappingsearch/groupicon.svg';
import individulicon from 'assets/managermappingsearch/individualicon.svg';

const MappingMode = ({ selectedEmployees = [] }) => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState(null);

  // ⬇ refs for cards
  const mapCardRef = useRef(null);
  const unmapCardRef = useRef(null);

  // ⬇ floating panel position
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0 });

  const goBack = () => navigate(-1);
  const handleClose = () => setSelectedMode(null);

  // ⬇ When mode changes, compute card position
  useEffect(() => {
    if (!selectedMode) return;

    const card = selectedMode === "map" ? mapCardRef.current : unmapCardRef.current;

    if (card) {
      const rect = card.getBoundingClientRect();

      setPanelPos({
        top: rect.top + rect.height / 2 - 60, // ❗ centered vertically
        left: rect.right + 10,                 // ❗ slightly spaced on right
      });
    }
  }, [selectedMode]);

  return (
    <div className={styles.mainWrapper}>
      
      {selectedMode && <div className={styles.fullBlurOverlay}></div>}

      <div className={styles.blurArea}>
        <div className={styles.wrapper}>
          <div className={styles.topRow}>
            <img src={backarrow} alt="back" className={styles.backIcon} onClick={goBack} />
            <div className={styles.modeheader}>
              <h2 className={styles.title}>Select mode to manage</h2>
              <p className={styles.subtitle}>Choose Categories to Map or Unmap Employee</p>
            </div>
          </div>

          <div className={styles.cardRow}>
            {selectedEmployees.map((emp, idx) => (
              <EmployeeCard key={idx} {...emp} isSelected={true} />
            ))}

            <div
              className={styles.addMoreCard}
              onClick={() => navigate("/scopes/employee/employeeManager/search-results")}
            >
              <img src={plusicon} alt="add" />
              <p>Add more Employees</p>
            </div>
          </div>

          <h3 className={styles.sectionTitle}>Select Mode of Mapping</h3>
        </div>
      </div>

      {/* CARDS + PANEL */}
      <div className={styles.modeContainer}>

        {/* MAP CARD */}
        <div
          ref={mapCardRef}
          className={`${styles.modeCardOrange} ${
            selectedMode === "map"
              ? styles.cardSelected
              : selectedMode === "unmap"
              ? styles.blurredCard
              : ""
          }`}
          onClick={() => setSelectedMode("map")}
        >
          <img src={mapicon} alt="map" className={styles.modeIcon} />
          <h4>Mapping/Remapping</h4>
          <p>Map manager, campus or remap, change designation here</p>
        </div>

        {/* UNMAP CARD */}
        <div
          ref={unmapCardRef}
          className={`${styles.modeCardBlue} ${
            selectedMode === "unmap"
              ? styles.cardSelected
              : selectedMode === "map"
              ? styles.blurredCard
              : ""
          }`}
          onClick={() => setSelectedMode("unmap")}
        >
          <img src={unmapicon} alt="unmap" className={styles.modeIcon} />
          <h4>Unmap</h4>
          <p>Unmap manager, campus here</p>
        </div>
      </div>

      {/* FLOATING PANEL (absolute on screen) */}
      {selectedMode && (
        <div
          className={styles.floatingPanel}
          style={{
            top: `${panelPos.top}px`,
            left: `${panelPos.left}px`,
          }}
        >
          <div className={styles.closeCircle} onClick={handleClose}>
           <img src={closeicon} alt="close" className={styles.closeIcon} />
          </div>

          <div className={styles.floatingOptions}>
            {selectedMode === "map" ? (
              <>
                <button className={styles.pillBtn}>
  <img src={groupicon} className={styles.pillIcon} alt="" />
  <span>Assign Group</span>
</button>

<button className={styles.pillBtnAlt}>
  <img src={individulicon} className={styles.pillIcon} alt="" />
  <span>Assign Individual</span>
</button>

              </>
            ) : (
              <>
                <button className={styles.pillBtn}>
  <img src={groupicon} className={styles.pillIcon} alt="" />
  <span>UnAssign Group</span>
</button>

<button className={styles.pillBtnAlt}>
  <img src={individulicon} className={styles.pillIcon} alt="" />
  <span>UnAssign Individual</span>
</button>

              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MappingMode;
