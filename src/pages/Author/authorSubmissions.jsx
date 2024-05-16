import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import {
  fetchSubmissionByAuthorId,
  fetchSubmissions,
} from "../../store/entities/submissions";
import submission from "../../data/submission.json";
import SubmissionsTable from "./submissionsTable";
import { useParams } from "react-router-dom";
const AuthorSubmissions = () => {
  const dispatch = useDispatch();
  const { list, isSuccess, isLoading, isError } = useSelector(
    (store) => store.entities.submissions
  );
  const { status } = useParams();
  useEffect(() => {
    dispatch(fetchSubmissionByAuthorId());
  }, []);
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
        {isLoading && <h1>Loading...</h1>}
        {isSuccess && (
          <SubmissionsTable
            status={status}
            submission={list}
            sortColumn={sortColumn}
            onSort={handleSort}
          />
        )}
      </div>
    </Container>
  );
};

export default AuthorSubmissions;
