import React from 'react';
import { Spin, Card } from 'antd';

const LoadReferenceProgressBar = ({ loading, children }) => {
  return (
    <div>
      {loading ? (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
        
            <Spin size="small" tip="Loading..." />
        
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default LoadReferenceProgressBar;
