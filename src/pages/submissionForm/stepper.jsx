import { Steps } from "antd";
import React from "react";
import { Step, Stepper } from "react-form-stepper";
import {
  FaRegCircle,
  FaRegCheckCircle,
  FaArrowDown,
  FaExclamation,
} from "react-icons/fa";

const CustomStepper = ({ steps, onStepChange, activeStep }) => {
  const setStepStyle = () => {
    return {
      size: 60,
      labelFontSize: 20,
      //   circleFontSize: 60,
    };
  };

  const setStepProps = (steps) => {
    const iconSize = 55;

    const readySteps = [];
    steps.map((step) => {
      const stepProps = {
        // type: "button",
        title: step.title,
        value: step.stepURL,
        status: "",
        key: step.stepURL,
        icon: <FaRegCircle />,
        disabled: false,
      };
      switch (step.status) {
        case "unvisited":
          stepProps.icon = <FaRegCircle />;
          break;
        case "process":
          stepProps.icon = <FaArrowDown />;
          break;
        case "error":
          stepProps.icon = <FaExclamation color="red" />;
          break;
        case "finish":
          stepProps.status = "finish";
          stepProps.icon = <FaRegCheckCircle color="green" />;
          break;
        case "wait":
          stepProps.status = "wait";
          stepProps.disabled = true;
          stepProps.icon = <FaRegCircle />;
          break;
        case "locked":
          return;
        default:
          break;
      }
      readySteps.push(stepProps);
    });
    return readySteps;
    // return <Step {...stepProps} onClick={() => onStepChange(index)} />;
  };
  return (
    <Steps
      current={setStepProps(steps).length}
      labelPlacement="vertical"
      items={setStepProps(steps)}
      onChange={onStepChange}
    />
    // <Stepper styleConfig={setStepStyle()} nonLinear activeStep={activeStep}>
    //   {steps.map(
    //     (step, index) => setStepProps(step, index)
    //     // <Step {...setStepProps(step)} onClick={() => onStepChange(index)} />
    //   )}
    // </Stepper>
  );
};

export default CustomStepper;
