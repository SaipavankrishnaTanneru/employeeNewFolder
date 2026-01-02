import React, { useState } from "react";
import styles from "./FamilyInfoUpdate.module.css";
import Dropdown from "widgets/Dropdown/Dropdown";
import InputBox from "widgets/Inputbox/InputBox";
const familyDataFromBackend = [
    {
      relation: "Father",
      name: "Name of Father",
      email: "design@varsitymgmt.com",
      phone: "9876543210",
      bloodGroup: "A-",
      nationality: "Indian",
      occupation: "IT Job",
    },
    {
      relation: "Mother",
      name: "Name of Mother",
      email: "design@varsitymgmt.com",
      phone: "9876543210",
      bloodGroup: "A-",
      nationality: "Indian",
      occupation: "IT Job",
    },
 
  ];
 
const FamilyInfoUpdate = () => {
  const [familyMembers, setFamilyMembers] = useState(
    familyDataFromBackend
  );
 
  const [familyPhoto, setFamilyPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
 
  const handleChange = (index, field, value) => {
    setFamilyMembers((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };
 
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
 
    setFamilyPhoto(file);
    setPreview(URL.createObjectURL(file));
  };
 
  return (
    <div className={styles.container}>
      {familyMembers.map((item, index) => (
        <div key={index} className={styles.block}>
          {/* Header */}
          <div className={styles.block_header}>
            <span>{item.relation}</span>
          </div>
 
          {/* Fields */}
          <div className={styles.form_grid}>
            <InputBox
              label="Name"
              value={item.name}
              onChange={(e) =>
                handleChange(index, "name", e.target.value)
              }
            />
 
            <InputBox
              label="Email Id"
              value={item.email}
              onChange={(e) =>
                handleChange(index, "email", e.target.value)
              }
            />
 
            <InputBox
              label="Phone Number"
              value={item.phone}
              onChange={(e) =>
                handleChange(index, "phone", e.target.value)
              }
            />
 
            <Dropdown
              dropdownname="Blood Group"
              value={item.bloodGroup}
              results={["A+", "A-", "B+", "B-", "O+", "O-", "AB+"]}
              onChange={(e) =>
                handleChange(index, "bloodGroup", e.target.value)
              }
            />
 
            <Dropdown
              dropdownname="Nationality"
              value={item.nationality}
              results={["Indian", "Other"]}
              onChange={(e) =>
                handleChange(index, "nationality", e.target.value)
              }
            />
 
            <InputBox
              label="Occupation"
              value={item.occupation}
              onChange={(e) =>
                handleChange(index, "occupation", e.target.value)
              }
            />
          </div>
        </div>
      ))}
 
      {/* ================= Family Photo Upload ================= */}
      <div className={styles.photo_block}>
        <h4>Upload Family Photo</h4>
 
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
        />
 
        {preview && (
          <div className={styles.preview}>
            <img src={preview} alt="Family Preview" />
          </div>
        )}
      </div>
    </div>
  );
};
 
export default FamilyInfoUpdate;
 
 