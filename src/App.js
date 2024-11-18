import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import ErrorPage from "./pages/ErrorPage";
import DocumentationPage from "./pages/DocumentationPage";
import { TextAreaContextProvider } from "./context/TextAreaContext";
import { ToggleContextProvider } from "./context/ToggleContext";
import SavedFilesPage from "./pages/SavedFilesPage";
import { useEffect } from "react";
import { initDatabase } from "./database/indexedDB";
import { useDatabaseContext } from "./context/DatabaseContext";

function App() {
  const { database, setDatabase } = useDatabaseContext();

  useEffect(() => {
    async function initializeDB() {
      try {
        const db = await initDatabase();
        setDatabase(db);
      } catch (error) {
        console.error(error);
      }
    }

    initializeDB();
  }, []);

  return (
    <ToggleContextProvider>
      <TextAreaContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/docs" element={<DocumentationPage />} />
            <Route path="/saved" element={<SavedFilesPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </TextAreaContextProvider>
    </ToggleContextProvider>
  );
}

export default App;
