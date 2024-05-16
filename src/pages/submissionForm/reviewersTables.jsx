import { Button } from "antd";
import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { BsTrash, BsPencil } from "react-icons/bs";
import ReviewerFormModal from "./reviewerFormModal";
const ReviewersTables = ({ reviewers, onSetReviewers }) => {
  const [currentReviewer, setCurrentReviewer] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [reviewerIndex, setReviewerIndex] = useState("");

  const handleEditReviewer = (index) => {
    setReviewerIndex(index);
    setCurrentReviewer(reviewers[index]);
    handleShow();
  };

  const updateReviewersList = (list) => {
    onSetReviewers([...list]);
    handleClose();
  };
  const handleSubmit = (e) => {
    if (Number(reviewerIndex) >= 0) {
      const updateReviewer = { ...e };
      const newList = [
        ...reviewers.slice(0, reviewerIndex),
        updateReviewer,
        ...reviewers.slice(reviewerIndex + 1),
      ];
      updateReviewersList(newList);
    } else if (reviewers.length > 0) {
      if (reviewers.every((r) => r.email !== e.email)) {
        updateReviewersList([...reviewers, e]);
      }
    } else {
      updateReviewersList([...reviewers, e]);
    }
  };

  const handleShow = () => setShowModal(true);

  const handleClose = () => {
    setCurrentReviewer({});
    setReviewerIndex("");
    setShowModal(false);
  };
  const handleDelete = (index) => {
    const updatedReviewers = [...reviewers];
    updatedReviewers.splice(index, 1);
    console.log(updatedReviewers);
    onSetReviewers([...updatedReviewers]);
  };
  return (
    <div>
      <p className="m-3 p-2 border-dark border-top border-bottom">
        Please suggest potential reviewers for this submission and provide
        specific reasons for your suggestion in the comments box for each
        person. Please note that the editorial office may not use your
        suggestions, but your help is appreciated and may speed up the selection
        of appropriate reviewers.
      </p>
      <Container>
        <Table striped bordered hover responsive className="caption-top">
          <caption>
            <Button type={"primary"} onClick={handleShow}>
              Add Reviewer
            </Button>
          </caption>
          <thead>
            <tr>
              <th>Current Suggest Reviewers List</th>
            </tr>
          </thead>
          <tbody>
            {reviewers.length > 0 ? (
              reviewers.map((reviewer, index) => (
                <tr key={index}>
                  <td className="fw-bold">
                    <span className="pr-4">
                      <BsTrash
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        onClick={() => handleDelete(index)}
                      />
                      <BsPencil
                        onClick={() => handleEditReviewer(index)}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                    <strong className="pr-2">{reviewer.firstName}</strong>
                    <strong className="pr-2">{reviewer.lastName}</strong>
                    <strong>{", "}</strong>
                    <strong className="pr-2">{reviewer.university}</strong>
                    {/* {`${reviewer.firstName} ${reviewer.lastName} ${reviewer.institution} `} */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>There Are Currently no Suggested Reviewers</td>
              </tr>
            )}
          </tbody>
        </Table>
        <Button className="mt-2" type={"primary"} onClick={handleShow}>
          Add Reviewer
        </Button>
      </Container>
      <ReviewerFormModal
        showModal={showModal}
        onCloseModal={handleClose}
        onFinish={handleSubmit}
        currentReviewer={currentReviewer}
      />
    </div>
  );
};

export default ReviewersTables;
