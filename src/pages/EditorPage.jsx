import React, { useEffect, useRef, useState } from "react";
import MUIBreadCrumbs from "../components/MUIBreadCrumbs";
import styles from "./css/editor.module.css";
import { Button } from "@mui/material";
import Markdown from "react-markdown";

function EditorPage() {
  const codeAreaRef = useRef(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    codeAreaRef.current.focus();
  }, []);

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

  return (
    <>
      <div id={styles.topContainer}>
        <MUIBreadCrumbs page="Editor" />
        <Button
          onClick={handleSaveFile}
          variant="contained"
          id={styles.saveButton}
        >
          Save
        </Button>
      </div>
      <main id={styles.mainContainer}>
        <div id={styles.leftContainer}>
          <h2>Readme.md</h2>
          <textarea
            ref={codeAreaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            name="code-area"
            id={styles.codeArea}
          ></textarea>
        </div>
        <div id={styles.rightContainer}>
          <h2>Preview</h2>
          <div name="preview-area" id={styles.previewArea}>
            <Markdown>{value}</Markdown>
          </div>
        </div>
      </main>
    </>
  );
}

export default EditorPage;
