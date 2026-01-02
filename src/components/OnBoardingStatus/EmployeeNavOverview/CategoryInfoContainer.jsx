import React ,{useState} from "react";
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import styles from "../EmployeeNavOverview/CategoryInfoContainer.module.css";
import EditPopup from "widgets/Popup/EditPopup";
import CategoryInfoUpdate from "../CoDoUpdatePopup/CategoryInfoUpdate";
const CategoryInfoContainer =() => {
    const [showEdit, setShowEdit] = useState(false);
    const categoryInfo =[
        {label: "EmployeeType", value:"Full Time"},
        {label:"Department", value:"TeachingStaff"},
        {label:"Designation",value:"Junior Professer"},
        {label:"subject",value:"Physics"},
        {label:"Agreed Periods Per Weak",value:"14 Periods"},
        {label:"Orientation",value:"Neon"}
    ];
 
    return (
        <div className={styles.category_Info_Container}>
            <div className={styles.category_accordians}>
                <BankInfoWidget title="Category Info" data={categoryInfo}  onEdit={() =>  setShowEdit(true)}/>
            </div>
            <EditPopup
        isOpen={showEdit}
        title="Edit Category Information"
        onClose={() => setShowEdit(false)}
        onSave={() => {
          console.log("Save Working Info");
          setShowEdit(false);
        }}
      >
        <CategoryInfoUpdate/>
      </EditPopup>
        </div>
    );
 
};
 
export default CategoryInfoContainer;
 