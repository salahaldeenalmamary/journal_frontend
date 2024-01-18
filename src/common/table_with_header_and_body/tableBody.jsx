import React, { useState } from "react";
import _ from "lodash";
import { Table, Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";




const TableRowActions = ({ actions, onSelect }) => {
  const [selectedAction, setSelectedAction] = useState(null);

  const handleCheckboxChange = (action) => {
    setSelectedAction(action);
    onSelect(action);
  };

  return (
    <td className="text-center">
      <Form>
        {actions.map((action, index) => (
         <Row >  <Form.Check
         key={index}
         type="checkbox"
         label={action.label}
         checked={selectedAction === action}
         onChange={() => handleCheckboxChange(action)}
       /></Row>
       
        ))}
      </Form>
    </td>
  );
};


const TableBody = ({ data, columns, rowActions , checkboxActions}) => {
  const renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
  
    const cellValue = _.get(item, column.path);
  
    if (_.isObject(cellValue)) {
      // If the cell value is an object, map through key-value pairs
      return Object.entries(cellValue).map(([key, value]) => (
        <div key={key}>
          <strong>{capitalizeWords(key)}: </strong>
          {value}
        </div>
      ));
    }
  
    return cellValue;
  };
  
  // Helper function to capitalize the first character of each word
  const capitalizeWords = (str) => {
    return str
      .split(/[_\s]+/) // Split by space or underscore
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  

  const createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };
  const handleActionSelect = (selectedAction) => {
    console.log("Selected action:", selectedAction);
   
  };
  
  return (
    <tbody>
      {data &&
        data.map((item) => (
          <tr key={item.id}>
           {checkboxActions && (
              <TableRowActions actions={checkboxActions} onSelect={handleActionSelect} />
            )}
          


            {rowActions && (
              <td className="text-center">
                
                {rowActions.map((action, index) => (
                  <Col key={index}>
                  {action.to ? (
                    <Link to={action.to(item)} onClick={() => action.onClick(item)}>
                      {action.label}
                    </Link>
                  ) : (
                    <Link
                      variant="primary"
                      size="sm"
                      className="mr-2"
                      onClick={() => action.onClick(item)}
                    >
                      {action.label}
                    </Link>
                  )}
                </Col>
                ))}
              </td>
            )}
            {columns.map((column) => (
              <td key={createKey(item, column)} className="text-center">
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      {data.length <= 0 && (
        <tr>
          <td
            colSpan={columns.length + (rowActions ? 1 : 0)}
            className="text-center text-danger"
          >
            There are no Data!
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
