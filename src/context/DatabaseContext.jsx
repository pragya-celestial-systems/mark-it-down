import { createContext, useContext, useState } from "react";

const databaseContext = createContext();

export function DatabaseContextProvider({ children }) {
  const [database, setDatabase] = useState(null);
  const [files, setFiles] = useState([]);

  return (
    <databaseContext.Provider
      value={{ database, setDatabase, files, setFiles }}
    >
      {children}
    </databaseContext.Provider>
  );
}

export function useDatabaseContext() {
  return useContext(databaseContext);
}
