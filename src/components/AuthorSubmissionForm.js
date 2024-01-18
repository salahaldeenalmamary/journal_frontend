import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import { MdDescription } from "react-icons/md";
import StepWizard from "react-step-wizard";
import {
  Col,
  FormGroup,
  FormControl,
  FormSelect,
  Dropdown,
  Card,
  FormLabel,
  Form,
  Button,
} from "react-bootstrap";
import Select from "react-select";
import FileUploadTable from "./templates/FileUploadTable";
import ActionButtons from "./ActionButtons";
import ReviewerFormDialog from "./ReviewerFormDialog";
import AccordionReviewerSteps from "./templates/AccordionReviewerSteps";
import MultiSelectDropdown from "./MultiSelectDropdown";
import ControlledEditor from "./ControlledEditor";
import Manuscript from "./Manuscript";
const ArticleType = (props) => {
  const articleTypes = [
    { value: "title", label: "title" },
    { value: "author", label: "author" },
    { value: "description", label: "description" },
    { value: "title", label: "title" },
    { value: "author", label: "author" },
    { value: "description", label: "description" },
    { value: "title", label: "title" },
    { value: "author", label: "author" },
    { value: "description", label: "description" },
    { value: "title", label: "title" },
    { value: "author", label: "author" },
    { value: "description", label: "description" },
    { value: "title", label: "title" },
    { value: "author", label: "author" },
    { value: "description", label: "description" },
  ];
  const [info1, setInfo1] = useState({});
  const [error, setError] = useState("");
  const [searchBy, setSearchBy] = useState("title"); // Initialize with a default value
  const [selectedOptions, setSelectedOptions] = useState();

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };
  const onInputChanged = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    const showAdvancedSearch = true;
    setInfo1((info1) => ({
      ...info1,
      [targetName]: targetValue,
    }));
  };

  const validate = () => {
    if (!info1.name) setError("Please enter the project name");
    else {
      setError("");
      props.nextStep();
      props.userCallback(info1);
    }
  };
  return (
    <>
      <Card className="text-end">
        <Card.Header>
          <Card.Title>
            <FormLabel htmlFor="selectTypes" className="col-form-label">
              Article Type
            </FormLabel>
          </Card.Title>
        </Card.Header>
        <Select
          hideSelectedOptions
          id="selectTypes"
          className="col-5 m-4"
          options={articleTypes}
          value={selectedOptions}
          onChange={handleSelectChange}
        />
        {/* {articleTypes.map((option) => (
            <option key={option} onClick={() => handleSearchByChange(option)}>
              {option.charAt(0).toUpperCase() +
                option.slice(1).toLocaleLowerCase()}
            </option>
          ))} */}
        {/* Add additional form fields or components as needed */}
        <br />
      </Card>
      <ActionButtons valid={selectedOptions ? false : true} {...props} />
      <div
        // className="w-100 d-none d-md-block h-50 bg-info"
        style={{ height: "200px" }}
      ></div>
    </>
    // </Card>
  );
};

const SelectionAttachFiles = (props) => {
  const [info2, setInfo2] = useState({});
  const [error, setError] = useState("");

  const onInputChanged = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    setInfo2((info2) => ({
      ...info2,
      [targetName]: targetValue,
    }));
  };

  const validate2 = () => {
    if (!info2.age) setError("Please enter the number of land plots");
    else {
      setError("");
      props.nextStep();
      props.userCallback(info2);
    }
  };

  return (
    <Card>
      <MultiSelectDropdown {...props}></MultiSelectDropdown>
    </Card>
  );
};

const GeneralInformation = (props) => {
  const handleLastStep = () => {
    props.lastStep();
    props.completeCallback();
  };

  return (
    <div>
      <h2>Project Details</h2>
      <p>Project Name: {props.user.name}</p>
      <p>Number of Land Plots for Allocation: {props.user.age}</p>
      <br />
      <div>
        {/* Correct usage
      <AccordionReviewerSteps /> */}
      </div>
      <ActionButtons {...props} lastStep={handleLastStep} />
    </div>
  );
};

