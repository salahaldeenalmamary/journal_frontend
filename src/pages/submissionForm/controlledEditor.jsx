import React, { useEffect, useMemo, useState } from "react";

import { Card } from "react-bootstrap";
import QuillEditor from "react-quill";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-quill/dist/quill.snow.css";
import { Button } from "antd";
const ControlledEditor = ({ content, onSave }) => {
  const [editorContent, setEditorContent] = useState("");
  const [contentString, setContentString] = useState("");
  useEffect(() => {
    if (content) setEditorContent(content);
  }, [content]);
  const onContentChange = (value, delta, source, editor) => {
    setEditorContent(value);
    setContentString(editor.getText());
  };
  const handleSave = () => {
    onSave(editorContent, contentString);
  };
  const isChanged = () => {
    return editorContent === content;
  };
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [
          "bold",
          "italic",
          "underline",
          "strike",
          { script: "sub" }, // subscript
          { script: "super" }, // superscript
        ], // toggled buttons
        ["blockquote", "code-block"],
        ["link"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["clean"], //deletes style
      ],
    },
    clipboard: {
      matchVisual: true,
    },
  }));
  return (
    <>
      <QuillEditor
        style={{ marginTop: "1rem", height: "250px" }}
        // ref={editorRef}
        theme="snow"
        value={editorContent}
        modules={modules}
        onChange={onContentChange}
      />
      <Button disabled={isChanged()} type="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </>
  );
};

export default ControlledEditor;
