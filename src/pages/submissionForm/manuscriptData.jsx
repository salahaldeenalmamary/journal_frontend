import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ControlledEditor from "./controlledEditor";
import AuthorFormStep from "./AuthorFormDialog";
import { BsSignDoNotEnter } from "react-icons/bs";
import {
  titleAdded,
  abstractAdded,
  keywordsAdded,
  coAuthorsAdded,
} from "../../store/UI/submissionForm";
import { Collapse, Form, Input } from "antd";
import { FaExclamationTriangle, FaRegCheckCircle } from "react-icons/fa";

const Manuscript = ({ submission }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [coAuthors, setCoAuthors] = useState([]);
  useEffect(() => {
    setTitle(submission.title);
    setAbstract(submission.abstract);
    setKeywords(submission.keywords || []);
    setCoAuthors(submission.coAuthors || []);
  }, [submission]);
  const handleSaveTitle = (title, titleString) => {
    dispatch(titleAdded({ title, titleString }));
  };
  const handleSaveAbstract = (abstract, AbstractString) => {
    dispatch(abstractAdded({ abstract, AbstractString }));
  };
  const handleSaveKeywords = (keywords) => {
    dispatch(keywordsAdded(keywords));
  };
  const handleSaveCoAuthors = (coAuthors) => {
    dispatch(coAuthors(coAuthors));
  };
  const genExtra = (condition) =>
    condition ? (
      <FaRegCheckCircle color="green" />
    ) : (
      <FaExclamationTriangle color="red" />
    );
  return (
    <>
      {/* Title */}
      <Collapse
        defaultActiveKey={["1"]}
        accordion
        collapsible="header"
        expandIconPosition="start"
        className="shadow"
        items={[
          {
            key: "1",
            label: "Title:",
            extra: genExtra(title),
            children: (
              <>
                <h2>Title:</h2>
                <ControlledEditor content={title} onSave={handleSaveTitle} />
              </>
            ),
          },
          {
            key: "2",
            label: "Abstract:",
            extra: genExtra(abstract),
            children: (
              <>
                <h2>Abstract:</h2>
                <ControlledEditor
                  content={abstract}
                  onSave={handleSaveAbstract}
                />
              </>
            ),
          },
          {
            key: "3",
            label: "Keywords:",
            children: (
              <>
                <Form.Item label="Keywords:">
                  <Input />
                </Form.Item>
              </>
            ),
          },
          {
            key: "4",
            label: "Authors:",
            children: (
              <>
                <h2>Authors:</h2>
                <AuthorFormStep />
              </>
            ),
          },
        ]}
      />
    </>
  );
};

export default Manuscript;
