import React, { useState } from "react";
import { Col, Container, Form, Button, Table, Card } from "react-bootstrap";
import Select from "react-select";
import ActionButtons from "../ActionButtons";
const Items = [
  { value: "coverLatter", label: "Cover latter" },
  { value: "Manuscript", label: "Manuscript" },
  { value: "declarationOfInterest", label: "Declaration of interest" },
  { value: "figure", label: "Figure" },
  { value: "table", label: "Table" },
  { value: "video", label: "Video" },
];
const FileUploadTable = (props) => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const lastFile = event.target.files["0"];
    for (const file of files) {
      if (file.name === lastFile.name) return;
    }
    const selectedFiles = {
      name: lastFile.name,
      size: lastFile.size,
      lastModifiedDate: new Date().toDateString(),
      order: files.length + 1,
      description: Items[0].value,
      item: Items[0],
    };
    setFiles(() => [...files, selectedFiles]);
  };
  const updateFiles = (fileName, fileAttr, AttrValue) => {
    const fileIndex = files.findIndex((file) => file.name === fileName);
    const file = { ...files[fileIndex] };
    file[fileAttr] = AttrValue;

    setFiles([
      ...files.slice(0, fileIndex),
      file,
      ...files.slice(fileIndex + 1),
    ]);
  };
  const handleItemChange = (item, file) => {
    updateFiles(file, "item", item);
  };

  const handleDescriptionChange = (event, name) => {
    // const
    const fileDescription = event.target.value;
    updateFiles(name, "description", fileDescription);
  };

  const handleFileCheck = (fileName) => {
    const selectedFilesCopy = [...selectedFiles];
    const selectedIndex = selectedFiles.indexOf(fileName);
    selectedIndex !== -1
      ? selectedFilesCopy.splice(selectedIndex, 1)
      : selectedFilesCopy.push(fileName);
    setSelectedFiles(selectedFilesCopy);
  };

  const handleRemoveSelected = () => {
    if (selectedFiles.length > 0) {
      const updatedFiles = files.filter(
        (file) => !selectedFiles.includes(file.name)
      );
      setFiles(updatedFiles);
      setSelectedFiles([]);
    }
  };

  return (
    <>
      <Card>
        <Card.Title>
          <Card.Header className="p-3">Upload Files Submission</Card.Header>
        </Card.Title>
        <Card.Body>
          <>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Files</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
              </Form.Group>
            </Col>

            {files.length > 0 && (
              <Col xs={12} md={12}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Order</th>
                      <th>Item</th>
                      <th>Description</th>
                      <th>File Name</th>
                      <th>Size</th>
                      <th>Last Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file) => (
                      <tr key={file.order}>
                        <td className="text-center">
                          <Form.Check
                            type="checkbox"
                            checked={selectedFiles.includes(file.name)}
                            onChange={(val) => handleFileCheck(file.name)}
                          />
                        </td>
                        <td>{file.order}</td>
                        <td>
                          <Select
                            id="selectTypes"
                            options={Items}
                            value={file.item}
                            onChange={(value) =>
                              handleItemChange(value, file.name)
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            value={file.description}
                            onChange={(e) =>
                              handleDescriptionChange(e, file.name)
                            }
                          />
                        </td>
                        <td>{file.name}</td>
                        <td>{file.size}</td>
                        <td>{file.lastModifiedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {selectedFiles.length > 0 && (
                  <Button variant="danger" onClick={handleRemoveSelected}>
                    Remove Selected
                  </Button>
                )}
              </Col>
            )}
          </>
        </Card.Body>
        {/* <Card.Footer>
        <ActionButtons {...props} />
      </Card.Footer> */}
      </Card>
      <ActionButtons valid={files.length === 0} {...props} />
      <div
        // className="w-100 d-none d-md-block h-50 bg-info"
        style={{ height: "200px" }}
      ></div>
    </>
  );
};

export default FileUploadTable;
