import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Select, Input, Row, Col, List } from "antd";
import { criteriaUpdated, Setsearchin } from "../../store/UI/searchReviewers";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined,SaveFilled} from '@ant-design/icons';
const { Option } = Select;

const SearchCriteriaIndex = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [rowCount, setRowCount] = useState(2);
  const { searchCriteria } = useSelector((store) => store.UIS.SearchReviewers);
  const [searchCriteriaTemp, setSearchCriteria] = useState([
    {
      rowNo: 1,
      attribute: "",
      condition: "is",
      selector: "contains",
      value: "",
      combineOperator: "AND",
    },
  ]);

  useEffect(() => {
    handleCriteriaUpdate(searchCriteriaTemp);
  }, [searchCriteriaTemp]);

  const handleAddRow = () => {
    setRowCount((prev) => prev + 1);
    setSearchCriteria((prevCriteria) => [
      ...prevCriteria,
      {
        rowNo: rowCount + 1,
        attribute: "",
        condition: "is",
        selector: "contains",
        value: "",
        combineOperator: "AND",
      },
    ]);
  };

  const handleRemoveRow = (rowNo) => {
    setSearchCriteria((prevCriteria) =>
      prevCriteria.filter((c) => c.rowNo !== rowNo)
    );
  };

  const handleChange = (rowNo, field, value) => {
    setSearchCriteria((prevCriteria) =>
      prevCriteria.map((c) =>
        c.rowNo === rowNo ? { ...c, [field]: value } : c
      )
    );
  };

  const handleCriteriaUpdate = (newCriteria) => {
    dispatch(criteriaUpdated(newCriteria));
  };

  const handleApplySearch = () => {
    history("/selectedreviewertable/string");
    console.log("Applying search:", searchCriteria);
  };

  return (
    <div>
       <Col sm={12} md={3}>
              <strong className="mobile-label">Combine Operator:</strong>
              <Select
                style={{ width: "100%" }}
                
                onChange={(value) => handleChange(1, "combineOperator", value)}
              >
                <Option value="AND">AND</Option>
                <Option value="OR">OR</Option>
              </Select>
            </Col>
      <List size="small"
        bordered 
        dataSource={searchCriteriaTemp}
        renderItem={(item) => (
          <Row gutter={[16, 16]} align="middle" >
            <Col sm={12} md={3}>
              <strong className="mobile-label">Attribute:</strong>
              <Select
                style={{ width: "100%" }}
                value={item.attribute}
                onChange={(value) => handleChange(item.rowNo, "attribute", value)}
              >
                <Option value="name">Name</Option>
                <Option value="email">Email</Option>
                <Option value="country">Country</Option>
                <Option value="phonenumber">Phone Number</Option>
                <Option value="university">University</Option>
              </Select>
            </Col>
            {/* <Col sm={12} md={3}>
              <strong className="mobile-label">Condition:</strong>
              <Select
                style={{ width: "100%" }}
                value={item.condition}
                onChange={(value) => handleChange(item.rowNo, "condition", value)}
              >
                <Option value="is">Is</Option>
                <Option value="isNot">Is Not</Option>
              </Select>
            </Col> */}
            <Col sm={12} md={3}>
              <strong className="mobile-label">Selector:</strong>
              <Select
                style={{ width: "100%" }}
                value={item.selector}
                onChange={(value) => handleChange(item.rowNo, "selector", value)}
              >
                <Option value="contains">Contains</Option>
                <Option value="endsWith">Ends With</Option>
                <Option value="startsWith">Starts With</Option>
                <Option value="equals">Equals</Option>
              </Select>
            </Col>
            <Col sm={12} md={3}>
              <strong className="mobile-label">Value:</strong>
              <Input
                value={item.value}
                onChange={(e) => handleChange(item.rowNo, "value", e.target.value)}
              />
            </Col>
           
            <Col sm={12} md={2}>
              <Button
                type="danger"
                onClick={() => handleRemoveRow(item.rowNo)}
              >
                <DeleteOutlined />
              </Button>
            </Col>
          </Row>
        )}
      />
      <Row justify="end" gutter={[16, 16]}>
        <Col>
          <Button type="primary" onClick={handleAddRow}>
    add
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={handleApplySearch}>
             Search
          </Button>
        </Col>
      </Row>
    </div>
  );
  
};

export default SearchCriteriaIndex;
