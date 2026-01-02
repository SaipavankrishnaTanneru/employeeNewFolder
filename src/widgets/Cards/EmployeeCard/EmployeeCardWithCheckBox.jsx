import React from "react";
import { Card, CardContent, Avatar, Checkbox } from "@mui/material";
import styles from "./EmployeeCardWithCheckBox.module.css";

const EmployeeCard = ({
    employee,
    onSelect,

    id,
    name,
    dept,
    image,
    styleImg,
    level,
    status,

    isSelected = false,
}) => {
    const data = employee || { id, name, dept, image, styleImg, level, status };

    const UncheckedCircleIcon = (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_i_910_2651)">
                <circle cx="9" cy="9" r="9" fill="#E4E4E4" />
            </g>
            <circle cx="9" cy="9" r="8.75" stroke="#848484" stroke-width="0.5" />
            <defs>
                <filter id="filter0_i_910_2651" x="0" y="0" width="18" height="22" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_910_2651" />
                </filter>
            </defs>
        </svg>

    );

    const BlueTickIcon = (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_i_910_2613)">
                <circle cx="9" cy="9" r="9" fill="#3425FF" />
            </g>
            <circle cx="9" cy="9" r="8.75" stroke="white" stroke-width="0.5" />
            <path d="M6.09657 9.72188L7.77546 11.2072C7.96136 11.3717 8.24492 11.3562 8.4118 11.1724L12.2008 7.00033" stroke="white" stroke-width="1.36078" stroke-linecap="round" />
            <defs>
                <filter id="filter0_i_910_2613" x="0" y="0" width="18" height="22" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_910_2613" />
                </filter>
            </defs>
        </svg>

    );

    const getStatusClass = (st) => {
        switch (st?.toLowerCase()) {
            case "full time":
                return styles.statusFullTime;     // green
            case "contract":
                return styles.statusContract;     // yellow/orange
            case "left":
                return styles.statusLeft;         // red
            default:
                return styles.statusDefault;      // fallback grey
        }
    };

    return (
        <Card className={styles.studentCard} sx={{ position: "relative" }}>
            <Checkbox
                checked={isSelected}
                onChange={(e) => onSelect && onSelect(data, e.target.checked)}
                icon={UncheckedCircleIcon}
                checkedIcon={BlueTickIcon}
                disableRipple
                className={styles.checkboxOverlay}
                sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    padding: 0,
                    zIndex: 10,
                }}
            />

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
                                alt="Employee decoration"
                            />
                        </figure>
                    )}

                    {/* ⭐ Chips Section */}
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

export default EmployeeCard;
