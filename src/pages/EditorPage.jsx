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

        if (!toast.isActive("edit-file")) {
          toast.warn("Editing File", {
            toastId: "edit-file",
            containerId: "editorPageToast",
          });
        }
      } else {
        if (!toast.isActive("not-found")) {
          toast.error("File not found", {
            toastId: "not-found",
            containerId: "editorPageToast",
          });
        }
      }
    } catch (error) {
      toast.error("Error fetching file data.", {
        containerId: "editorPageToast",
      });
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
        if (!toast.isActive("save-empty-file")) {
          toast.error("Can't save an empty file.", {
            toastId: "save-empty-file",
            containerId: "editorPageToast",
          });
          return;
        }
      }

      if (!fileName || fileName.includes(" ")) {
        if (!toast.isActive("space")) {
          toast.error("File Name can't include space.", {
            toastId: "space",
            containerId: "editorPageToast",
          });
          return;
        }
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

          if (!toast.isActive("file-update")) {
            toast.success("File updated successfully", {
              toastId: "file-update",
              containerId: "editorPageToast",
            });
          }

          setTimeout(() => {
            navigate("/saved");
          }, 1000);
        } else {
          saveFile(database, fileData);

          // clear the input fields
          setFileName("untitled");
          setValue("");

          if (!toast.isActive("file-saved")) {
            toast.success("File saved successfully", {
              toastId: "file-saved",
              containerId: "editorPageToast",
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Couldn't save file", { containerId: "editorPageToast" });
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
      <ToastContainer containerId="editorPageToast" closeOnClick={true} />
    </>
  );
}

export default EditorPage;
