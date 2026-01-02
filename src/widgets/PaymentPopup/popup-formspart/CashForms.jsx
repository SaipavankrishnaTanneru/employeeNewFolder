import React from "react";
import Inputbox from "../../Inputbox/InputBox";
import styles from "./CashForms.module.css";

const CashForms = ({ formData, onChange }) => {
  return (
    <div className={styles.wrapper}>

      <div className={styles.grid}>
        <Inputbox
          label="Payment Date"
          placeholder="Default Date"
          name="paymentDate"
          value={formData?.paymentDate || ""}
          onChange={onChange}
        />

        <Inputbox
          label="Amount"
          placeholder="Enter amount"
          name="amount"
          value={formData?.amount || ""}
          onChange={onChange}
        />
      </div>

      <div className={styles.grid}>
        <Inputbox
          label="Pre Printed Receipt No"
          placeholder="Enter pre printed receipt no"
          name="prePrinted"
          value={formData?.prePrinted || ""}
          onChange={onChange}
        />

        <Inputbox
          label="Remarks"
          placeholder="Enter Remarks"
          name="remarks"
          value={formData?.remarks || ""}
          onChange={onChange}
        />
      </div>

    </div>
  );
};

export default CashForms;
