import React, { useState } from 'react';
import { Table, Button, Form, Container, Card } from 'react-bootstrap';

const AssignEditorTable = ({ initialAssignments }) => {
  const [assignments, setAssignments] = useState(initialAssignments || [  { id: 1, editorName: 'Serena Walker', classificationMatches: 5, availableDate: '2022-01-01', selected: false },
  { id: 2, editorName: 'John Doe', classificationMatches: 8, availableDate: '2022-01-02', selected: false },]);

  const handleCheckboxChange = (id) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.id === id ? { ...assignment, selected: !assignment.selected } : assignment
      )
    );
  };

  const handleSubmitAll = () => {
    const selectedAssignments = assignments.filter((assignment) => assignment.selected);
    // Perform your submit logic with selectedAssignments
    console.log('Selected Assignments:', selectedAssignments);
  };

  return (
    <Container>

      <Card  className="p-12 ">
       <Card.Title>Assign Editor</Card.Title>
       <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Selected</th>
              <th>Editor Role</th>
              <th>Editor Name</th>
              <th>Current Assignments</th>
              <th>Classification Matches</th>
              <th>Available Date</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    id={`currentAssignments-${assignment.id}`}
                    label=""
                    checked={assignment.selected}
                    onChange={() => handleCheckboxChange(assignment.id)}
                  />
                </td>
                <td>Editor Role</td>
                <td>
                  <a href={`#/${assignment.editorName}`}>{assignment.editorName}</a>
                </td>
                <td>{assignment.selected ? 'Selected' : 'Not Selected'}</td>
                <td>{assignment.classificationMatches}</td>
                <td>{assignment.availableDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Card.Body>
      
      </Card>
      <Button variant="primary" onClick={handleSubmitAll}>
          Submit All Selected
        </Button>
    </Container>
  );
};

export default AssignEditorTable;
