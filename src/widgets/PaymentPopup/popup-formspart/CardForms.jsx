import React from "react";
import Inputbox from "../../Inputbox/InputBox";
import styles from "./CardForms.module.css";

const CardForms = ({ formData, onChange }) => {

  return (
    <div className={styles.wrapper}>
      
      {/* HEADER */}
      <div className={styles.topRow}>
        <label className={styles.checkboxRow}>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            name="card_proCredit"
            checked={formData.card_proCredit || false}
            onChange={(e) =>
              onChange({ target: { name: "card_proCredit", value: e.target.checked } })
            }
          />
          <span className={styles.checkBoxLabel}>PRO Credit Card</span>
        </label>

        <div className={styles.concessionValueBox}>
          <span className={styles.concessionValue}>0</span>
          <p className={styles.concessionLabel}>Application Special Concession Value</p>
        </div>
      </div>

      {/* ROW 1 */}
      <div className={styles.grid}>
        <Inputbox
          label="Payment Date *"
          name="card_paymentDate"
          placeholder="MM/DD/YYYY"
          value={formData.card_paymentDate}
          onChange={onChange}
          type="date"
        />

        <Inputbox
          label="Amount *"
          name="card_amount"
          placeholder="Enter Amount (numbers only)"
          value={formData.card_amount}
          onChange={onChange}
          type="number"
        />
      </div>

      {/* ROW 2 */}
      <div className={styles.grid}>
        <Inputbox
          label="Pre Printed Receipt No *"
          name="card_receiptNo"
          placeholder="Enter Pre Printed Receipt Number"
          value={formData.card_receiptNo}
          onChange={onChange}
        />

        <Inputbox
          label="Remarks"
          name="card_remarks"
          placeholder="Enter Remarks"
          value={formData.card_remarks}
          onChange={onChange}
        />
      </div>

    </div>
  );
};

export default CardForms;
