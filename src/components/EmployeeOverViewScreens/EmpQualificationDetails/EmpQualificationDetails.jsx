import styles from "./EmpQualificationDetails.module.css"
import QualificationLeftSide from "./QualificationLeftSide"
import QualificationRightSideInfo from "./QualificationRightSideInfo"

const EmpQualificationDetails = () =>{
    return (
        <>
        <div className={styles.qualificationTabLeftSide}>
            <QualificationLeftSide/>
        </div>
         {/* <div className={styles.qualificationTabRightSide}>
            <QualificationRightSideInfo/>
        </div> */}
        </>
    )
}

export default EmpQualificationDetails;