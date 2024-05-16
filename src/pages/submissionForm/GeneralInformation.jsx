import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import countryList from "react-select-country-list";
import { Form, Select, Collapse, Button, Space } from "antd";
import { FaExclamationTriangle } from "react-icons/fa";
import { regionSelected, sectionSelected } from "../../store/UI/submissionForm";
const regions = [
  { value: "ye", label: "Yemen" },
  { value: "ps", label: "Palestine" },
  { value: "sy", label: "Syria" },
  { value: "eg", label: "Egypt" },
  // Add more options as needed
];
const sections = [
  { value: 1, label: "Artificial intelligence" },
  { value: 2, label: "Computer science" },
  { value: 3, label: "Information Technology" },
  { value: 4, label: "Information System" },
  // Add more options as needed
];
const GeneralInformation = ({ submission }) => {
  const dispatch = useDispatch();
  const [region, setRegion] = useState(submission.region);
  const [section, setSection] = useState(submission.sectionId);
  const countriesList = useMemo(() => countryList().getData(), []);
  useEffect(() => {
    setRegion(submission.region);
    setSection(submission.sectionId);
    // populateSubmissionTypes();
  }, [submission]);
  const handleRegionSelection = (region) => {
    // console.log(region);
    dispatch(regionSelected(region));
  };
  const handleSelectedSection = (section) => {
    dispatch(sectionSelected(section));
  };
  const handleClassification = () => {
    const windowObj = window.open("", "heeey", "width=1000, height=500");
    // windowObj.document.w
    console.log(windowObj);
  };
  const genExtra = (isValid, isRequired) =>
    isRequired ? (
      <FaExclamationTriangle color={isValid ? "green" : "red"} />
    ) : (
      <FaExclamationTriangle color={isValid ? "green" : "yellow"} />
    );
  return (
    <Collapse
      className="shadow m-0 p-0"
      expandIconPosition="start"
      size="large"
      accordion
      collapsible="header"
      defaultActiveKey={["1"]}
      items={[
        {
          key: "1",
          label: "Region Of Origins :",
          extra: genExtra(region),
          children: (
            <>
              <p className="m-3 p-2 border-dark border-top border-bottom">
                Select Region Of Origins
              </p>
              <div className="w-50 pl-4 my-5">
                <Form.Item
                  name="region"
                  hasFeedback
                  getValueFromEvent={handleRegionSelection}
                >
                  <Select
                    value={region}
                    placeholder="select region of submission"
                    options={countriesList}
                    showSearch
                  />
                </Form.Item>
              </div>
            </>
          ),
        },
        {
          key: "2",
          label: "Section or Category",
          extra: genExtra(section, true),
          children: (
            <>
              <p className="m-3 p-2 border-dark border-top border-bottom">
                Select Section or Category
              </p>
              <div className="w-50 pl-4 my-5">
                <Form.Item
                  name="sectionId"
                  hasFeedback
                  getValueFromEvent={handleSelectedSection}
                  rules={[
                    {
                      required: true,
                      message: "Please select submission section",
                    },
                  ]}
                >
                  <Select
                    options={sections}
                    placeholder="select section of submission"
                    value={section}
                  />
                </Form.Item>
              </div>
            </>
          ),
        },
        {
          key: "3",
          label: "Classification :",
          extra: genExtra(section),
          children: (
            <>
              <p className="m-3 p-2 border-dark border-top border-bottom">
                Select Classification
              </p>
              <Button
                className="badge rounded-pill"
                onClick={() => handleClassification()}
              >
                Add Classifications
              </Button>
            </>
          ),
        },
      ]}
    />
  );
};

export default GeneralInformation;
