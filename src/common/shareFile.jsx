import React, { useState } from 'react';
import { Button } from 'antd';
import config from "../config.json";


function ShareFile ({ fileId,name, islink=true, children, ...rest }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const handleshareFile = async () => {
    try {
      setDownloading(true);

      const response = await fetch(`${config.apiUrl}/File/DownloadFile?id=${fileId}`, {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const file = new File([blob], `${name}.pdf`, { type: 'application/pdf' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Shared PDF File`
          });
        } else {
          throw new Error('File sharing is not supported.');
        }
      } else {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }
    } catch (error) {
      setDownloadError(error.message);
     
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      {islink ? (
        <a href="#" {...rest} onClick={handleshareFile}>
          {children || 'Share File'}
        </a>
      ) : (
        <Button {...rest} onClick={handleshareFile} loading={downloading}>
          {children || 'Share File'}
        </Button>
      )}
    </div>
  );
}

export default ShareFile ;
