import React, { useRef, useState } from "react";
import styles from "./css/textarea.field.module.css";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useTextAreaContext } from "../context/TextAreaContext";
import Markdown from "react-markdown";
import { useToggleContext } from "../context/ToggleContext";

function TextAreaField({ isEditable, title, onClick }) {
  const fileTitle = `untitled${isEditable ? ".md" : "-preview.html"}`;
  const codeAreaRef = useRef();
  const { value, setValue } = useTextAreaContext();
  const [fileName, setFileName] = useState(title ? title : fileTitle);
  const { toggleDownload } = useToggleContext();

  function handleEditFileName(e) {
    setFileName(e.target.value);
  }

  return (
    <div id={styles.textAreaContainer}>
      <div className={styles.box}>
        <input
          type="text"
          value={fileName}
          onChange={handleEditFileName}
          id={styles.fileName}
        />
        {toggleDownload && (
          <Button
            style={{ background: "#7077a1" }}
            onClick={() => onClick(isEditable)}
            variant="contained"
            type="button"
          >
            <DownloadIcon />
          </Button>
        )}
      </div>
      {isEditable ? (
        <textarea
          ref={codeAreaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={styles.codeArea}
        ></textarea>
      ) : (
        <div className={styles.previewArea}>
          <Markdown>{value}</Markdown>
        </div>
      )}
    </div>
  );
}

export default TextAreaField;
