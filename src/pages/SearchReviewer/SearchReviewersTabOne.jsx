import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Select, Input, Row, Col, Table } from "antd";
import { criteriaUpdated ,Setsearchin} from "../../store/UI/searchReviewers";
import { Await } from "react-router-dom";
import ReviewerSelectionSearch from "./component/ReviewerSelectionSearch";
const { Option } = Select;
import { Link , useNavigate} from "react-router-dom";

const SearchReviewersTabOne = () => {
  const dispatch = useDispatch();
const history=useNavigate();
  const [rowCount, setRowCount] = useState(2);
  const { searchCriteria } = useSelector((store) => store.UIS.SearchReviewers);
  const [searchCriteriaTemp, setSearchCriteria] = useState([
    {
      rowNo: 1,
      attribute: "",
      condition: "",
      selector: "contains",
      value: "",  
      combineOperator: "AND",
    },
  ]);
  const [columns, setColumns] = useState([]);
  const [selectedValue, setSelectedValue] = useState(1); // State to store the selected value

  const handleSelection = (value) => {
    console.log(value);
   dispatch( Setsearchin(value));
  
  };
  useEffect(() => {
    setColumns([
      {
        title: "Attribute",
        dataIndex: "attribute",
        render: (text, record) => (
          <Select style={{ width: 120 }}
            value={record.attribute}
            onChange={(value) => handleChange(record.rowNo, "attribute", value)}
          >
            <Option value="name">Name</Option>
            <Option value="email">Email</Option>
            <Option value="country">Country</Option>
            
            <Option value="phonenumber">Phone Number</Option>
             <Option value="university">University</Option>
          </Select>
        ),
      },
      {
        title: "is/IsNot",
        dataIndex: "condition",
        render: (text, record) => (
          <Select style={{ width: 120 }}
            value={record.condition}
            onChange={(value) => handleChange(record.rowNo, "condition", value)}
          >
            <Option value="is">Is</Option>
            <Option value="isNot">Is Not</Option>
          </Select>
        ),
      },
      {
        title: "Selector",
        dataIndex: "selector",
        render: (text, record) => (
          <Select style={{ width: 120 }}
            value={record.selector}
            onChange={(value) => handleChange(record.rowNo, "selector", value)}
          >
           
            <Option value="contains">Contains</Option>
            <Option value="endsWith">Ends With</Option>
            <Option value="startsWith">Starts With</Option>
            <Option value="equals">equals </Option>
            
          </Select>
        ),
      },
      {
        title: "Value",
        dataIndex: "value",
        render: (text, record) => (
          <Input
            value={record.value}
            onChange={(e) => handleChange(record.rowNo, "value", e.target.value)}
          />
        ),
      },
      {
        title: "Combine Operator",
        dataIndex: "combineOperator",
        render: (text, record) => (
          <Select
            value={record.combineOperator}
            onChange={(value) => handleChange(record.rowNo, "combineOperator", value)}
          >
            <Option value="AND">AND</Option>
            <Option value="OR">OR</Option>
          </Select>
        ),
      },
      {
        title: "Remove Row",
        render: (text, record) => (
          <Button
            type="danger"
            onClick={() => handleRemoveRow(record.rowNo)}
          >
            Remove
          </Button>
        ),
      },
    ]);
  }, [dispatch,searchCriteriaTemp,searchCriteria]);
  
  const handleAddRow = () => {
    setRowCount((prev) => prev + 1);
    setSearchCriteria((prevCriteria) => [
      ...prevCriteria,
      {
        attribute: "",
        condition: "",
        value: "string",
        selector: "string",
        isInclusive: true,
        combineOperator: "string"
      },
    ]);
    handleCriteriaUpdate(searchCriteriaTemp);
  };

  const handleRemoveRow = (row) => {
    setSearchCriteria((prevCriteria) =>
      prevCriteria.filter((c) => c.rowNo !== row)
    );
    handleCriteriaUpdate(searchCriteriaTemp);
  };

  const handleChange = (row, field, value) => {
    const rowIndex = searchCriteriaTemp.findIndex((r) => r.rowNo === row);
    setSearchCriteria((prevCriteria) => {
      const updatedCriteria = [...prevCriteria];
      updatedCriteria[rowIndex][field] = value;
      return updatedCriteria;
    });
  };
  const handleCriteriaUpdate = (newCriteria) => {
    dispatch(criteriaUpdated(newCriteria));
  };

  const handleApplySearch  = () => {
    handleCriteriaUpdate(searchCriteriaTemp);
   
  
    history("/main/selectedreviewertable/string");
    
    console.log("Applying search:", searchCriteria);
  };

  return (
    <div>  <ReviewerSelectionSearch onSelect={handleSelection} />
      <Table
        bordered
        columns={columns}
        dataSource={searchCriteriaTemp}
        rowKey="rowNo"
      />
      <Row justify="end" gutter={[16, 16]}>
        <Col>
          <Button type="primary" onClick={handleAddRow} >Add Row</Button>
        </Col>
        <Col>
        <Button type="primary" onClick={handleApplySearch} >Apply Search</Button>
          
        </Col>
      </Row>
    </div>
  );
};

export default SearchReviewersTabOne;