const Comments = (props) => {
  return (
    <Card>
      <Card.Body>
        <Form.Group controlId="Comments">
          <Form.Label>Comments:</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter Comments" />
        </Form.Group>
      </Card.Body>
      <Card.Footer>
        <ActionButtons {...props} />
      </Card.Footer>
    </Card>
  );
};

const AuthorSubmissionForm = () => {
  const [steps, setSteps] = useState([
    { disabled: false, active: false, completed: false, label: "Article Type" },

    { disabled: true, active: false, completed: false, label: "Attach Files" },

    {
      disabled: true,
      active: false,
      completed: false,
      label: "General Information",
    },

    {
      disabled: true,
      active: false,
      completed: false,
      label: "Review Preferences",
    },

    {
      disabled: true,
      active: false,
      completed: false,
      label: "Additional Information",
    },
    { disabled: true, active: false, completed: false, label: "Comments" },

    {
      disabled: true,
      active: false,
      completed: false,
      label: "Manuscript Data",
    },
  ]);
  const [user, setUser] = useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    // e.preventDefault();

    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  // const [activeStep, setActiveStep] = useState(0);

  // const assignStepWizard = (instance) => {
  //   setStepWizard(instance);
  // };

  const assignUser = (val) => {
    setUser((user) => ({
      ...user,
      ...val,
    }));
  };

  const handleStepChange = ({ previousStep: previous, activeStep: active }) => {
    const currentSteps = [...steps];
    console.log(previous);
    console.log(active);
    const newPreviousStep = { ...currentSteps[previous - 1] };
    const newCurrentStep = { ...currentSteps[active - 1] };
    if (previous > active) {
      newPreviousStep.completed = false;
      newPreviousStep.active = false;

      newCurrentStep.disabled = false;
      newCurrentStep.active = true;
      newCurrentStep.completed = false;
      currentSteps.splice(active - 1, 2, ...[newPreviousStep, newCurrentStep]);
    } else {
      newPreviousStep.completed = true;
      newPreviousStep.active = false;
      newCurrentStep.disabled = false;
      newCurrentStep.active = true;
      newCurrentStep.completed = false;
      currentSteps.splice(
        previous - 1,
        2,
        ...[newPreviousStep, newCurrentStep]
      );
    }
    setSteps(currentSteps);
    // setActiveStep(activeStep - 1);
  };

  // const handleComplete = () => {
  //   alert("Filing created successfully");
  // };
  const headerStyle = {
    backgroundColor: "#255384", // Customize the color as needed
    color: "#fff", // Text color
    padding: "15px", // Add padding for better appearance
    marginBottom: "2px", // Add margin for separation
  };
  return (
    <Form className="container mt-3 mb-4">
      <Stepper nonLinear className="row" style={headerStyle}>
        {steps.map((step, index) => (
          <Step
            key={step.label}
            disabled={step.disabled}
            onClick={handleStep(index)}
            completed={step.completed}
            label={step.label}
          />
        ))}
      </Stepper>

      <StepWizard
        className="row row-cols-1 justify-content-center "
        onStepChange={handleStepChange}
      >
        <ArticleType userCallback={assignUser} />
        <FileUploadTable></FileUploadTable>
        <SelectionAttachFiles />
        <AccordionReviewerSteps
          userCallback={assignUser}
        ></AccordionReviewerSteps>
        <Comments></Comments>
        <Comments></Comments>

        <Manuscript></Manuscript>
      </StepWizard>
      {/* <div>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <p sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </p>
                  <div sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <div sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p>Step {activeStep + 1}</p>
                  <div>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <div />
                    <Button onClick={handleNext}>Next</Button>
                    {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <p>Step {activeStep + 1} already completed</p>
                      ) : (
                        <Button onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1
                            ? "Finish"
                            : "Complete Step"}
                        </Button>
                      ))}
                  </div>
                </React.Fragment>
              )}
            </div> */}
    </Form>
  );
};

export default AuthorSubmissionForm;
