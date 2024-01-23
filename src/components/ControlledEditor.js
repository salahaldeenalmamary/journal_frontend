import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from 'react-bootstrap';

const ControlledEditor = () => {
  const [htmlContent, setHtmlContent] = useState('');

  const handleEditorChange = (event, editor) => {
    const newHtmlContent = editor.getData();
    setHtmlContent(newHtmlContent);
  };

  const handleDownload = () => {
  
    const blob = new Blob([htmlContent], { type: 'text/html' });


    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'editor_content.html';


    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  const handleFilePickerChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        setHtmlContent(fileContent);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <Button onClick={handleDownload}>Download</Button>

   
      <input type="file" onChange={handleFilePickerChange} accept=".html" />

      <CKEditor
        editor={ClassicEditor}
        //disabled
        onReady={(editor) => {
          console.log('CKEditor React Component is ready to use!', editor);
        }}

        config={{
          simpleUpload: {
            uploadUrl: 'your_upload_endpoint',
          },
        }}
        data={htmlContent}  // Set the CKEditor content
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default ControlledEditor;
