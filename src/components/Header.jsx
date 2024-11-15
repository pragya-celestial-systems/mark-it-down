import React from "react";
import styles from "./css/header.module.css";
import { Link } from "react-router-dom";
import SettingsButton from "./SettingsButton";

function Header() {
  return (
    <header id={styles.header}>
      <div id={styles.headerContent}>
        <div>
          <Link id={styles.logo} to="/">
            MarkItDown
          </Link>
        </div>
        <div id={styles.settingsButton}>
          <SettingsButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
