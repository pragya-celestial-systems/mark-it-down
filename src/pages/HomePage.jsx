import React from "react";
import Button from "../components/Button";
import styles from "./css/home.module.css";

function Home() {
  return (
    <div id={styles.container}>
      <div id={styles.content}>
        <Button
          heading="Editor"
          description="Create a markdown with the live preview and export to html."
          path="/editor"
        />
        <Button
          heading="Documentation & Help"
          description="Documention and help"
          path="/docs"
        />
        <Button
          heading="Saved Files"
          description="view/edit your saved files"
          path="/saved"
        />
      </div>
    </div>
  );
}

export default Home;
