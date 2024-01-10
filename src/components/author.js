import React from "react";
import { Link } from "react-router-dom";

const Author = () => {
  return (
    <div className="row justify-content-center justify-content-md-start">
      <div className="d-none d-md-block col-md-3 ">
        <h2 className="fs-3">Author Main Menu</h2>
      </div>
      <div className="col-11 col-sm-8 col-md-6 col-lg-4">
        <ul className="list-unstyled">
          <h2 className="fs-3">New submissions</h2>
          <li>
            <Link
              to="/AuthorSubmissionForm"
              className="text-decoration-none ms-4 pe-none link-dark"
              aria-disabled="true"
              tabIndex="-1"
            >
              Submit New ManuScript
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="/submissions/declined"
              className="text-decoration-none ms-4"
            >
              Submissions Sent Back To Author
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link to="/submissions" className="text-decoration-none ms-4">
              Incomplete Submissions
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="/submissions/accepted"
              className="text-decoration-none ms-4"
            >
              Submissions Waiting for Authors Approval
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="/submissions/review"
              className="text-decoration-none ms-4"
            >
              Submissions Being Processed
              <span className="mx-2">(0)</span>
            </Link>
          </li>
        </ul>
        <ul className="list-unstyled">
          <h2 className="fs-3">Revisions</h2>
          <li>
            <Link to="/submissions" className="text-decoration-none ms-4">
              Submissions Needing Revisions
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link to="/submissions" className="text-decoration-none ms-4">
              Revisions Sent Back To Author
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link to="/submissions" className="text-decoration-none ms-4">
              Incomplete Submissions Being Revised
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link to="/submissions" className="text-decoration-none ms-4">
              Revisions Waiting for Authors Approval
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link to="/submissions" className="text-decoration-none ms-4">
              Revisions Being Processed
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link to="/submissions" className="text-decoration-none ms-4">
              Declined Revisions
              <span className="mx-2">(0)</span>
            </Link>
          </li>
        </ul>
        <ul className="list-unstyled">
          <h2 className="fs-3">Complete</h2>
          <li>
            <Link to="/submissions" className="text-decoration-none ms-4">
              Submissions with a Decision
              <span className="mx-2">(0)</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

export default Author;
