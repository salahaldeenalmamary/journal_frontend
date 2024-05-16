import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Author = () => {
  const { user, selectedRole, isError } = useSelector((store) => store.auth);

  return (
    <div className="row justify-content-center justify-content-md-start">
      <div className="d-none d-md-block col-md-3 ">
        <h2 className="fs-3">Author Main Menu</h2>
      </div>
      <div className="col-11 col-sm-8 col-md-6 col-lg-4">
        <ul className="list-unstyled">
          <h2 className="fs-3">New submissions</h2>
          <li>
            <Link to="submission" className="text-decoration-none ms-4">
              Submit New ManuScript
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="submissions/sent-back"
              className="text-decoration-none ms-4"
            >
              Submissions Sent Back To Author
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="submissions/incomplete"
              className="text-decoration-none ms-4"
            >
              Incomplete Submissions
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="submissions/for-approval"
              className="text-decoration-none ms-4"
            >
              Submissions Waiting for Authors Approval
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="submissions/with-author"
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
            <Link
              to="submissions/revision"
              className="text-decoration-none ms-4"
            >
              Submissions Needing Revisions
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="submissions/declined-revisions"
              className="text-decoration-none ms-4"
            >
              Revisions Sent Back To Author
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="submissions/under-revision"
              className="text-decoration-none ms-4"
            >
              Incomplete Submissions Being Revised
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="submissions/"
              className="text-decoration-none ms-4 pe-none link-dark"
              aria-disabled="true"
              tabIndex="-1"
            >
              Revisions Waiting for Authors Approval
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="submissions"
              className="text-decoration-none ms-4 pe-none link-dark"
              aria-disabled="true"
              tabIndex="-1"
            >
              Revisions Being Processed
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="submissions"
              className="text-decoration-none ms-4 pe-none link-dark"
              aria-disabled="true"
              tabIndex="-1"
            >
              Declined Revisions
              <span className="mx-2">(0)</span>
            </Link>
          </li>
        </ul>
        <ul className="list-unstyled">
          <h2 className="fs-3">Complete</h2>
          <li>
            <Link
              to="submissions"
              className="text-decoration-none ms-4 pe-none link-dark"
              aria-disabled="true"
              tabIndex="-1"
            >
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
export { default as AuthorSubmissions } from "./authorSubmissions"; //checked
