import React from "react";
import styles from "./css/button.module.css";
import { useNavigate } from "react-router-dom";

function Button({ heading, description, path = "/" }) {
  const navigate = useNavigate();

  function handleButtonClick() {
    navigate(path);
  }

  return (
    <div className={styles.button_container} onClick={handleButtonClick}>
      <h1>{heading}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default Button;
