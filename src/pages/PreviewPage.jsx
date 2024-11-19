import React, { useEffect } from "react";
import TextAreaField from "../components/TextAreaField";
import { useSearchParams } from "react-router-dom";
import { getFile } from "../database/indexedDB";
import { useTextAreaContext } from "../context/TextAreaContext";

function PreviewPage() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const { setValue } = useTextAreaContext();

  useEffect(() => {
    getFileData();
  }, []);

  async function getFileData() {
    try {
      const data = await getFile(id);
      setValue(data.readmeFile);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  }

  return (
    <div style={{ width: "70svw", margin: "4rem auto auto auto" }}>
      <TextAreaField isEditable={false} isEditing={false} title="hello world" />
    </div>
  );
}

export default PreviewPage;
