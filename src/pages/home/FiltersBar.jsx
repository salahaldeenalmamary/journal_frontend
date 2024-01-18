// AboutHtml.js
import React, { useState } from "react";
import { ListGroup, Card } from "react-bootstrap";

export const FiltersBar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <div>
      <Card style={{ width: "300px", marginTop: "20px" }}>
        <Card.Body>
          <Card.Title style={{ fontSize: "1.5rem", marginBottom: "15px" }}>
            App Categories
          </Card.Title>
          <ListGroup variant="flush" className="small">
            {Array.from(Array(10).keys()).map((index) => (
              <ListGroup.Item
                key={index}
                onClick={() => handleItemClick(index)}
                style={{
                  backgroundColor: selectedItem === index ? "#007BFF" : "",
                  color: selectedItem === index ? "#fff" : "#000",
                  cursor: "pointer",
                }}
              >
                Categories {index + 1}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FiltersBar;
