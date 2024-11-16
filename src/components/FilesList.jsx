import React, { useEffect, useState } from "react";
import FileButton from "./FileButton";
import styles from "./css/files.list.module.css";
import TextAreaField from "./TextAreaField";
import { useTextAreaContext } from "../context/TextAreaContext";
import { Height } from "@mui/icons-material";
import { width } from "@mui/system";

function FilesList({ listItems }) {
  const { value, setValue } = useTextAreaContext();

  useEffect(() => {
    if (listItems && listItems.length > 0) {
      setValue(listItems[0].readmeFile);
    }
  }, [listItems]);

  return (
    <div id={styles.container}>
      <div id={styles.buttonsContainer}>
        {listItems &&
          listItems.length > 0 &&
          listItems.map((item) => <FileButton key={item.id} fileData={item} />)}
      </div>
      <div id={styles.verticalLine}></div>
      <div id={styles.previewContainer}>
        <TextAreaField isEditable={false} title="File-0" />
      </div>
    </div>
  );
}

export default FilesList;
