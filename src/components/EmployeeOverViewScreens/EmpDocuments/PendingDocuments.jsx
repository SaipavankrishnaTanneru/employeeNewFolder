import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Chip,
} from "@mui/material";
import { ReactComponent as ExpandIcon } from "assets/Family/expandIcon.svg";
import styles from "./PendingDocuments.module.css";
import accordionheadericon from "assets/Family/accordionheadericon.svg";
import docIcon from "assets/RightSideInformation Icons/docIcon.svg";
import viewIcon from "assets/RightSideInformation Icons/viewIcon.svg";


const PendingDocuments = ({ expanded, onChange }) => {
    return (

        <Accordion
            expanded={expanded}
            onChange={onChange}
            sx={{
                "& .MuiAccordionDetails-root ": { padding: "0px 16px 16px" },
                "&&": {
                    "--Paper-shadow": "none",
                    boxShadow: "none",
                    borderRadius: "10px",
                    border: "1px solid #E6E4F0",
                    background: "rgba(255, 255, 255, 0.40)",
                    backdropFilter: "blur(9.1px)",
                    boxShadow:
                        "0 8px 16px 0 rgba(0, 0, 0, 0.14), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
                },
                "&::before": { display: "none" },
                "& .MuiButtonBase-root": {
                    alignItems: "start",
                    padding: "15px 18px",
                    minHeight: "unset",
                },
                "&.Mui-expanded": {
                    borderRadius: "10px",
                    border: "1px solid #B4BCFF",
                    background: "rgba(255, 255, 255, 0.30)",
                    boxShadow:
                        "0 8px 16px 0 rgba(0, 0, 0, 0.14), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
                    backdropFilter: "blur(9.1px)",
                    margin: "0px",
                },

            }}
        >
            <AccordionSummary
                expandIcon={<ExpandIcon />}
                aria-controls="driver-content"
                id="driver-content"
                sx={{
                    "& .MuiAccordionSummary-content": { margin: "0px !important", alignItems: "center", },
                    "&.Mui-expanded .MuiAccordionSummary-content": {
                        margin: "0px !important",
                    },
                }}
            >
                <Typography component="span" sx={{ width: '100%' }}>
                    <figure className={styles.header_figure}>
                        <div className={styles.header_left}>
                            <img src={accordionheadericon} alt="accordion icon" />
                            <p className={styles.header_text}>
                                Pending Documents
                            </p>
                        </div>
                        <div className={styles.header_right}>
                            {!expanded && (
                                <Chip
                                    label="+3"
                                    size="small"
                                    sx={{
                                        marginLeft: 1,
                                        backgroundColor: "#E8E6FF",
                                        color: "#3425FF",
                                        border: "1px solid #3425FF",
                                        fontSize: "0.75rem",
                                        height: "28px", // <-- Key change: increased height
                                        borderRadius: "16px", // <-- Key change: ensure pill shape
                                        "& .MuiChip-label": {
                                            paddingLeft: "8px",
                                            paddingRight: "8px",
                                        },
                                    }}
                                />
                            )}
                        </div>
                    </figure>
                </Typography>
            </AccordionSummary>
            <AccordionDetails >

<div className={styles.document_item}>
  <div className={styles.document_content}>
    <div className={styles.left_section}>
      <div className={styles.icon_wrapper}>
        <img src={docIcon} alt="document" />
      </div>

      <div className={styles.document_info}>
        <p className={styles.document_label}>Document Name</p>
        <p className={styles.document_name}>Form 16</p>
      </div>
    </div>

    <div className={styles.action_icon}>
      <img src={viewIcon} alt="view" />
    </div>
  </div>
   <div className={styles.document_content}>
    <div className={styles.left_section}>
      <div className={styles.icon_wrapper}>
        <img src={docIcon} alt="document" />
      </div>

      <div className={styles.document_info}>
        <p className={styles.document_label}>Document Name</p>
        <p className={styles.document_name}>Tax Exception Form</p>
      </div>
    </div>

    <div className={styles.action_icon}>
      <img src={viewIcon} alt="view" />
    </div>
  </div>

 <div className={styles.document_content}>
    <div className={styles.left_section}>
      <div className={styles.icon_wrapper}>
        <img src={docIcon} alt="document" />
      </div>

      <div className={styles.document_info}>
        <p className={styles.document_label}>Document Name</p>
        <p className={styles.document_name}>Previous Releaving Form</p>
      </div>
    </div>

    <div className={styles.action_icon}>
      <img src={viewIcon} alt="view" />
    </div>
  </div>


</div>
 

            </AccordionDetails>


        </Accordion>

    );
};

export default PendingDocuments;

