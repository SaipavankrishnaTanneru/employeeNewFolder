import styles from "./EmpDocuments.module.css"
import DocumentsLeftSide from "./DocumentsLeftSide";
import DocumentsRightSide from "./DocumentsRightSide";

const EmpDocuments = ()=>{
    return(
        <>
        <div className={styles.documentsTabContainer}>
        <div className={styles.documentsTabLeftSide}>
            <DocumentsLeftSide/>
        </div>
        <div className={styles.documentsTabRightSide}>
            <DocumentsRightSide/>
        </div>
        </div>
        </>
    )
}

export default EmpDocuments;