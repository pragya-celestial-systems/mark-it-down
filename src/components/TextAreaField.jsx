import React, { useRef } from "react";
import styles from "./css/textarea.field.module.css";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useTextAreaContext } from "../context/TextAreaContext";
import Markdown from "react-markdown";

function TextAreaField({ isEditable, title, onClick }) {
  const fileTitle = `untitled${isEditable ? ".md" : "-preview.html"}`;
  const codeAreaRef = useRef();
  const { value, setValue } = useTextAreaContext();

  return (
    <div id={styles.textAreaContainer}>
      <div className={styles.box}>
        <h2>{title ? title : fileTitle}</h2>
        <Button
          style={{ background: "#7077a1" }}
          onClick={() => onClick(isEditable)}
          variant="contained"
          type="button"
        >
          <DownloadIcon />
        </Button>
      </div>
      {isEditable ? (
        <textarea
          ref={codeAreaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id={styles.codeArea}
        ></textarea>
      ) : (
        <div id={styles.previewArea}>
          <Markdown>{value}</Markdown>
        </div>
      )}
    </div>
  );
}

export default TextAreaField;
