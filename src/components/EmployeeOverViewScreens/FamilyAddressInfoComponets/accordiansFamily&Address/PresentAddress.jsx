import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ReactComponent as ExpandIcon } from "assets/Family/expandIcon.svg";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import callIcon from "assets/Family/MainInfoCallIcon.svg";
import callIconOutLine from "assets/Family/callIconOutLine.svg";
import styles from "./PresentAddress.module.css"; // Using the CSS module
import FolderIcon from "assets/Family/Folder.svg"

const PresentAddress = ({ expanded, onChange, addressData = {}, emergencyContact = {} }) => {
  const {
    name = "Suresh Raina",
    address = "Infinity Towers, Plot No 2-91/31, near N Convention Road",
    pin = "500081",
    city = "Hyderabad",
    state = "Telangana",
    country = "India",
  } = addressData;

  const {
    contactName = "Kondreddi Vamsi Ramana",
    relationship = "Father",
    phoneNumber ="+91 9949522639"
  } = emergencyContact;

  return (
    <div className={styles.present_container}>
      <Accordion
        expanded={expanded}
        onChange={onChange}
        // className={styles.accordionRoot}
        sx={{
          "& .MuiAccordionDetails-root ": { padding: "0px 35px 16px" },
          "&&": {
            "--Paper-shadow": "none",
            boxShadow: "none",
            borderRadius: "10px",
            border: "1px solid #E6E4F0",
            background: "rgba(255, 255, 255, 0.40)",
            backdropFilter: "blur(9.1px)",
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
          aria-controls="present-content"
          id="present-header"
          className={styles.accordionSummary} 
          sx={{
            "&.Mui-expanded": {
              minHeight: "unset !important", // ✅ override default
            },
            "& .MuiAccordionSummary-content.Mui-expanded": {
              margin: "0 !important", // optional: remove extra margin
            },
          }}// This class is now controlled by the logic in the CSS
        >
          <Typography component="span">
            {/* <Box className={styles.headerBox}>
              <RemoveCircleOutlineIcon className={styles.headerIcon} />
              <Typography variant="h6" className={styles.headerTitle}>
                Present Address
              </Typography>
            </Box> */}
            <figure className={styles.header_figure}>
              <div className={styles.header_left}>
                <img src={FolderIcon} alt="accordion icon" />
                <p className={styles.header_text}>
                  Present Address
                </p>
              </div>
            </figure>
          </Typography>
        </AccordionSummary>

        <AccordionDetails id="present-content">
          <Typography component="div" className={styles.detailsContainer}>
            {/* --- Row 1: Name and Address --- */}
            <div className={styles.infoRow}>
              <div className={styles.infoItem} style={{ flexBasis: "33.33%" }}>
                <Typography variant="subtitle2" className={styles.fieldLabel}>
                  Name
                </Typography>
                <Typography variant="body1" className={styles.fieldValue}>{name}</Typography>
              </div>
              <div className={styles.infoItem} style={{ flexBasis: "66.66%" }}>
                <Typography variant="subtitle2" className={styles.fieldLabel}>
                  Address
                </Typography>
                <Typography variant="body1" className={styles.fieldValue}>{address}</Typography>
              </div>
            </div>

            {/* --- Row 2: Pin, City, State --- */}
            <div className={styles.infoRow}>
              <div className={styles.infoItem} style={{ flexBasis: "33.33%" }}>
                <Typography variant="subtitle2" className={styles.fieldLabel}>
                  Pin
                </Typography>
                <Typography variant="body1" className={styles.fieldValue}>{pin}</Typography>
              </div>
              <div className={styles.infoItem} style={{ flexBasis: "33.33%" }}>
                <Typography variant="subtitle2" className={styles.fieldLabel}>
                  City
                </Typography>
                <Typography variant="body1" className={styles.fieldValue}>{city}</Typography>
              </div>
              <div className={styles.infoItem} style={{ flexBasis: "33.33%" }}>
                <Typography variant="subtitle2" className={styles.fieldLabel}>
                  State
                </Typography>
                <Typography variant="body1" className={styles.fieldValue}>{state}</Typography>
              </div>
            </div>

            {/* --- Row 3: Country, Emergency Contact, Relationship --- */}
            <div className={styles.infoRow}>
              <div className={styles.infoItem} style={{ flexBasis: "33.33%" }}>
                <Typography variant="subtitle2" className={styles.fieldLabel}>
                  Country
                </Typography>
                <Typography variant="body1" className={styles.fieldValue}>{country}</Typography>
              </div>
              <div className={styles.infoItem} style={{ flexBasis: "33.33%" }}>
                <Typography variant="subtitle2" className={styles.fieldLabel}>
                  Emergency Contact Number:
                </Typography>
                <Box className={styles.contactContainer}>
                  <Typography variant="body1" className={styles.fieldValue}>
                    {contactName}
                  </Typography>
                  <Tooltip
                     title={
                      phoneNumber ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <img
                            src={callIconOutLine}
                            alt="Phone" 
                            style={{ width: "14px", height: "14px"}}
                          />
                          <span>{phoneNumber}</span>
                        </div>
                      ) : (
                        "No number available"
                      )
                    }
                    arrow
                    placement="top"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: "#fff",
                          color: "#3425FF",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          padding: "6px 10px",
                          borderRadius: "6px",
                          border: "1px solid #3425FF",
                          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                        },
                      },
                      arrow: {
                        sx: {
                          color: "#FFF", // arrow color same as tooltip background
                          "&::before": {
                            border: "1px solid #3425FF", // ✅ optional: add border around arrow
                          },
                        },
                      },
                    }}
                  >
                    <figure style={{ cursor: phoneNumber ? "pointer" : "default" }}>
                      <img
                        src={callIcon}
                        alt="Call"
                      // onClick={() => phoneNumber && window.open(`tel:${phoneNumber}`)}
                      />
                    </figure>
                  </Tooltip>

                </Box>
              </div>
              <div className={styles.infoItem} style={{ flexBasis: "33.33%" }}>
                <Typography variant="subtitle2" className={styles.fieldLabel}>
                  Relationship:
                </Typography>
                <Typography variant="body1" className={styles.fieldValue}>{relationship}</Typography>
              </div>
            </div>

          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PresentAddress;