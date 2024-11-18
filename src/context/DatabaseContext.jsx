import { createContext, useContext, useState } from "react";

const databaseContext = createContext();

export function DatabaseContextProvider({ children }) {
  const [database, setDatabase] = useState({});

  return (
    <databaseContext.Provider value={{ database, setDatabase }}>
      {children}
    </databaseContext.Provider>
  );
}

export function useDatabaseContext() {
  return useContext(databaseContext);
}
