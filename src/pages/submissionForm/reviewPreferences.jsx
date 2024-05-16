import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Container } from "react-bootstrap";
import Select from "react-select";
import {
  editorRequested,
  reviewersOpposed,
  reviewersSuggested,
} from "../../store/UI/submissionForm";
import ReviewersTables from "./reviewersTables";
import { useOutletContext } from "react-router-dom";
import { Collapse } from "antd";
import { FaExclamationTriangle, FaRegCheckCircle } from "react-icons/fa";
const EditorsList = [
  {
    value: "1",
    label: "qadoor,Editor in Chef",
  },
  {
    value: "2",
    label: "Mummin,Associated Editor",
  },
  {
    value: "3",
    label: "Salah,Associated Editor",
  },
];
const ReviewPreferences = ({ submission }) => {
  const dispatch = useDispatch();
  const [requestedEditor, setRequestedEditor] = useState({});
  const [suggestedReviewers, setSuggestedReviewers] = useState([]);
  const [opposedReviewers, setOpposedReviewers] = useState([]);
  useEffect(() => {
    setRequestedEditor({});
    if (submission.suggestedReviewers.length) {
      const opposed = submission.suggestedReviewers.filter(
        (r) => !r.isSuggested
      );
      const suggested = submission.suggestedReviewers.filter(
        (r) => r.isSuggested
      );
      setOpposedReviewers(opposed || []);
      setSuggestedReviewers(suggested || []);
    }
  }, [submission]);
  const handleEditorRequest = (editor) => {
    dispatch(editorRequested(editor));
  };
  const handleReviewersSuggested = (reviewers) => {
    dispatch(reviewersSuggested(reviewers));
  };
  const handleReviewersOpposed = (reviewers) => {
    dispatch(reviewersOpposed(reviewers));
  };
  const genExtra = (condition) =>
    condition ? (
      <FaRegCheckCircle color="green" />
    ) : (
      <FaExclamationTriangle color="red" />
    );
  return (
    <Collapse
      className="shadow p-0 m-0"
      expandIconPosition="start"
      size="large"
      accordion
      collapsible="header"
      defaultActiveKey={["1"]}
      items={[
        {
          key: "1",
          label: "Requested Editor :",
          extra: genExtra(requestedEditor),
          children: (
            <>
              <p className="m-3 p-2 border-dark border-top border-bottom">
                Select Section or Category
              </p>
              <Select
                className="w-50  my-5"
                options={EditorsList}
                value={requestedEditor}
                onChange={handleEditorRequest}
              />
            </>
          ),
        },
        {
          key: "2",
          label: "Suggest Reviewers :",
          extra: genExtra(suggestedReviewers.length > 0),
          children: (
            <>
              <ReviewersTables
                onSetReviewers={handleReviewersSuggested}
                reviewers={suggestedReviewers}
              />
            </>
          ),
        },
        {
          key: "3",
          label: "Opposed Reviewers :",
          children: (
            <>
              <ReviewersTables
                onSetReviewers={handleReviewersOpposed}
                reviewers={opposedReviewers}
              />
            </>
          ),
        },
      ]}
    />
  );
};

export default ReviewPreferences;
