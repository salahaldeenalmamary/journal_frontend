import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { gray } from "@ant-design/colors";
import Reviewers from "./reviewers";
import TransferInformation from "./transferInformation";
import Editors from "./editors";

const MainSubmissionDetails = () => {
  // const {} = useSelector((store) => store.entities.SubmissionDetails);
  const { id } = useParams();
  const handleSave = (data) => {
    console.log("Saving data:", data);
    // Implement your save logic here
  };
  const labelStyle = { flex: 2 };
  const contentStyle = {
    flex: 5,
  };
  console.log(gray.length);
  return (
    <div>
      <h1>Edit Form</h1>
      <TransferInformation
        contentStyle={contentStyle}
        labelStyle={labelStyle}
      />
      <Editors contentStyle={contentStyle} labelStyle={labelStyle} />
      <Reviewers contentStyle={contentStyle} labelStyle={labelStyle} />
    </div>
  );
};

export default MainSubmissionDetails;
