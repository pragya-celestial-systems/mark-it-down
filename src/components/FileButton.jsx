import React from "react";
import styles from "./css/file.button.module.css";
import { useTextAreaContext } from "../context/TextAreaContext";

function FileButton({ fileData }) {
  const { setValue } = useTextAreaContext();

  function handleDisplayPreview() {
    setValue(fileData.readmeFile);
  }

  return (
    <div id={styles.container} onClick={handleDisplayPreview}>
      <h3 id={styles.fileName}>{`File-${fileData.id}`}</h3>
    </div>
  );
}

export default FileButton;
