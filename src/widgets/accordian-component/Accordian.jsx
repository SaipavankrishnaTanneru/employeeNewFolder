
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Accordian.module.css";
import graphTitleIcon from "assets/application-analytics/paper.svg";

const Accordian = ({ zoneTitle, expanded, onChange, children }) => {
  return (
    <Accordion
      expanded={!!expanded}
      onChange={(e, isExpanded) => onChange?.(e, isExpanded)}
      sx={{
        "&.MuiAccordion-root": {
          boxShadow: "none",
          borderRadius: "10px",
          border: "1px solid #E6E4F0",
          background: "rgba(255, 255, 255, 0.40)",
          backdropFilter: "blur(9px)",
          padding: 0, // 
        },
        "&::before": { display: "none" },
        "& .MuiAccordionSummary-root": {
          alignItems: "center",
          minHeight: "unset",
        },
        "& .MuiAccordionSummary-content": {
          // padding: "12px 18px",
          paddingTop: "12px",
          paddingBottom: "12px",
          margin: "0px !important",
        },
        "& .MuiAccordionDetails-root": {
          padding: 0, // optional — remove if you want spacing in details
        },
        "&.Mui-expanded": {
          border: "1px solid #B4BCFF",
          background: "rgba(255, 255, 255, 0.30)",
          boxShadow:
            "0 8px 16px 0 rgba(0, 0, 0, 0.14), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${zoneTitle}-content`}
        id={`${zoneTitle}-header`}
      >
        <Typography component="span">
          <div className={styles.title_header}>
            <figure>
              <img src={graphTitleIcon} alt="Title Icon" />
            </figure>
            <div className={styles.header_right}>
              <p className={styles.header_title}>{zoneTitle}</p>
            </div>
          </div>
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography component="div">{children}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Accordian;
