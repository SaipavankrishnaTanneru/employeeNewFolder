import React, { useState, useRef } from "react";
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import styles from "../EmployeeNavOverview/CategoryInfoContainer.module.css";
import EditPopup from "widgets/Popup/EditPopup";
import AddressInfoUpdate from "../CoDoUpdatePopup/AddressInfoUpdate";
import { useAddressGetQuery } from "api/onBoardingForms/postApi/useAddressQueries";
import { useParams } from "react-router-dom"; 

const AddressInfo = ({ activeId }) => { 
  const { employeeId } = useParams();
  const tempId = activeId || employeeId; 

  const [showEdit, setShowEdit] = useState(false);
  const saveRef = useRef(null);

  const { data: savedData, refetch } = useAddressGetQuery(tempId);

  const getAddressData = (type) => {
    if (!savedData) return null;
    if (type === 'current' && savedData.currentAddress) return savedData.currentAddress;
    if (type === 'permanent' && savedData.permanentAddress) return savedData.permanentAddress;
    if (type === 'current' && Array.isArray(savedData.CURR) && savedData.CURR.length > 0) return savedData.CURR[0];
    if (type === 'permanent' && Array.isArray(savedData.PERM) && savedData.PERM.length > 0) return savedData.PERM[0];
    return null;
  };

  const currData = getAddressData('current');
  const permData = getAddressData('permanent');
  const isSame = savedData?.permanentAddressSameAsCurrent;

  const formatAddressData = (data) => {
    if (!data) return [];
    return [
      { label: "Address Line 1", value: data.houseNo || data.addressLine1 || "-" },
      { label: "City", value: data.cityName || data.city || "-" },
      { label: "District", value: data.districtName || data.district || "-" },
      { label: "State", value: data.stateName || data.state || "-" },
      { label: "Pincode", value: data.postalCode || data.pin || data.pincode || "-" },
    ];
  };

  const currentAddressDisplay = formatAddressData(currData);
  const permanentAddressDisplay = isSame && currData ? currentAddressDisplay : formatAddressData(permData);

  return (
    <div className={styles.address_Info_Container}>
      <div className={styles.address_accordians}>
        <BankInfoWidget 
          title="Current Address" 
          data={currentAddressDisplay} 
          onEdit={() => setShowEdit(true)} 
        />
        <BankInfoWidget 
          title="Permanent Address" 
          data={permanentAddressDisplay} 
        />
      </div>

      <EditPopup
        isOpen={showEdit}
        title="Edit Address Information"
        onClose={() => setShowEdit(false)}
        onSave={() => {
          console.log("🖱️ Save Button Clicked in Popup"); // Check console for this
          if (saveRef.current) {
             saveRef.current(); 
          } else {
             console.error("❌ Ref is null - Form not connected");
          }
        }}
      >
        <AddressInfoUpdate 
          activeId={tempId} 
          onSaveRef={saveRef}
          onSuccess={() => {
            setShowEdit(false);
            refetch(); 
          }}
        />
      </EditPopup>
    </div>
  );
};

export default AddressInfo;