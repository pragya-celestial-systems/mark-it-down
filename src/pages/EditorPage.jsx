import React from "react";
import MUIBreadCrumbs from "../components/MUIBreadCrumbs";
import styles from "./css/editor.module.css";
import { Button } from "@mui/material";

function EditorPage() {
  return (
    <>
      <div id={styles.topContainer}>
        <MUIBreadCrumbs page="Editor" />
        <Button variant="contained" id={styles.saveButton}>
          Save
        </Button>
      </div>
      <main id={styles.mainContainer}>
        <div id={styles.leftContainer}>
          <h2>Readme.md</h2>
          <textarea name="code-area" id={styles.codeArea}></textarea>
        </div>
        <div id={styles.rightContainer}>
          <h2>Preview</h2>
          <div name="preview-area" id={styles.previewArea}></div>
        </div>
      </main>
    </>
  );
}

export default EditorPage;
