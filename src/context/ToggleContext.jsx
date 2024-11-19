import { createContext, useContext, useState } from "react";

const toggleContext = createContext();

export function ToggleContextProvider({ children }) {
  const [toggleDownload, setToggleDownload] = useState(false);

  return (
    <toggleContext.Provider value={{ toggleDownload, setToggleDownload }}>
      {children}
    </toggleContext.Provider>
  );
}

export function useToggleContext() {
  return useContext(toggleContext);
}
