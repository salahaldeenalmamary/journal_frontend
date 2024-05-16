import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Upload, Button, Space, Card } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import {
  fileUploaded,
  submissionFileUploaded,
} from "../../store/UI/submissionForm";
import AttachedFilesTable from "./AttachedFilesTable";
import { downloadFile, uploadFile } from "../../services/fileService";
const Items = [
  { value: "coverLatter", label: "Cover latter" },
  { value: "Manuscript", label: "Manuscript" },
  { value: "declarationOfInterest", label: "Declaration of interest" },
  { value: "figure", label: "Figure" },
  { value: "table", label: "Table" },
  { value: "video", label: "Video" },
];
const AttachFiles = ({ submission }) => {
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [submissionFiles, setSubmissionFiles] = useState([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [fileDisplayName, setFileDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    const attachment = submission.attachments || [];
    if (attachment.length > 0) {
      setFileDisplayName(attachment[0].displayedName);
      populateAttachments(attachment);
    }
  }, [submission]);
  const populateAttachments = async (attachment) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    try {
      const allFiles = [];
      for (let index = 0; index < attachment.length; index++) {
        const element = attachment[index];
        const { fileId } = element;
        const { data: file } = await downloadFile(fileId);
        allFiles.push({ ...element, file, size: file.size });
      }
      setSubmissionFiles(allFiles);
      // const filename = getFileName(res);
      setIsLoading(false);
      setIsError(false);
      setIsSuccess(true);
    } catch (ex) {
      console.log(ex);
      setIsLoading(false);
      setIsError(false);
      setIsSuccess(false);
    }
  };

  const handleDisplayedNameChange = (name) => {
    setFileDisplayName(name);
  };
  const handleDescriptionChange = (description) => {
    setDescription(description);
  };
  const handleRemoveSelectedFiles = () => {
    if (selectedFiles.length > 0) {
      const updatedFiles = file.filter(
        (file) => !selectedFiles.includes(file.name)
      );
      dispatch(fileUploaded(updatedFiles));
      setSelectedFiles([]);
    }
  };

  const handleSaveChanges = () => {
    const fileId = attachments[0].fileId;
    const updateFile = {
      name: fileName,
      displayedName: fileDisplayName,
      fileId,
    };
    dispatch(
      submissionFileUploaded({
        uploadedFile: updateFile,
      })
    );
  };
  const fileChanged = () => {
    const details = submissionFiles[0];
    const isChanged = details.displayedName === fileDisplayName;
    return isChanged;
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
    },
    customRequest: async (file) => {
      setIsError(false);
      setIsLoading(true);
      setIsSuccess(false);
      try {
        const fileForm = new FormData();
        fileForm.append("file", file);
        const { data: fileId } = await uploadFile(file);
        const fileDetails = {
          name: file.file.name,
          displayedName: file.file.name,
        };
        dispatch(fileUploaded([{ ...fileDetails, fileId }]));
        setIsError(false);
        setIsLoading(false);
        setIsSuccess(true);
        return true;
      } catch (ex) {
        console.log(ex);
        setErrorMsg(ex.message);
        setIsError(true);
        setIsLoading(false);
        setIsSuccess(true);
        return false;
      }
    },
    fileList: [],
    maxCount: 1,
    showUploadList: false,
  };

  const normFile = ({ file, fileList }) => {
    // handleFileUploadAsync(file);

    if (Array.isArray(file)) {
      return file;
    }
    return fileList;
  };
  const handleDownload = (fileRow) => {
    const { file, name } = fileRow;
    const blob = new Blob([file], {
      type: "Application/octet-stream",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <Card
      className="shadow"
      style={{
        marginTop: 16,
      }}
      type="inner"
      title="Upload Submission Files"
      loading={isLoading}
    >
      <Form.Item name="Attachments" getValueFromEvent={normFile}>
        <Upload.Dragger {...props}>
          <Space align="center">
            {/* <Upload {...props} openFileDialogOnClick={false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload> */}
            <div>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </div>
          </Space>
        </Upload.Dragger>
      </Form.Item>
      {/* <Button onClick={handleDownload}>download</Button> */}
      {isError && <h1>{errorMsg}</h1>}
      {submissionFiles && submissionFiles.length > 0 && (
        <>
          <AttachedFilesTable
            files={submissionFiles}
            displayedName={fileDisplayName}
            onDisplayedNameChange={handleDisplayedNameChange}
            onDescriptionChange={() => {}}
            selectedFiles={selectedFiles}
            // onSelectedFiles={(files) => setSelectedFiles(files)}
            // onFileUpdate={handleFileUpdate}
            onRemoveSelectedFiles={() => {}}
            onFileDownload={handleDownload}
          />
          {selectedFiles.length > 0 && (
            <Button variant="danger" onClick={handleRemoveSelectedFiles}>
              Remove Selected
            </Button>
          )}
          {!fileChanged() && (
            <Button onClick={handleSaveChanges}>Save changes</Button>
          )}
        </>
      )}
    </Card>
  );
};

export default AttachFiles;
