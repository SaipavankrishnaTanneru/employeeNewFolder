import React from "react";

import styles from "./SubmittedDocuments.module.css";
import confirmIconBlue from "assets/EmployeeQu/confirmIconBlue.svg";
import notConfirmIconRed from "assets/EmployeeQu/notConfirIconRed.svg"

const SubmittedDocuments = () =>{

    const submittedDocuements = [
        {id:"10thDocuments", label:"10th Class Certificate", icon:"confirmed"},
        {id:"intermediateDocs", label:"Intermediate Certificate", icon:"notconfirmed"},
        {id:"degreeDocs", label:"Degree Certificate", icon:"notconfirmed"},
        {id:"experienceDocs", label:"Experience Certificate", icon:"confirmed"},
    ]

    return(
        <div className={styles.submittedDocumentsNavContent}>
            {submittedDocuements.map((documents)=>{
                  const iconSrc =
          documents.icon === "confirmed" ? confirmIconBlue : notConfirmIconRed;
                return(
                    <div className={styles.submittedDocument}>
                        <p>{documents.label}</p>
                        <figure>
                            <img src={iconSrc}  alt={document.icon}/>
                        </figure>
                    </div>
                )
            })
            }
        </div>
    )
}

export default SubmittedDocuments;