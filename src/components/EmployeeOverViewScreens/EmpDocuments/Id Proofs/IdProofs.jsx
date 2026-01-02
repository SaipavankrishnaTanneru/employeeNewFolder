import styles from "./IdProofs.module.css"
import EmpViewDocumentCard from "widgets/EmpViewDocumentsCard/EmpViewDocumentCard";

const IdProofs = () =>{

    const idProofsDocuments = [
        {id: "passport",
      heading: "Passport",
      updatedDate: "12 Oct 2020",},
      {id: "panCard",
      heading: "Pan Card",
      updatedDate: "12 Oct 2020",},
      {id: "voterCard",
      heading: "Voter Identity Card",
      updatedDate: "12 Oct 2020",},
      {id: "drivingLicense",
      heading: "Driving License",
      updatedDate: "12 Oct 2020",},
      {id: "aadhaarCard",
      heading: "Aadhaar Card",
      updatedDate: "12 Oct 2020",},
    ]

    return(
        <div className={styles.idProofsNavContent}>
        {idProofsDocuments.map((document) => {
        return (
          <EmpViewDocumentCard
            key={document.id} // Required for list items
            heading={document.heading}
            updatedDate={document.updatedDate}
          />
        );
      })}
        </div>
    )
}

export default IdProofs;