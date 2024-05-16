import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, ListGroup, Col, Row } from "react-bootstrap";
import { Descriptions, Space } from "antd";

const Editors = ({ labelStyle, contentStyle }) => {
  const { editors } = useSelector((store) => store.entities.SubmissionDetails);

  const handleEditorItems = (editor) => [
    { label: "Name", children: editor.name },
    { label: "Role", children: editor.role },
    { label: "Date Assign", children: editor.dateAssign },
    { label: "Date Completed", children: editor.dateCompleted },
    { label: "Elapsed Days", children: editor.elapsedDays },
    { label: "Recommendation", children: editor.recommendation },
  ];

  return (
    <Space.Compact block direction="vertical">
      {editors.map((editor, index) => (
        <Descriptions
          labelStyle={labelStyle}
          contentStyle={contentStyle}
          key={index}
          title={<p className="text-center m-0 p-0">Editor</p>}
          column={1}
          items={handleEditorItems(editor)}
        />
      ))}
    </Space.Compact>
  );
};

export default Editors;
