import React, { useEffect, useState } from "react";
import MUIBreadCrumbs from "../components/MUIBreadCrumbs";
import styles from "./css/editor.module.css";
import { Button } from "@mui/material";
import TextAreaField from "../components/TextAreaField";
import { useTextAreaContext } from "../context/TextAreaContext";
import { getFile, saveFile } from "../database/indexedDB";
import { useDatabaseContext } from "../context/DatabaseContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "react-router-dom";

function EditorPage() {
  const { value, setValue, fileName, setFileName } = useTextAreaContext();
  const { database } = useDatabaseContext();
  const [fileData, setFileData] = useState({});
  const [query] = useSearchParams();
  const id = query.get("id");

  useEffect(() => {
    if (id) {
      getFileData(database, id);
    } else {
      setValue("");
      setFileName("untitled");
    }

    console.log(fileData);
  }, [id]);

  async function getFileData(database, id) {
    try {
      const data = await getFile(database, id);
      console.log(data);
      if (data) {
        console.log("data");
        setFileData(data);
        setValue(data.readmeFile || "");
        setFileName(data.fileName || "untitled");
        toast.success("Editing file.");
      } else {
        toast.error("File not found.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching file data.");
    }
  }

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
      toast.error("Couldn't save file");
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
