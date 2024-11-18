import React from "react";
import MUIBreadCrumbs from "../components/MUIBreadCrumbs";
import styles from "./css/editor.module.css";
import { Button } from "@mui/material";
import TextAreaField from "../components/TextAreaField";
import { useTextAreaContext } from "../context/TextAreaContext";
import { saveFile } from "../database/indexedDB";
import { useDatabaseContext } from "../context/DatabaseContext";

function EditorPage() {
  const { value } = useTextAreaContext();
  const { database } = useDatabaseContext();

  function generateId() {
    const timestamp = Date.now();
    const number = Math.random() * 100000;
    return `${number}-${timestamp}`;
  }

  function handleSaveFile() {
    try {
      if (!value) {
        alert("Can't save empty file.");
        return;
      }

      const fileData = {
        id: generateId(),
        readmeFile: value,
      };

      if (database) {
        saveFile(database, fileData);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleDownloadFile(isEditable) {
    if (isEditable) {
      console.log("save as readme.md");
    } else {
      console.log("save as index.html");
    }
  }

  return (
    <>
      <div id={styles.topContainer}>
        <MUIBreadCrumbs page="Editor" />
        <Button
          onClick={handleSaveFile}
          style={{ background: "#7077a1" }}
          variant="contained"
          id={styles.saveButton}
        >
          Save
        </Button>
      </div>
      <main id={styles.mainContainer}>
        <div id={styles.codeContainer}>
          <TextAreaField onClick={handleDownloadFile} isEditable={true} />
        </div>
        <div id={styles.previewContainer}>
          <TextAreaField onClick={handleDownloadFile} isEditable={false} />
        </div>
      </main>
    </>
  );
}

export default EditorPage;
