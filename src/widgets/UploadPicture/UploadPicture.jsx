import React from 'react';
import styles from './UploadPicture.module.css';
import { ReactComponent as UploadIcon } from '../../assets/application-status/Upload.svg';

const UploadPicture = () =>{
    return(
        <div className={styles.profilePhotoUpload}>
            <label htmlFor="profilePhoto-input" className={styles.profilePhotoLabel}>
              <div className={styles.uploadCircle}>
               <>
                    <figure className={styles.uploadIconFigure}>
                      <UploadIcon className={styles.uploadSvg} />
                    </figure>
                    <span className={styles.uploadText}>Upload image of student</span>
                  </>
              </div>
            </label>
            <input
              id="profilePhoto-input"
              name="profilePhoto"
              type="file"
              accept="image/jpeg,image/jpg,image/png"
            //   onChange={handleSectionChange}
              style={{ display: 'none' }}
              required
            />
            {/* {shouldShowError("profilePhoto") && (
              <div className={styles.General_Info_Section_general_error}>
                {getFieldError("profilePhoto")}
              </div>
            )} */}
          </div>
    )
}

export default UploadPicture;
