import React, { useEffect } from "react";
import MUIBreadCrumbs from "../components/MUIBreadCrumbs";
import styles from "./css/editor.module.css";
import { Button } from "@mui/material";
import TextAreaField from "../components/TextAreaField";
import { useTextAreaContext } from "../context/TextAreaContext";
import { getFile, saveFile, updateFile } from "../database/indexedDB";
import { useDatabaseContext } from "../context/DatabaseContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useSearchParams } from "react-router-dom";

function EditorPage() {
  const { value, setValue, fileName, setFileName } = useTextAreaContext();
  const { database } = useDatabaseContext();
  const [query] = useSearchParams();
  const id = query.get("id");
  const [params] = useSearchParams();
  const isEditing = params.get("isEditing");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getFileData(id);
    } else {
      setValue("");
      setFileName("untitled");
    }
  }, [id]);

  async function getFileData(id) {
    try {
      const data = await getFile(id);
      if (data) {
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

      let fileData = {
        id: generateId(),
        readmeFile: value,
        fileName,
      };

      if (database) {
        if (isEditing) {
          // Don't update the id (since user is updating the existing data)
          fileData.id = id;

          // update the existing file
          updateFile(fileData);
          toast.success("File updated successfully");

          setTimeout(() => {
            navigate("/saved");
          }, 1000);
        } else {
          saveFile(database, fileData);

          // clear the input fields
          setFileName("untitled");
          setValue("");
          toast.success("File saved successfully");
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Couldn't save file");
    }
  }

  return (
    <>
      <div id={styles.topContainer}>
        <MUIBreadCrumbs page="Editor" />
        <Button
          style={{ background: "#7077a1" }}
          variant="contained"
          onClick={handleSaveFile}
          id={styles.saveButton}
        >
          Save
        </Button>
      </div>
      <main id={styles.mainContainer}>
        <div id={styles.codeContainer}>
          <TextAreaField isEditable={true} isEditing={isEditing} />
        </div>
        <div id={styles.previewContainer}>
          <TextAreaField isEditable={false} isEditing={isEditing} />
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default EditorPage;
