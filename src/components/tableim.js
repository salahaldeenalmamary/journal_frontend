// App.js
import React, {useState}from 'react';
import DynamicTable from './templates/table';
import ModalCompose from './ModalCompose';
import { Button } from 'react-bootstrap';
Button
const DynamicTables = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  const actions = [
    { id: 1, label: 'Edit Submission', variant: 'primary', onClick: row => console.log(`Edit: ${row.id}`) },
    { id: 2, label: 'Similar Articles in MEDLINE', variant: 'danger', onClick: row => console.log(`Delete: ${row.id}`) },
    { id: 3, label: 'Remove Submission', variant: 'primary', onClick: row => console.log(`Edit: ${row.id}`) },
    { id: 4, label: 'Send E-mail', variant: 'danger',   onClick: (row)=>{ handleShowModal} },
    // Add more actions as needed
  ];
  const data = [
    { id: 1, title: 'Task 1', submissionDate: '2023-01-01', statusDate: '2023-01-05', status: 'In Progress' },
    { id: 2, title: 'Task 2', submissionDate: '2023-01-02', statusDate: '2023-01-06', status: 'Completed' },
    { id: 3, title: 'Task 3', submissionDate: '2023-01-03', statusDate: '2023-01-07', status: 'Pending' },
    // Add more data as needed
  ];
  
  const columns = [
    { Header: 'Action', accessor: 'action' },
  
    { Header: 'Title', accessor: 'title' },
    { Header: 'Date Submission Began', accessor: 'submissionDate' },
    { Header: 'Status Date Current', accessor: 'statusDate' },
    { Header: 'Status', accessor: 'status' },
  ];
  

 
  return (
    <div className="App">
      <h1>Dynamic Table Example</h1>
      <Button type="submit" variant="outline-secondary" onClick={handleShowModal} className="float-right">
                  Save Draft
                </Button>
      <DynamicTable columns={columns} data={data}   actions={actions} />
      <ModalCompose show={showModal} onHide={handleHideModal} />
    </div>
  );
};

export default DynamicTables;
