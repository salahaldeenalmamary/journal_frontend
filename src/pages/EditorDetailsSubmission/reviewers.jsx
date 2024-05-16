import { Descriptions, Space } from "antd";
import React from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Reviewers = ({ labelStyle, contentStyle }) => {
  const {
    currentReviewers,
    alternateReviewers,
    proposedReviewersByEditors,
    suggestedReviewersByAuthor,
  } = useSelector((store) => store.entities.SubmissionDetails);
  const handleReviewersItems = (reviewer) => [
    { label: "Name", children: reviewer.name },
    { label: "Review status", children: reviewer.reviewState },
    { label: "Date Reviewer Invited", children: reviewer.invitationDate },
    { label: "Date Reviewer Agreed", children: reviewer.acceptationDate },
    { label: "Date Reviewer Dou", children: reviewer.duoDate },
    { label: "Date Reviewer Complete", children: reviewer.completeDate },
    { label: "Elapsed Days", children: reviewer.elapsedDays },
    { label: "Recommendation", children: reviewer.recommendation },
  ];
  const handleAltReviewersItems = (reviewer, label, emptyContent) =>
    reviewer.length > 0
      ? [
          {
            label,
            children: reviewer.map((reviewer, index) => (
              <h6 key={index}>
                <span>{reviewer.name}</span> <span>{reviewer.email}</span>
              </h6>
            )),
          },
        ]
      : [{ children: emptyContent }];
  return (
    <>
      <Space.Compact block direction="vertical">
        {currentReviewers.map((reviewer, index) => (
          <Descriptions
            labelStyle={labelStyle}
            contentStyle={contentStyle}
            key={index}
            title={<p className="text-center m-0 p-0">Reviewers</p>}
            column={1}
            items={handleReviewersItems(reviewer)}
          />
        ))}
        <Descriptions
          labelStyle={
            alternateReviewers.length > 0 ? labelStyle : { display: "none" }
          }
          contentStyle={contentStyle}
          title={<p className="text-center m-0 p-0">Alternate Reviewers</p>}
          column={1}
          items={handleAltReviewersItems(
            alternateReviewers,
            "Alternate Reviewers",
            "There are no Alternate Reviewers currently selected"
          )}
        />
        <Descriptions
          labelStyle={
            proposedReviewersByEditors.length > 0
              ? labelStyle
              : { display: "none" }
          }
          contentStyle={contentStyle}
          title={
            <p className="text-center m-0 p-0">Reviewers Proposed by Editor</p>
          }
          column={1}
          items={handleAltReviewersItems(
            proposedReviewersByEditors,
            "Reviewers Proposed by Editor",
            "There are no Alternate Reviewers currently selected"
          )}
        />
        <Descriptions
          labelStyle={
            suggestedReviewersByAuthor.length > 0
              ? labelStyle
              : { display: "none" }
          }
          title={<p className="text-center m-0 p-0">Suggested Reviewers</p>}
          contentStyle={contentStyle}
          column={1}
          items={handleAltReviewersItems(
            suggestedReviewersByAuthor,
            "Suggested Reviewers",
            "There are no Alternate Reviewers currently selected"
          )}
        />
      </Space.Compact>
    </>
  );
};

export default Reviewers;
