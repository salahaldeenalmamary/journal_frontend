
  const getHeaders = () => {
    const accessToken = localStorage.getItem('accessToken');
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        
      },
    };
  };

  export default getHeaders;