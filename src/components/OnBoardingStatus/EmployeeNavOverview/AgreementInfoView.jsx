import React from "react";
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import styles from "./AgreementInfoView.module.css"

const AgreementInfoView=()=>{
    const agreementInfo =[
        {label:"Agreement Company",value:"Varsity Management"},
        {label:"Agreement Type",value:"Document"},
    ];

    const chequeInfo =[
        {label:"No of Cheques Submitted",value :"2"},
    ];

    const chequeInfo1=[
        {label:"Cheque No ",value:"8272651416282623"},
        {label:"Cheque Bank",value:"ICICI Bank"},
        {label:"IFSC Code",value:"SBIN0001282FD"},
    ];

     const chequeInfo2=[
        {label:"Cheque No ",value:"8272651416282623"},
        {label:"Cheque Bank",value:"ICICI Bank"},
        {label:"IFSC Code",value:"SBIN0001282FD"},
    ];

    return (
        <div className={styles.accordian_container}>
            <div className={styles.accordians}>
                <BankInfoWidget title="Agreement Info" data={agreementInfo}/>
                <BankInfoWidget title="Cheque Info"  data={chequeInfo}/>
            </div>
            <div className={styles.cheque_Info}>
                 <BankInfoWidget title="1st Cheque"  data={chequeInfo1}/>
                  <BankInfoWidget title="2st Cheque"  data={chequeInfo2}/>
            
            </div>
        </div>

    );
};

export default AgreementInfoView;