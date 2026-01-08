// src/components/FormValidationAlert.jsx
import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const FormValidationAlert = () => {
  const { submitCount, isValid, errors } = useFormikContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 🔍 Debugging Logs: Check your console when you click "Save"
    console.log("Validation State:", { submitCount, isValid, errors });

    if (submitCount > 0 && !isValid) {
      setOpen(true);
    }
  }, [submitCount, isValid, errors]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      // 🛠 FIX: Force high Z-Index so it appears above Modals
      sx={{ zIndex: 9999 }} 
    >
      <Alert 
        onClose={handleClose} 
        severity="error" 
        variant="filled"
        sx={{ width: "100%", fontSize: "1rem" }}
      >
        Please fill all mandatory fields marked with (*) to proceed.
      </Alert>
    </Snackbar>
  );
};

export default FormValidationAlert;