import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import ErrorPage from "./pages/ErrorPage";
import DocumentationPage from "./pages/DocumentationPage";
import { TextAreaContextProvider } from "./context/TextAreaContext";

function App() {
  return (
    <TextAreaContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/docs" element={<DocumentationPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </TextAreaContextProvider>
  );
}

export default App;
