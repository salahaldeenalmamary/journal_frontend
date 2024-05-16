import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
// import Select from "react-select";
import {
  articleTypeChanged,
  submissionTypeChanged,
  submissionTypeSelected,
} from "../../store/UI/submissionForm";
import { getSubmissionTypes } from "../../services/submissionTypesService";
import { Select, Form, Card } from "antd";

const ArticleType = ({ typeId, submission }) => {
  const dispatch = useDispatch();
  const [articleType, setArticleType] = useState(submission.typeId);
  const [articleTypes, setArticleTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setArticleType(submission.typeId);
    console.log(submission.typeId);
  }, [submission]);
  // useEffect(() => {
  //   setArticleType(typeId);
  // }, [typeId]);
  useEffect(() => {
    populateSubmissionTypes();
  }, []);
  const populateSubmissionTypes = async () => {
    setIsLoading(true);
    try {
      const response = await getSubmissionTypes();
      setTypesList(response.data);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (ex) {
      setIsLoading(false);
      setIsSuccess(false);
      setIsError(true);
      setErrorMsg("error");
      console.log(ex);
    }
  };
  const setTypesList = (list = []) => {
    const types = [];
    for (const item of list) {
      const type = {
        value: item.id,
        label: item.name,
      };
      types.push(type);
    }
    setArticleTypes(types);
  };
  const handleTypeSelected = (typeValue, type) => {
    if (articleType) {
      const confirmation = confirm("are you sure");
      if (confirmation === true) {
        dispatch(articleTypeChanged(type));
        dispatch(submissionTypeChanged(typeValue));
      } else return;
    } else {
      dispatch(articleTypeChanged(type));
      dispatch(submissionTypeSelected(typeValue));
    }
  };
  return (
    <>
      <Card
        className="shadow"
        style={{
          marginTop: 16,
        }}
        type="inner"
        title="Article Type"
      >
        {isLoading && (
          <div className="d-flex align-items-center mx-4">
            <strong>Loading...</strong>
            <Spinner
              className="ms-auto"
              role="status"
              aria-hidden="true"
            ></Spinner>
          </div>
        )}
        <div className="col-5 m-4">
          <Form.Item
            name="typeId"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select submission type",
              },
            ]}
            getValueFromEvent={handleTypeSelected}
          >
            <Select
              value={articleType}
              loading={isLoading}
              disabled={isError}
              // status={isError && "error"}
              options={articleTypes}
              placeholder="select type of submission"
            />
          </Form.Item>
        </div>
        {isError && (
          <p>
            <strong className="text-danger display-3">{errorMsg}</strong>
          </p>
        )}
      </Card>
      {/* Add additional form fields or components as needed */}
      <br />
      {/* <SubmissionButtons valid isFirstStep nextStep={handleNextStep} /> */}
    </>
  );
};

export default ArticleType;
