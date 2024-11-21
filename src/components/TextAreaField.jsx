import React, { useEffect, useRef } from "react";
import styles from "./css/textarea.field.module.css";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useTextAreaContext } from "../context/TextAreaContext";
import Markdown from "react-markdown";
import { useToggleContext } from "../context/ToggleContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TextAreaField({ isEditable, title, isEditing = false }) {
  const codeAreaRef = useRef();
  const previewRef = useRef();
  const { value, setValue, fileName, setFileName } = useTextAreaContext();
  const { toggleDownload } = useToggleContext();

  useEffect(() => {
    if (title) {
      setFileName(title);
    }
  }, []);

  function handleEditFileName(e) {
    if (!isEditing) {
      setFileName(e.target.value);
    }
  }

  function handleDownloadFile() {
    if (!value) {
      if (!toast.isActive("empty-file")) {
        toast.error("Can't download an empty file", {
          toastId: "empty-file",
          containerId: "textAreaToast",
        });
      }
      return;
    }

    let extension = isEditable ? "md" : "html";
    const mimeType = extension === "md" ? "text/markdown" : "text/html";

    let contentToDownload;

    if (mimeType === "text/html") {
      contentToDownload = previewRef.current?.innerHTML || "No content";
    } else {
      contentToDownload = value;
    }

    const blob = new Blob([contentToDownload], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.${extension}`;
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  }

  return (
    <div id={styles.textAreaContainer}>
      <div className={styles.box}>
        {isEditable ? (
          <input
            type="text"
            value={fileName}
            onChange={handleEditFileName}
            className={styles.fileName}
            readOnly={!isEditable}
          />
        ) : (
          <p className={styles.fileName}>{fileName}-preview</p>
        )}
        <Button
          style={{ background: "#7077a1" }}
          onClick={handleDownloadFile}
          variant="contained"
          type="button"
          disabled={toggleDownload}
        >
          <DownloadIcon />
        </Button>
      </div>
      {isEditable ? (
        <textarea
          ref={codeAreaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={styles.codeArea}
        ></textarea>
      ) : (
        <div className={styles.previewArea} ref={previewRef}>
          <Markdown>{value}</Markdown>
        </div>
      )}
      <ToastContainer containerId="textAreaToast" closeOnClick={true} />
    </div>
  );
}

export default TextAreaField;
