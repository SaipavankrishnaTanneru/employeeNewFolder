import React from "react";
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import styles from "../EmployeeNavOverview/PreviousEmployeeInfoContainer.module.css"
import DocumentsWidget from "widgets/InfoCard/DocumentsWidget";
const PreviousEmployeeInfoContainer =() => {

    const previousEmployeeInfo =[
        {label: "Company Name ", value:"RankGuru Technologies"},
        {label:"Designation ", value:"Quality Analyst"},
        {label:"From",value:"12-08-2020"},
        {label:"To",value:"29-08-2025"},
        {label:"Leaving Reason",value:"Health Issue"},
        {label:"Company Address Line 1" , value :"Hyderabed"},
        {label:"Company Address Line 2",value:" Telangana"},
        {label:"Nature Of Duties",value:"1"},
        {label:"Gross Salary per Month",value:"90K"},
        {label:"CTC",value:"9Lpa"}
    ];

    return (
        <div className={styles.Previous_Employee_Info_Container}>
            <div className={styles.Previous_Employee_accordians}>
                <BankInfoWidget title="Previous Employee Info" data={previousEmployeeInfo}/>
            </div>
               <DocumentsWidget
        title="Documents Submitted"
        documents={[
          {
            label: "Previous Offer Letter",
            verified: true,
            onView: () => console.log("View Offer Letter"),
          },
          {
            label: "Experience Letter",
            verified: true,
            onView: () => console.log("View Experience Letter"),
          },
          {
            label: "Relieving Letter",
            verified: true,
            onView: () => console.log("View Relieving Letter"),
          },
          {
            label: "Form 16",
            verified: true,
            onView: () => console.log("View Form 16"),
          },
        ]}
      />
        </div>
    );

};

export default PreviousEmployeeInfoContainer;