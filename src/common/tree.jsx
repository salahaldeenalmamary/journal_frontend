import React, { useState } from 'react';
import { Tree } from 'antd';

export const TreeComponent = ({ dataSource, onChange }) => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleCheck = (checkedKeys, { checked, node: { key } }) => {
    const newSelectedKeys = [...selectedKeys];
    if (checked) {
      newSelectedKeys.push(key);
    } else {
      const index = newSelectedKeys.indexOf(key);
      if (index !== -1) {
        newSelectedKeys.splice(index, 1);
      }
    }
    setSelectedKeys(newSelectedKeys);
    onChange(newSelectedKeys);
  };
  

  return (
    <div style={{ padding: '8px' }}>
      <Tree
        blockNode
        checkable
        checkStrictly
        defaultExpandAll
        checkedKeys={selectedKeys}
        treeData={dataSource}
        onCheck={handleCheck}
      />
    </div>
  );
};

export default TreeComponent;
