import React, { createContext, useContext } from 'react';
import { message  } from 'antd';

const MessageContext = createContext();


export const useMessage = () => useContext(MessageContext);


export const MessageProvider = ({ children }) => {
  
  const {api ,contextHolder }= message.useMessage();
  return (
    <MessageContext.Provider value={api}>
      {children}
    </MessageContext.Provider>
  );
};

export const useApiWithMessage = () => {
  const messageApi =  message; 

  const callApi = async (
    apiCall,
    loadingMessage = 'Loading...',
    successMessage = 'Operation succeeded!',
    errorMessage = 'Operation failed!'
  ) => {
    const key = 'updatable';
    try {
    
      messageApi.loading({
        content: loadingMessage,
        key,
      });
      
     
      const response = await apiCall();
      console.log(response);
      if (response && response.statusCode === 200) {
      
        messageApi.success({
          content: response?.message ,
          key,
          duration: 2,
        });
        console.log(response.message);
      } else {
        
        const message = response?.message ;
        messageApi.error({
          content: message,
          key,
          duration: 2,
        });
      }
      
      return response;
    } catch (error) {
   
      messageApi.error({
        content: error.message || errorMessage,
        key,
        duration: 2,
      });
      throw error;
    }
  };

  return { callApi };
};
