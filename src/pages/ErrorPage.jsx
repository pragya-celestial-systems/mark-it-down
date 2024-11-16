import React from "react";
import styles from "./css/error.page.module.css";

function ErrorPage() {
  return (
    <div id={styles.container}>
      <h1 id={styles.errorMessage}>
        Oops, The page you're looking for has been removed or never existed.
      </h1>
    </div>
  );
}

export default ErrorPage;
