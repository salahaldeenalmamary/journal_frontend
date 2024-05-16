import React from "react";
import { useSelector } from "react-redux";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Descriptions, Space } from "antd";

const TransferInformation = ({ labelStyle, contentStyle }) => {
  const { transferInformation } = useSelector(
    (store) => store.entities.SubmissionDetails
  );
  const handleEditorItems = (transInfo) => [
    { label: "Corresponding Author", children: transInfo.correspondingAuthor },
    {
      label: "Corresponding Author Email",
      children: transInfo.correspondingAuthorEmail,
    },
    { label: "Comment", children: transInfo.authorComments },
    { label: "Co-Authors", children: transInfo.coAuthors },
    { label: "Article Type", children: transInfo.articleType },
    { label: "Short Title", children: transInfo.shortTitle },
    { label: "Abstract", children: transInfo.abstract },
    { label: "Section Category", children: transInfo.sectionCategory },
    { label: "keywords", children: transInfo.keywords },
    { label: "Classifications", children: transInfo.classifications },
    { label: "File Inventory", children: transInfo.fileInventory },
    { label: "Requested Editor", children: transInfo.requestedEditor },
    {
      label: "Initial Date Submitted",
      children: transInfo.initialDateSubmitted,
    },
    {
      label: "Current Editorial Status",
      children: transInfo.currentEditorialStatus,
    },
    { label: "Editorial Status Date", children: transInfo.editorialStatusDate },
    {
      label: "Final Disposition Term",
      children: transInfo.finalDispositionTerm,
    },
  ];
  return (
    <>
      <Space.Compact block direction="vertical">
        <Descriptions
          labelStyle={labelStyle}
          contentStyle={contentStyle}
          title={<p className="text-center m-0 p-0">Transfer Information</p>}
          column={1}
          items={handleEditorItems(transferInformation)}
        />
      </Space.Compact>
    </>
  );
};

export default TransferInformation;
