import React, { useEffect, useState } from "react";
import styles from "./css/file.button.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTextAreaContext } from "../context/TextAreaContext";
import { useNavigate } from "react-router-dom";
import { deleteFile, getAllFiles } from "../database/indexedDB";
import { useDatabaseContext } from "../context/DatabaseContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FileButton({ fileData }) {
  const { setValue } = useTextAreaContext();
  const [displayMenu, setDisplayMenu] = useState(false);
  const [menuStyles, setMenuStyles] = useState({});
  const { database, setFiles } = useDatabaseContext();
  const navigate = useNavigate();

  useEffect(() => {
    function handleCloseMenu() {
      setDisplayMenu(false);
    }

    window.addEventListener("click", handleCloseMenu);

    return () => {
      window.removeEventListener("click", handleCloseMenu);
    };
  }, []);

  function addParam(id) {
    const currentPath = new URL(window.location.origin);
    const newPath = `${currentPath}saved/${fileData.id}`;
    window.history.pushState({}, "", newPath);
  }

  function handleDisplayPreview() {
    addParam();
    setValue(fileData.readmeFile);
  }

  function handleDisplayContextMenu(event) {
    event.preventDefault();
    const { clientX, clientY } = event;
    setDisplayMenu(true);
    setMenuStyles({ top: clientY, left: clientX });
  }

  function handleEditFile() {
    navigate(`/editor?id=${fileData.id}&isEditing=true`);
  }

  async function handleDeleteFile() {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this file?"
      );

      if (!confirm) return;

      const response = await deleteFile(database, fileData.id);

      if (response.status === 200) {
        const data = await getAllFiles(database);
        setFiles(data);

        // delete existing toast if any
        if (!toast.isActive("file-delete")) {
          toast.success("File deleted successfully", {
            toastId: "file-delete",
            containerId: "fileButtonToast",
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleOpenPreviewPage() {
    navigate(`/preview/${fileData.id}`);
  }

  return (
    <>
      <div
        id={styles.container}
        onClick={handleDisplayPreview}
        onContextMenu={handleDisplayContextMenu}
      >
        <h3 id={styles.fileName}>{fileData.fileName || "Untitled File"}</h3>
        {displayMenu && (
          <div
            style={menuStyles}
            id={styles.contextMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <p className={styles.option} onClick={handleEditFile}>
              <EditIcon style={{ marginRight: "5px" }} /> Edit
            </p>
            <p className={styles.option} onClick={handleDeleteFile}>
              <DeleteIcon style={{ marginRight: "5px" }} /> Delete
            </p>
            <p className={styles.option} onClick={handleOpenPreviewPage}>
              <VisibilityIcon style={{ marginRight: "5px" }} /> See Preview
            </p>
          </div>
        )}
      </div>
      <ToastContainer containerId="fileButtonToast" closeOnClick={true} />
    </>
  );
}

export default FileButton;
