// components/EmployeeLanding/EmployeeManagement.js (unchanged, header removed)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EmployeeManagement.module.css';
import campusflowicon from 'assets/managermappingsearch/campusflowicon.svg';
import rightarrow from 'assets/managermappingsearch/rightarrow';
import Button from 'widgets/Button/Button';

const EmployeeManagement = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/scopes/employee/manage/campus-flow');
  };

  return (
    <div className={styles.campus_wrapper}>
      <div className={styles.centerContainer}>
        <img src={campusflowicon} alt="Campus Flow Illustration" className={styles.flowImg} />
        <h2 className={styles.title}>Campus Flow</h2>
        <p className={styles.subtitle}>
          Check the employees of each campus by hierarchy wise to contact
        </p>
        <Button
          buttonname="Open Campus Flow"
          onClick={handleSubmit}
          type="button"
          righticon={rightarrow}
          variant="primary"
          width="210px"
          disabled={false}
        />
      </div>
    </div>
  );
}

export default EmployeeManagement;