import React, { useEffect, useState } from "react";
import styles from "./css/file.button.module.css";
import { useTextAreaContext } from "../context/TextAreaContext";

function FileButton({ fileData }) {
  const { setValue } = useTextAreaContext();
  const [displayMenu, setDisplayMenu] = useState(false);
  const [menuStyles, setMenuStyles] = useState({});

  useEffect(() => {
    function handleCloseMenu() {
      setDisplayMenu(false);
    }

    window.addEventListener("click", handleCloseMenu);

    return () => {
      window.removeEventListener("click", handleCloseMenu);
    };
  }, []);

  function handleDisplayPreview() {
    setValue(fileData.readmeFile);
  }

  function handleDisplayContextMenu(event) {
    event.preventDefault();
    const { clientX, clientY } = event;
    setDisplayMenu(true);
    setMenuStyles({ top: clientY, left: clientX });
  }

  return (
    <div
      id={styles.container}
      onClick={handleDisplayPreview}
      onContextMenu={handleDisplayContextMenu}
    >
      <h3 id={styles.fileName}>{`File-${fileData.id}`}</h3>
      {displayMenu && (
        <div
          style={menuStyles}
          id={styles.contextMenu}
          onClick={(e) => e.stopPropagation()}
        >
          Hello world
        </div>
      )}
    </div>
  );
}

export default FileButton;
