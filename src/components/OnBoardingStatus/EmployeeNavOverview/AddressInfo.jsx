import React from "react";
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import styles from "../EmployeeNavOverview/CategoryInfoContainer.module.css";
import EditPopup from "widgets/Popup/EditPopup";
import AddressInfoUpdate from "../CoDoUpdatePopup/AddressInfoUpdate";
import { useState } from 'react';
 
const AddressInfo = () => {
    const [showEdit, setShowEdit] = useState(false);
     const addressInfo =[
        {label:"State", value:"Andhra Pradesh"},
        {label:"District", value:"Kurnool"},
        {label:"City",value:"Hyderabad"},
        {label:"Address Line 1",value:"14-5-67/A"},
        {label:"Address Line 2",value:"Near Bus Stand"},
    ];
 
    return (
        <div className={styles.address_Info_Container}>
            <div className={styles.address_accordians}>
                <BankInfoWidget title="Address Info" data={addressInfo} onEdit={() => setShowEdit(true)}/>
            </div>
           
      <EditPopup
        isOpen={showEdit}
        title="Edit Address Information"
        onClose={() => setShowEdit(false)}
        onSave={() => {
          console.log("Save Working Info");
          setShowEdit(false);
        }}
      >
        <AddressInfoUpdate/>
      </EditPopup>
        </div>
    );
}
 
export default AddressInfo;
 