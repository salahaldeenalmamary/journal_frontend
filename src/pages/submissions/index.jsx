import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { fetchSubmissions } from "../../store/entities/submissions";
import submission from "../../data/submission.json";
import SubmissionsTable from "./SubmissionsTable";
import { useParams } from "react-router-dom";
const Submissions = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((store) => store.entities.submissions);
  const { status } = useParams();
  useEffect(() => {
    dispatch(fetchSubmissions());
    console.log(status);
  }, []);
  const [submissions, setSubmissions] = useState(submission);
  const [sortColumn, setSortColumn] = useState({
    path: "title",
    order: "asc",
  });
  const handleSort = (column) => {};
  return (
    <Container fluid>
      <Row className="justify-content-center text-center">
        <h3 className="col">New Submissions Requires Assignments</h3>
        <p>
          <span className="text-info">content:</span>These are the new
          submissions that require an Editor Assignment
        </p>
      </Row>
      <div className="row">
        <SubmissionsTable
          status={status}
          submission={submissions}
          sortColumn={sortColumn}
          onSort={handleSort}
        />
      </div>
    </Container>
  );
};

export default Submissions;
