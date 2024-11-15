import React, { createContext, useContext, useState } from "react";

const textAreaContext = createContext();

export function TextAreaContextProvider({ children }) {
  const [value, setValue] = useState("");

  return (
    <textAreaContext.Provider value={{ value, setValue }}>
      {children}
    </textAreaContext.Provider>
  );
}

export function useTextAreaContext() {
  return useContext(textAreaContext);
}
