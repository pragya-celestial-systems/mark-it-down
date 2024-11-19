import React, { useEffect } from "react";
import MUIBreadCrumbs from "../components/MUIBreadCrumbs";
import styles from "./css/saved.files.module.css";
import FilesList from "../components/FilesList";
import { getAllFiles } from "../database/indexedDB";
import { useDatabaseContext } from "../context/DatabaseContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SavedFilesPage() {
  const { files, setFiles } = useDatabaseContext();
  const { database } = useDatabaseContext();

  async function fetchFiles(db) {
    try {
      const data = await getAllFiles(db);
      setFiles(data);
    } catch (error) {
      toast.error("Error fetching files");
      console.error(error);
    }
  }

  function addQueryParam(fileData) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("id", fileData.id);
    window.history.pushState({}, "", newUrl);
  }

  useEffect(() => {
    if (database) {
      fetchFiles(database);
    }
  }, [database]);

  useEffect(() => {
    if (files.length > 0) {
      addQueryParam(files[0]);
    }
  }, [files]);

  return (
    <div id={styles.container}>
      <MUIBreadCrumbs page="Saved files" />
      <FilesList listItems={files} />
      <ToastContainer />
    </div>
  );
}

export default SavedFilesPage;
