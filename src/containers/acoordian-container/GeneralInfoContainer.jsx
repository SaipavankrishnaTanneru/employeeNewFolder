// AccordianContainer.jsx
import { useState } from "react";
import styles from "./GeneralInfo.module.css";
import FamilyMembersInOrganization from "../../components/EmployeeOverViewScreens/FamilyAddressInfoComponets/accordiansFamily&Address/FamilyMembersIn Organization";
// import PreviousMedicalRecordAccordian from "../../components/accordians/FamilyMembersIn Organization";
import generalInformationIcon from "assets/RightSideInformation Icons/General Information.svg";
import bottomdecoration from 'assets/RightSideInformation Icons/endline.svg'
import ReferenceDetails from "../../components/EmployeeOverViewScreens/FamilyAddressInfoComponets/accordiansFamily&Address/Referencedetails";
import FamilyDetails from "../../components/EmployeeOverViewScreens/FamilyAddressInfoComponets/accordiansFamily&Address/FamilyDetails";

const GeneralInfoContainer = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className={styles.accordian_container}>
      <figure>
        <img src={generalInformationIcon} alt="Accordion header" />
        <p className={styles.accordian_header_text}>General Information</p>
      </figure>

      <div className={styles.accordians}>
      <FamilyDetails
          expanded={expanded === "familyDetails"}
          onChange={(e, isOpen) => setExpanded(isOpen ? "familyDetails" : null)}
        />
    
        <FamilyMembersInOrganization
          expanded={expanded === "lastvisited"}
          onChange={(e, isOpen) => setExpanded(isOpen ? "lastvisited" : null)}
        />
          <ReferenceDetails
          expanded={expanded === "previousrecord"}
          onChange={(e, isOpen) => setExpanded(isOpen ? "previousrecord" : null)}
        />
       
      </div>
      <figure className={styles.bottom_decoration}>
        <img src={bottomdecoration} alt="Bottom Decoration" />
      </figure>
    </div>
  );
};

export default GeneralInfoContainer;