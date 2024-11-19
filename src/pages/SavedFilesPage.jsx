import React, { useEffect, useState } from "react";
import MUIBreadCrumbs from "../components/MUIBreadCrumbs";
import styles from "./css/saved.files.module.css";
import FilesList from "../components/FilesList";
import { getAllFiles } from "../database/indexedDB";
import { useDatabaseContext } from "../context/DatabaseContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SavedFilesPage() {
  const [filesData, setFilesData] = useState([]);
  const { database } = useDatabaseContext();

  async function fetchFiles(db) {
    try {
      const data = await getAllFiles(db);
      setFilesData(data);
      toast.success("Files fetched successfully");
    } catch (error) {
      toast.error("Error fetching files.");
    }
  }

  useEffect(() => {
    if (database) {
      fetchFiles(database);
    }
  }, [database]);

  return (
    <div id={styles.container}>
      <MUIBreadCrumbs page="Saved files" />
      <FilesList listItems={filesData} />
      <ToastContainer />
    </div>
  );
}

export default SavedFilesPage;
