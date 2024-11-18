import React, { useEffect, useState } from "react";
import MUIBreadCrumbs from "../components/MUIBreadCrumbs";
import styles from "./css/saved.files.module.css";
import FilesList from "../components/FilesList";
import { getAllFiles } from "../database/indexedDB";
import { useDatabaseContext } from "../context/DatabaseContext";

function SavedFilesPage() {
  const [filesData, setFilesData] = useState([]);
  const { database } = useDatabaseContext();

  useEffect(() => {
    if (database) {
      getAllFiles(database);
    }
  }, [database]);

  return (
    <div id={styles.container}>
      <MUIBreadCrumbs page="Saved files" />
      <FilesList listItems={filesData} />
    </div>
  );
}

export default SavedFilesPage;
