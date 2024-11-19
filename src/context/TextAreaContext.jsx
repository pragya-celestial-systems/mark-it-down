import React, { createContext, useContext, useState } from "react";

const textAreaContext = createContext();

export function TextAreaContextProvider({ children }) {
  const [value, setValue] = useState("");
  const [fileName, setFileName] = useState("untitled");

  return (
    <textAreaContext.Provider
      value={{ value, setValue, fileName, setFileName }}
    >
      {children}
    </textAreaContext.Provider>
  );
}

export function useTextAreaContext() {
  return useContext(textAreaContext);
}
