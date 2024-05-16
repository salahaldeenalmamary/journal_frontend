import React from 'react';
import { Button, message } from 'antd';

const CustomMessageBox = ({ loadeding, loadingText, successText, onAction }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const openMessage = () => {
    if (loadeding==true) {  messageApi.open({
      key,
      type: 'loading',
      content: loadingText || 'Loading...',
    });}

    if (loadeding) {
      setTimeout(() => {
        messageApi.open({
          key,
          type: 'success',
          content: successText || 'Loaded!',
          duration: 2,
        });
      }, 1000);
    }
  };

  React.useEffect(() => {
    if (onAction) {
      onAction(openMessage); 
    }
  }, [onAction]);

  return (
    <>
      {contextHolder}
    </>
  );
};

export default CustomMessageBox;
