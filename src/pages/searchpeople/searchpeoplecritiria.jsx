import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Select, Input, Row, Col, Table ,Typography } from "antd";
import { criteriaUpdated, Setsearchin } from "../../store/UI/searchReviewers";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const SearchPeopleCriteria = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  
  useEffect(() => {
    setColumns([
      {
        title: "Attribute",
        dataIndex: "attribute",
        render: (text, record) => (
          <Select
            style={{ width: 150 }}
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
          <Select
            style={{ width: 120 }}
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
          <Select
            style={{ width: 120 }}
            value={record.selector}
            onChange={(value) => handleChange(record.rowNo, "selector", value)}
          >
            <Option value="contains">Contains</Option>
            <Option value="endsWith">Ends With</Option>
            <Option value="startsWith">Starts With</Option>
            <Option value="equals">Equals</Option>
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
          <Button type="danger" onClick={() => handleRemoveRow(record.rowNo)}>
            Remove
          </Button>
        ),
      },
    ]);
  }, [searchCriteriaTemp]);

  const handleChange = useCallback((rowNo, field, value) => {
    setSearchCriteria((prevCriteria) => 
      prevCriteria.map((item) =>
        item.rowNo === rowNo ? { ...item, [field]: value } : item
      )
    );
  }, []);

  const handleAddRow = () => {
    setRowCount((prev) => prev + 1);
    setSearchCriteria((prevCriteria) => [
      ...prevCriteria,
      {
        rowNo: rowCount,
        attribute: "",
        condition: "",
        selector: "contains",
        value: "",
        combineOperator: "AND",
      },
    ]);
  };

  const handleRemoveRow = (rowNo) => {
    setSearchCriteria((prevCriteria) => 
      prevCriteria.filter((item) => item.rowNo !== rowNo)
    );
  };

  const handleApplySearch = () => {
    dispatch(criteriaUpdated(searchCriteriaTemp));
    console.log("Applying search:", searchCriteriaTemp);
  };

  const handleSelection = (value) => {
    dispatch(Setsearchin(value));
  };
  const [roleType, setRoleType] = useState("all"); // Initial role type
  const roleTypes = ["all", "author", "reviewer", "editor"];
  const handleRoleTypeChange = (value) => {
    setRoleType(value);
  };
  return (
    <div>
     <Table
 scroll={{ x: 500, y: 700 }}
     title={()=>(  <Row> <Typography  level={4}> Role Type :</Typography >
     <Select
       defaultValue="all"
       style={{ width: 120, marginRight: 16 }}
       onChange={handleRoleTypeChange}
     >
       {roleTypes.map((role) => (
         <Option key={role} value={role}>
           {role.charAt(0).toUpperCase() + role.slice(1)}
         </Option>
       ))}
     </Select> </Row>)}
        bordered
        size="small"
        pagination={false}
        columns={columns}
        dataSource={searchCriteriaTemp}
        rowKey="rowNo"
      />  
     
      <Row justify="end" gutter={[16, 16]}>
        <Col>
          <Button type="primary" onClick={handleAddRow}>Add Row</Button>
        </Col>
        <Col>
          <Button type="primary" onClick={handleApplySearch}>Apply Search</Button>
        </Col>
      </Row>
    </div>
  );
};

export default SearchPeopleCriteria;
