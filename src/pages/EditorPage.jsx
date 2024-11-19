import React from "react";
import MUIBreadCrumbs from "../components/MUIBreadCrumbs";
import styles from "./css/editor.module.css";
import { Button } from "@mui/material";
import TextAreaField from "../components/TextAreaField";
import { useTextAreaContext } from "../context/TextAreaContext";
import { saveFile } from "../database/indexedDB";
import { useDatabaseContext } from "../context/DatabaseContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditorPage() {
  const { value, setValue, fileName, setFileName } = useTextAreaContext();
  const { database } = useDatabaseContext();

  function generateId() {
    const timestamp = Date.now();
    const number = Math.random() * 100000;
    return `${number}-${timestamp}`;
  }

  function handleSaveFile() {
    try {
      if (!value) {
        toast.error("Can't save an empty file.");
        return;
      }

      if (!fileName || fileName.includes(" ")) {
        toast.error("File Name can't include empty space.");
        return;
      }

      const fileData = {
        id: generateId(),
        readmeFile: value,
        fileName,
      };

      if (database) {
        saveFile(database, fileData);
      }

      // clear the input fields
      setFileName("untitled");
      setValue("");
      toast.success("File saved successfully");
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
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
      <ToastContainer />
    </>
  );
}

export default EditorPage;
