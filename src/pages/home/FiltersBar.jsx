import React, {useState}from 'react';
import {
  Card,
  Form,
  Row,
  Col,
  Dropdown,
  Button,
  Input,
  Checkbox,
  Space,
  DatePicker,Menu ,
  Select,Divider
} from 'antd';
import { DeleteOutlined,SaveFilled} from '@ant-design/icons';
import TreeComponent from '../../common/tree';
const { Option } = Select;

const FilterBars = ({
  showAdvanced,
  startDate,
  endDate,
  filterCriterias,
  Types,
  Classifacations,
  Sections,
  selectedClassifacations,
  selectedTypes,
  selectedSections,
  handleStartDateChange,
  handleEndDateChange,
  handleAddFilter,
  handleFilterTypeChange,
  handleFilterConditionChange,
  handleFilterValueChange,
  handleRemoveFilter,
  handleCheckboxChangeType,
  handleCheckboxChange,
  handleCheckboxChangeS,
  segment=1
}) => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleChange = (keys) => {
    handleCheckboxChange(keys);
    
  };
  return (
    <div >
     {segment == 1 ? (
     <Card bordered={false}  >
        
     <h6>Filter by Publish Date</h6>
     <Row gutter={16}>
       <Col span={12}>
         <Form.Item label="From">
           <DatePicker value={startDate} onChange={handleStartDateChange} />
         </Form.Item>
       </Col>
       <Col span={12}>
         <Form.Item label="To">
           <DatePicker value={endDate} onChange={handleEndDateChange} />
         </Form.Item>
       </Col>
     </Row>
    
     {showAdvanced && (
       <>
        {filterCriterias.map((criteria, index) => (
   <Form.Item key={index}>
     <Row gutter={16}>
       <Col span={13}>
         <Select
           value={criteria.type}
           onChange={(type) => handleFilterTypeChange(type, index)}
           placeholder="Select Type"
         >
           {['title', 'subtitle', 'Author', 'Abstract', 'region'].map((option) => (
             <Option key={option} value={option}>
               {option.charAt(0).toUpperCase() + option.slice(1)}
             </Option>
           ))}
         </Select>
       </Col>
       <Col span={10}>
         <Select
           value={criteria.condition}
           onChange={(condition) => handleFilterConditionChange(condition, index)}
           placeholder="Select Condition"
         >
           <Option value="or">OR</Option>
           <Option value="and">AND</Option>
         </Select>
       </Col>
     </Row>
     <Row gutter={16}>
       <Col span={12}>
         <Input
           type="text"
           placeholder={`Enter ${criteria.type}`}
           value={criteria.value}
           onChange={(e) => handleFilterValueChange(e.target.value, index)}
         />
       </Col>
       <Col span={12}>
         <Button draggable type="danger" onClick={() => handleRemoveFilter(index)}>
           <DeleteOutlined />
         </Button>
       </Col>
     </Row>
     <Divider/>
   </Form.Item>
 ))}
         <Button type="primary" onClick={handleAddFilter}>
           Add Filter
         </Button>
       </>
     )}

<h6> Types</h6>
      {Types.map((section) => (
      <div>  <Checkbox
       
      key={section.id}
      id={`section-checkbox-${section.id}`}
      checked={selectedTypes.includes(section.id)}
      onChange={(e) =>
        handleCheckboxChangeType({
          section: section,
          isChecked: e.target.checked,
        })
      }
    >
      {section.name}
    
    </Checkbox></div>
       
      ))}
 <h6> Classifications</h6>
          <TreeComponent dataSource={Classifacations} onChange={handleChange}></TreeComponent>

       
   
      <h6> Sections</h6>
      {Sections.map((section) => (
       <div> <Checkbox
       key={section.id}
    
       id={`section-checkbox-${section.id}`}
       checked={selectedSections.includes(section.id)}
       onChange={(e) =>
         handleCheckboxChangeS({
           section: section,
           isChecked: e.target.checked,
         })
       }
     >
       {section.name}
     </Checkbox></div>
      ))}

 </Card>
    ) :segment == 2 ? (
      <Card bordered={false}  >
         
      <h6>Filter by Publish Date</h6>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="From">
            <DatePicker value={startDate} onChange={handleStartDateChange} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="To">
            <DatePicker value={endDate} onChange={handleEndDateChange} />
          </Form.Item>
        </Col>
      </Row>
     
      {showAdvanced && (
        <>
         {filterCriterias.map((criteria, index) => (
    <Form.Item key={index}>
      <Row gutter={16}>
        <Col span={13}>
          <Select
            value={criteria.type}
            onChange={(type) => handleFilterTypeChange(type, index)}
            placeholder="Select Type"
          >
            {['title', 'subtitle', 'Author', 'Abstract', 'region'].map((option) => (
              <Option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={10}>
          <Select
            value={criteria.condition}
            onChange={(condition) => handleFilterConditionChange(condition, index)}
            placeholder="Select Condition"
          >
            <Option value="or">OR</Option>
            <Option value="and">AND</Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Input
            type="text"
            placeholder={`Enter ${criteria.type}`}
            value={criteria.value}
            onChange={(e) => handleFilterValueChange(e.target.value, index)}
          />
        </Col>
        <Col span={12}>
          <Button draggable type="danger" onClick={() => handleRemoveFilter(index)}>
            <DeleteOutlined />
          </Button>
        </Col>
      </Row>
    </Form.Item>
  ))}
          <Button type="primary" onClick={handleAddFilter}>
            Add Filter
          </Button>
        </>
      )}
 
      
      
  </Card>
     ) : segment == 3 ? (
      <Card bordered={false}  >
        
      <h6>Filter by Publish Date</h6>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="From">
            <DatePicker value={startDate} onChange={handleStartDateChange} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="To">
            <DatePicker value={endDate} onChange={handleEndDateChange} />
          </Form.Item>
        </Col>
      </Row>
     
    
       <h6> Types</h6>
      {Types.map((section) => (
      <div>  <Checkbox
       
      key={section.id}
      id={`section-checkbox-${section.id}`}
      checked={selectedTypes.includes(section.id)}
      onChange={(e) =>
        handleCheckboxChangeType({
          section: section,
          isChecked: e.target.checked,
        })
      }
    >
      {section.name}
    
    </Checkbox></div>
       
      ))}

     

  </Card>
    ): segment == 4 ? (
      <Card bordered={false}  >
        
          <h6>Filter by Publish Date</h6>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="From">
                <DatePicker value={startDate} onChange={handleStartDateChange} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="To">
                <DatePicker value={endDate} onChange={handleEndDateChange} />
              </Form.Item>
            </Col>
          </Row>
         

          <h6> Classifications</h6>
          <TreeComponent dataSource={Classifacations} onChange={handleChange}></TreeComponent>
         

         

      </Card>
    ) : (
      <Card bordered={false}  >
        
      <h6>Filter by Publish Date</h6>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="From">
            <DatePicker value={startDate} onChange={handleStartDateChange} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="To">
            <DatePicker value={endDate} onChange={handleEndDateChange} />
          </Form.Item>
        </Col>
      </Row>
     
   
      <h6> Sections</h6>
      {Sections.map((section) => (
       <div> <Checkbox
       key={section.id}
       id={`section-checkbox-${section.id}`}
       checked={selectedSections.includes(section.id)}
       onChange={(e) =>
         handleCheckboxChangeS({
           section: section,
           isChecked: e.target.checked,
         })
       }
     >
       {section.name}
     </Checkbox></div>
      ))}

  </Card>
    )}
      
    </div>
  );
};

export default FilterBars;
