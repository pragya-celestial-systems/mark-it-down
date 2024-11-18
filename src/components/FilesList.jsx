import React, { useEffect } from "react";
import FileButton from "./FileButton";
import styles from "./css/files.list.module.css";
import TextAreaField from "./TextAreaField";
import { useTextAreaContext } from "../context/TextAreaContext";
import { Link } from "react-router-dom";

function FilesList({ listItems }) {
  const { setValue } = useTextAreaContext();

  useEffect(() => {
    if (listItems && listItems.length > 0) {
      setValue(listItems[0].readmeFile);
    }
  }, [listItems]);

  return (
    <div id={styles.container}>
      <div id={styles.buttonsContainer}>
        {listItems && listItems.length > 0 ? (
          listItems.map((item) => <FileButton key={item.id} fileData={item} />)
        ) : (
          <div className={styles.messageContainer}>
            <h2>You haven't saved any files yet</h2>
            <Link id={styles.editorRoute} to="/editor">
              Create New File
            </Link>
          </div>
        )}
      </div>
      <div id={styles.verticalLine}></div>
      <div id={styles.previewContainer}>
        {listItems || listItems.length <= 0 ? (
          <div className={styles.messageContainer}>
            <h2>No Preview Available.</h2>
          </div>
        ) : (
          <TextAreaField isEditable={false} title="File-0" />
        )}
      </div>
    </div>
  );
}

export default FilesList;
