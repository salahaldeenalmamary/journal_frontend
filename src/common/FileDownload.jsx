import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { downloadFile } from '../store/entities/files';
import { Link } from 'react-router-dom';
import {Button} from 'antd';
import config from "../config.json";

function FileDownload({ fileId, islink=true,children ,...rest}) {
  const dispatch = useDispatch();
  const { downloading, downloadedFileData } = useSelector(state => state.entities.File);
  const downloadError = useSelector(state => state.entities.File.downloadError);

const downloadFile =async () =>     {
  try {
    const response = await fetch(`${config.apiUrl}/File/DownloadFile?id=${fileId}`, {
      method: 'GET',
    });

  
    if (response.ok) {
      // Extract filename from the response headers
      const contentDisposition = response.headers.get('content-disposition');
      const filenameMatch = contentDisposition && contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      const filename = filenameMatch && decodeURIComponent(filenameMatch[1].replace(/['"]/g, ''));

      // Convert response to blob
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element and simulate click to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename || 'file'); // Set filename for download
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } else {
      // Handle error responses
      console.error('Failed to download file:', response.statusText);
    }
  } catch (error) {
    console.error('Error downloading file:', error.message);
  }
}



  useEffect(() => {
  console.log(fileId);
  }, [dispatch]);



 

 
  return (
    <div> {islink?( <Link {...rest} onClick={downloadFile}>Download File</Link>):
    <Button {...rest}
    type="outline-primary"
    className="ml-2" onClick={downloadFile}> {children}</Button>}
     
    </div>
  );
}

export default FileDownload;
