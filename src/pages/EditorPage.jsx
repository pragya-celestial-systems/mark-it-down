import React from "react";
import MUIBreadCrumbs from "../components/MUIBreadCrumbs";
import styles from "./css/editor.module.css";
import { Button } from "@mui/material";
import TextAreaField from "../components/TextAreaField";
import { useTextAreaContext } from "../context/TextAreaContext";

function EditorPage() {
  const { value, setValue } = useTextAreaContext();

  function handleSaveFile() {
    if (!value) {
      alert("Can't save empty file.");
      return;
    }

    const files = JSON.parse(localStorage.getItem("files")) || [];
    const fileData = {
      id: files.length,
      readmeFile: value,
    };

    files.push(fileData);
    localStorage.setItem("files", JSON.stringify(files));

    // clear the text field
    setValue("");
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
