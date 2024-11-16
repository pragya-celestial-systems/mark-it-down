import React, { useLayoutEffect, useState } from "react";
import MUIBreadCrumbs from "../components/MUIBreadCrumbs";
import styles from "./css/saved.files.module.css";
import FilesList from "../components/FilesList";

function SavedFilesPage() {
  const [filesData, setFilesData] = useState([]);

  useLayoutEffect(() => {
    const files = JSON.parse(localStorage.getItem("files"));
    setFilesData(files);
  }, []);

  return (
    <div id={styles.container}>
      <MUIBreadCrumbs page="Saved files" />
      <FilesList listItems={filesData} />
    </div>
  );
}

export default SavedFilesPage;
