import React from 'react';
import { Card, CardContent, Avatar } from '@mui/material';
import styles from './StudentCard.module.css';

const StudentCard = ({
  // Backward-compatible API
  student,
  onSelect,
  // New, more reusable props (used when `student` is not provided)
  id,
  name,
  fatherName,
  image,
  styleImg,
  currentClass,
  // Customization
  badgeText, // overrides currentClass text if provided
  badgeColor, // 'blue' | 'orange' - determines style class; falls back based on currentClass
  showBadgeLabel = true, // controls the small "Current" label
  className,
  selectable = true, // makes card clickable/focusable when true
  tabIndex,
}) => {
  const data = student || {
    id,
    name,
    fatherName,
    image,
    styleImg,
    currentClass,
  };

  const computedBadgeText = badgeText ?? data.currentClass;
  const computedBadgeClass =
    badgeColor === 'blue'
      ? styles.studentCurrentClassBlue
      : badgeColor === 'orange'
      ? styles.studentCurrentClassOrange
      : data?.currentClass === 'Inter 2'
      ? styles.studentCurrentClassBlue
      : styles.studentCurrentClassOrange;

  const handleClick = () => {
    if (!selectable || !onSelect) return;
    onSelect(student ?? data);
  };

  const handleKeyDown = (e) => {
    if (!selectable || !onSelect) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(student ?? data);
    }
  };

  return (
    <Card
      className={`${styles.studentCard} ${className ? className : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={selectable && onSelect ? 'button' : undefined}
      tabIndex={selectable && onSelect ? (typeof tabIndex === 'number' ? tabIndex : 0) : undefined}
    >
      <div className={styles.studentCardContainer}>
        <Avatar
          alt={data?.name}
          src={data?.image}
          className={styles.studentAvatar}
        />
        <CardContent className={styles.studentCardContent}>
          <div className={styles.studentInfo}>
            <p className={styles.studentId}>{data?.id}</p>
            <p className={styles.studentName}>{data?.name}</p>
            <p className={styles.studentFather}>S/o {data?.fatherName}</p>
          </div>
          <figure className={styles.studentImageStyleContainer}>
            <img src={data?.styleImg} className={styles.studentImageStyle} alt="Student style" />
          </figure>
          <div className={styles.studentChipContainer}>
            {computedBadgeText ? (
              <span className={computedBadgeClass}>{computedBadgeText}</span>
            ) : null}
            {showBadgeLabel ? (
              <span className={styles.studentCurrentLable}>Current</span>
            ) : null}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default StudentCard;