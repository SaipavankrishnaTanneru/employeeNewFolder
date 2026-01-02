import React, { useState } from "react";
import styles from "./AddressInfoUpdate.module.css";
import Dropdown from "widgets/Dropdown/Dropdown";
import InputBox from "widgets/Inputbox/InputBox";
 
const addressDataFromBackend = [
  {
    type: "Permanent Address",
    state: "Andhra Pradesh",
    district: "Kurnool",
    city: "Hyderabad",
    addressLine1: "14-5-67/A",
    addressLine2: "Near Bus Stand",
    pincode: "518001",
  },
  {
    type: "Current Address",
    state: "Telangana",
    district: "Hyderabad",
    city: "Gachibowli",
    addressLine1: "Plot 23",
    addressLine2: "Tech Park Road",
    pincode: "500032",
  },
];
 
const AddressInfoUpdate = () => {
  const [addresses, setAddresses] = useState(
    addressDataFromBackend
  );
 
  const handleChange = (index, field, value) => {
    setAddresses((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };
 
  return (
    <div className={styles.container}>
      {addresses.map((address, index) => (
        <div key={index} className={styles.block}>
          {/* Header */}
          <div className={styles.block_header}>
            {address.type}
          </div>
 
          {/* Fields */}
          <div className={styles.form_grid}>
            <Dropdown
              dropdownname="State"
              value={address.state}
              results={["Andhra Pradesh", "Telangana", "Karnataka"]}
              onChange={(e) =>
                handleChange(index, "state", e.target.value)
              }
            />
 
            <Dropdown
              dropdownname="District"
              value={address.district}
              results={["Kurnool", "Anantapur", "Kadapa", "Hyderabad"]}
              onChange={(e) =>
                handleChange(index, "district", e.target.value)
              }
            />
 
            <Dropdown
              dropdownname="City"
              value={address.city}
              results={["Hyderabad", "Kurnool", "Nandyal", "Gachibowli"]}
              onChange={(e) =>
                handleChange(index, "city", e.target.value)
              }
            />
 
            <InputBox
              label="Address Line 1"
              value={address.addressLine1}
              onChange={(e) =>
                handleChange(index, "addressLine1", e.target.value)
              }
            />
 
            <InputBox
              label="Address Line 2"
              value={address.addressLine2}
              onChange={(e) =>
                handleChange(index, "addressLine2", e.target.value)
              }
            />
 
            <InputBox
              label="Pincode"
              type="number"
              value={address.pincode}
              onChange={(e) =>
                handleChange(index, "pincode", e.target.value)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};
 
export default AddressInfoUpdate;