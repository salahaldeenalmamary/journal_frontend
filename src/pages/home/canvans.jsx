import { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import { BsSearch } from 'react-icons/bs';
import { SearchOutlined} from '@ant-design/icons';
const OffcanvasT = ({ onSearch, children }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
       <SearchOutlined></SearchOutlined>  advence Search
      </Button>

      <Drawer
        title="Filter"
      
        closable={true}
        onClose={onClose}
        visible={visible}
     
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {children}
          <Button
            type="outline-success"
            className="ms-2 custom-search-button"
            onClick={onSearch}
            icon={<BsSearch />}
          >
            Search
          </Button>
        </Space>
      </Drawer>
    </>
  );
};

export default OffcanvasT;
