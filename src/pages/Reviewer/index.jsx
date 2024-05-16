import React from "react";
import { Link } from "react-router-dom";
import SearchReviewerMain from "../searchReviewer";


const Reviewer = () => {
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
              to="/main/reviewInvitations"
              className="text-decoration-none ms-4"
              aria-disabled="true"
            //   tabIndex="-1"
            >
              New invitations
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="/main/pendingReviewAssignment"
              className="text-decoration-none ms-4"
            >
              Padding Assignments
              <span className="mx-2">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="/main/completedReviewAssignment"
              className="text-decoration-none ms-4"
            >
              Complete Assignments
              <span className="mx-2">(0)</span>
            </Link>
          </li>
        </ul>
      </div>
   
      <div className="col-md-4"></div>
      {/* <Link
              to="/selectedreviewerMain/string"
              className="text-decoration-none ms-4"
              aria-disabled="true"
            //   tabIndex="-1"
            >
              New invitations
              <span className="mx-2">(0)</span>
            </Link> */}
      
    
   
    </div>
  );
};

export default Reviewer;



export { default as CompleteReviewAssignment } from "./CompleteReviewAssignment"; //??
export { default as ReviewReportrecomendition } from "./ReviewReport"; //??
export { default as ReviewInvitations } from "./getAllReviewAssignment"; //??
export { default as PaddingAssignmentsReViewer } from "./PendingReviewAssignment";
export {default  as Recommendation} from "./Recommendation";
 //??

