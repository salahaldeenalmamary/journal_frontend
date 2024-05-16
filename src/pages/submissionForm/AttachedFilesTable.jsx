import React, { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";
import Select from "react-select";
import Table from "../../common/table/table";
import { Button, Input } from "antd";

const AttachedFilesTable = ({
  files,
  onDisplayedNameChange,
  onDescriptionChange,
  selectedFiles,
  displayedName,
  // onFileUpdate,
  onRemoveSelectedFiles,
  onFileDownload,
  // onSelectedFiles,
}) => {
  // const [selectedFiles, setSelectedFiles] = useState([]);
  const Items = [
    { value: "coverLatter", label: "Cover latter" },
    { value: "Manuscript", label: "Manuscript" },
    { value: "declarationOfInterest", label: "Declaration of interest" },
    { value: "figure", label: "Figure" },
    { value: "table", label: "Table" },
    { value: "video", label: "Video" },
  ];
  const columns = [
    {
      title: "File Name",
      key: "name",
      render: (_, file) => (
        <Button type="link" onClick={() => onFileDownload(file)}>
          {file.name}
        </Button>
      ),
    },
    {
      key: "displayedName",
      title: "Displayed Name",
      render: (_, file) => (
        <Input
          value={displayedName}
          onChange={(e) => onDisplayedNameChange(e.target.value)}
        />
      ),
    },
    {
      key: "description",
      title: "Description",
      render: (_, file) => (
        <Input
          type={`text`}
          value={file.description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      ),
    },
    { dataIndex: "size", title: "Size", key: "size" },
    {
      dataIndex: "lastModifiedDate",
      title: "Last Modified",
      key: "lastModifiedDate",
    },
  ];
  return (
    <Table
      data={files}
      sortColumn={{ path: "title", order: "asc" }}
      onSort={() => {}}
      columns={columns}
      showPagination={false}
      // className="caption-top"
      // striped
      // bordered
      // hover
    >
      {selectedFiles.length > 0 && (
        <caption>
          <Button variant="danger" onClick={onRemoveSelectedFiles}>
            Remove Selected
          </Button>
        </caption>
      )}
    </Table>
  );
};

export default AttachedFilesTable;
