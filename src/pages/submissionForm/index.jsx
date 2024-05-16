import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Form } from "react-bootstrap";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import {
  fetchSubmissionById,
  stepChanged,
  submissionEdited,
  submissionReset,
  submissionUpdated,
} from "../../store/UI/submissionForm";
import CustomStepper from "./stepper";
import SubmissionButtons from "./submissionButtons";
import { Form } from "antd";
import ArticleType from "./ArticleType";
import AttachFiles from "./AttachFiles";
import GeneralInformation from "./GeneralInformation";
import ReviewPreferences from "./reviewPreferences";
import Comments from "./Comments";
import Manuscript from "./manuscriptData";
import Loading from "../../components/loading";

const SubmissionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // const [submission, setSubmission] = useState({ id: 1 });
  const antSteps = [
    {
      status: "process",
      title: "Article Type",
      stepContent: (submission) => <ArticleType submission={submission} />,
      stepFelids: [{ felidName: "typeId", isRequired: true, isValid: false }],
      isRequired: true,
      isValid: false,
    },

    {
      status: "locked",
      title: "Attach Files",
      stepContent: (submission) => <AttachFiles submission={submission} />,
      stepFelids: [
        { felidName: "attachments", isRequired: true, isValid: false },
      ],
      isRequired: true,
      isValid: false,
    },

    {
      status: "locked",
      title: "General Information",
      stepContent: (submission) => (
        <GeneralInformation
          regionName={submission.region}
          sectionId={submission.sectionId}
          submission={submission}
        />
      ),
      stepFelids: [
        { felidName: "region", isRequired: false, isValid: false },
        { felidName: "sectionId", isRequired: true, isValid: false },
      ],
      isRequired: true,
      isValid: false,
    },

    {
      status: "locked",
      title: "Review Preferences",
      stepContent: (submission) => (
        <ReviewPreferences
          editor={submission.requestedEditor}
          sugReviewers={submission.suggestedReviewers}
          oppReviewer={submission.opposedReviewers}
          submission={submission}
        />
      ),
      stepFelids: [
        { felidName: "requestedEditor", isRequired: true, isValid: false },
        { felidName: "suggestedReviewers", isRequired: true, isValid: false },
        { felidName: "opposedReviewers", isRequired: false, isValid: false },
      ],
      isRequired: true,
      isValid: false,
    },
    // unwanted step
    // {
    //   status: "locked",
    //   title: "Additional Information",
    //   stepContent: "additionalInformation",
    //   stepFelids: [{ felidName: "", isRequired: true, isValid: false }],
    //   isRequired: true,
    //   isValid: false,
    // },
    {
      status: "locked",
      title: "Comments",
      stepContent: (submission) => (
        <Comments comment={submission.comments} submission={submission} />
      ),
      stepFelids: [
        { felidName: "comments", isRequired: false, isValid: false },
      ],
      isRequired: false,
      isValid: false,
    },
    {
      status: "wait",
      title: "Manuscript Data",
      stepContent: (submission) => <Manuscript submission={submission} />,
      stepFelids: [
        { felidName: "title", isRequired: true, isValid: false },
        { felidName: "abstract", isRequired: true, isValid: false },
        { felidName: "keywords", isRequired: true, isValid: false },
        { felidName: "coAuthors", isRequired: true, isValid: false },
      ],
      isRequired: true,
      isValid: false,
    },
  ];
  const {
    steps,
    activeStep,
    submission,
    isSuccess,
    isLoading,
    isError,
    errorMsg,
  } = useSelector((store) => store.UIS.submissionForm);

  const { id } = useParams();
  useEffect(() => {
    if (id === "new") {
      dispatch(submissionReset());
    } else {
      dispatch(fetchSubmissionById(id));
      // dispatch(stepChanged(activeStep));
    }
    // navigate(`${currentUrl}`);
  }, []);
  useEffect(() => {
    form.setFieldsValue(submission);
  }, [submission]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(submissionEdited());
    }
  }, [isSuccess]);
  const totalSteps = () => {
    return steps.length - 1;
  };
  const isFinalStep = () => {
    return totalSteps() === activeStep;
  };
  const isFirstStep = () => {
    return activeStep === 0;
  };

  const handleStepChange = (index) => {
    dispatch(stepChanged(index));
  };
  const handleNextStep = () => {
    dispatch(stepChanged(activeStep + 1));
  };
  const handlePreviousStep = () => {
    dispatch(stepChanged(activeStep - 1));
  };
  const handleSubmit = (e) => {
    console.log(e);
  };
  const updateFormFields = (value, allValues) => {
    form.setFieldsValue(submission);
  };
  const updateSubmission = () => {
    dispatch(submissionUpdated());
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      className="container mt-3 mb-4"
      name="validate_other"
      // onFieldsChange={updateFormFields}
      onFinish={handleSubmit}
      initialValues={{
        ...submission,
      }}
    >
      {isLoading && <Loading />}
      {true && (
        <>
          <CustomStepper
            steps={steps}
            onStepChange={handleStepChange}
            activeStep={activeStep}
          />
          <div>{antSteps[activeStep].stepContent(submission)}</div>
          <SubmissionButtons
            form={form}
            isFirstStep={isFirstStep()}
            isFinalStep={isFinalStep()}
            nextStep={handleNextStep}
            previousStep={handlePreviousStep}
            saveChanges={updateSubmission}
          />
        </>
      )}
    </Form>
  );
};

export default SubmissionForm;

// export {default as ArticleType}
