import React,{useEffect,useState } from 'react';
import { Form, Input, Button, Select, Col, Row ,Dropdown,Menu} from 'antd';
import { BsSearch } from 'react-icons/bs';
import { OrderedListOutlined} from '@ant-design/icons';
const { Option } = Select;

const SearchBar = ({ searchTerms, onSearchTermsChange, onSearch, onSortChange, children, sortBy }) => {
  const handleInputChange = (value) => {
    onSearchTermsChange({ ...searchTerms, searchQuery: value });
  };

  const handleSearchByChange = (e) => {
    const { value } = e.item.props; 
    onSearchTermsChange({ ...searchTerms, searchBy: value });
  };
  const handleSearchByChange2 = (value) => {
    
    onSearchTermsChange({ ...searchTerms, searchBy: value });
  };
  
  const handleSortChange = (value) => {
    onSortChange(value);
  };

                const getMenu = () => (
                  <Menu value={searchTerms.searchBy}>
                  {['title', 'subtitle', 'Author', 'Abstract', 'region'].map((option) => (
                    <Menu.Item key={option} value={option} onClick={handleSearchByChange}>
                      {option.charAt(0).toUpperCase() + option.slice(1)} "{searchTerms.searchQuery}"
                    </Menu.Item>
                  ))}
                </Menu>
                
                );

                
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Assuming 768px as mobile breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Listen to window resize event

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []); 
  return ( 
    <div className="container mt-4">
         {!isMobile ?( <Form.Item className="custom-search-bar">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6} xl={5}>
            {children}
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={5}>
            <Select
              placeholder="Search by"
              value={searchTerms.searchBy}
              onChange={handleSearchByChange2}
              style={{ width: '100%' }}
            >
                {['title', 'subtitle', 'Author', 'Abstract', 'region'].map((option) => (
                  <Option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Option>))}
            </Select>
          </Col>
        
          <Col xs={24} sm={12} md={8} lg={6} xl={5}>
          <Dropdown overlay={getMenu() } >
          <Input 
              prefix={<BsSearch style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={`Enter ${searchTerms.searchBy} search`}
              allowClear
              value={searchTerms.searchQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              style={{ width: '100%' }}
            />
              </Dropdown>
           
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={5}>
            <Select
              placeholder="Sort by"
              value={sortBy}
              onChange={handleSortChange}
              style={{ width: '100%' }}
            >
              <Option value="relevance">Relevance</Option>
              <Option value="newest">Newest</Option>
              <Option value="oldest">Oldest</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Button
              type="primary"
              className="ms-2 custom-search-button"
              htmlType="submit"
              onClick={onSearch}
              style={{ width: '100%' }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form.Item>):<>  <Dropdown overlay={getMenu() } >
          <Input 
              prefix={<BsSearch style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={`Enter ${searchTerms.searchBy} search`}
              allowClear
              value={searchTerms.searchQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              style={{ width: '80%' }}
            />

              </Dropdown> {children}   <Select
              placeholder="Sort by"
              value={sortBy}
              onChange={handleSortChange}
              style={{ width: '30%' }}
            >
              <Option value="relevance">Relevance</Option>
              <Option value="newest">Newest</Option>
              <Option value="oldest">Oldest</Option>
            </Select></>}
     
    </div>
  );
};

export default SearchBar;
