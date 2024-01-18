import React from "react";
import { Link } from "react-router-dom";

const Reviews = () => {
  return (
    <div className="row justify-content-center justify-content-md-start">
      <div className="d-none d-md-block col-md-3 ">
        <h2 className="fs-3">Reviewer Main Menu</h2>
      </div>
      <div className="col-11 col-sm-8 col-md-6 col-lg-4">
        <ul className="list-unstyled">
          <h2 className="fs-3">Reviewer Assignments</h2>
          <li> 
            <Link
              to="/reviewerinvatiations"
              className="text-decoration-none ms-4 pe-none link-dark"
              aria-disabled="true"
              tabIndex="-1"
            >
       New invatiations
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="/paddingAssignmentsReViewer"
              className="text-decoration-none ms-4"
            >
              Padding Assignments
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            
            <Link to="/reviewerAssgientment" className="text-decoration-none ms-4">
            Complete Assignments
              <span className="mx-2">(0)</span>
            </Link>
        </li>
        </ul>
       
        
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

export default Reviews;
