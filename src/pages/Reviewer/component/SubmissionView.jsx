import React, { useState } from 'react';
import { Modal, Button } from 'antd'; 
import { Link } from 'react-router-dom';
import FileDownload from '../../../common/FileDownload'; 

function SubmissionView({ fileId , text}) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {/* Render a link/button that triggers the modal to open */}
      <Link onClick={handleOpenModal}>
  {text !== null && text !== undefined ? text : "View Submission"} 
</Link>


      {/* Modal for viewing submission */}
      <Modal
        title="View Submission"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
      >
       
 <FileDownload fileId={fileId} />
      </Modal>
    </>
  );
}

export default SubmissionView;
