// AboutHtml.js
import React, { useState } from "react";
import { ListGroup , Card} from 'react-bootstrap';

export const Categories = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <div>
      <Card>
      <h6>App Categories</h6>
      <ListGroup variant="flush" className="small">
        {Array.from(Array(10).keys()).map((index) => (
          <ListGroup.Item
            key={index}
            onClick={() => handleItemClick(index)}
            style={{ backgroundColor: selectedItem === index ? 'blue' : '' }}
          >
            Categories {index + 1}
          </ListGroup.Item>
        ))}
      </ListGroup>

     
      </Card>
      
    </div>
  );
};

export default Categories;
