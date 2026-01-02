import React from "react";
import { Card, CardContent, Avatar } from "@mui/material";
import styles from "./EmployeeCardWithoutCheckBox.module.css";
 
const EmployeeCardWithoutCheckBox = ({
  employee,
  id,
  name,
  dept,
  image,
  styleImg,
  level,
  status,
}) => {
  const data = employee || { id, name, dept, image, styleImg, level, status };
 
  const getStatusClass = (st) => {
    const normalized = st?.toLowerCase().trim();
 
    switch (normalized) {
      case "full time":
      case "permanent":
        return styles.statusFullTime; // green
 
      case "contract":
        return styles.statusContract; // yellow
 
      case "left":
        return styles.statusLeft; // red
 
      default:
        return styles.statusDefault; // grey
    }
  };
 
  return (
    <Card className={styles.studentCard}>
      <div className={styles.studentCardContainer}>
        <Avatar
          alt={data.name}
          src={data.image}
          className={styles.studentAvatar}
        />
 
        <CardContent className={styles.studentCardContent}>
          <div className={styles.studentInfo}>
            <p className={styles.studentId}>{data.id}</p>
            <p className={styles.studentName}>{data.name}</p>
            <p className={styles.studentFather}>{data.dept}</p>
          </div>
 
          {data.styleImg && (
            <figure className={styles.studentImageStyleContainer}>
              <img
                src={data.styleImg}
                className={styles.studentImageStyle}
                alt={`${data.name} decoration`}
              />
            </figure>
          )}
 
          <div className={styles.studentChipContainer}>
            <span className={styles.studentCurrentClassBlue}>
              {data.level}
            </span>
 
            <span className={getStatusClass(data.status)}>
              {data.status}
            </span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
 
export default EmployeeCardWithoutCheckBox;