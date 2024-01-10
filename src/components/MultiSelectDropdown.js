import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Select from "react-select";
import ActionButtons from "./ActionButtons";

const MultiSelectDropdown = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "Option1", label: "Option 1" },
    { value: "Option2", label: "Option 2" },
    { value: "Option3", label: "Option 3" },
    // Add more options as needed
  ];

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <Container>
      <Form.Group controlId="formMultiSelect">
        <Form.Label>Select Options</Form.Label>
        <Select
          isMulti
          options={options}
          value={selectedOptions}
          onChange={handleSelectChange}
        />
      </Form.Group>

      <Form.Group controlId="formSelectedOptions">
        <Form.Label>Selected Options</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={selectedOptions.map((option) => option.label).join(", ")}
          readOnly
        />
      </Form.Group>
      <br />
      <ActionButtons valid={selectedOptions.length === 0} {...props} />
    </Container>
  );
};

export default MultiSelectDropdown;
