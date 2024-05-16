import React from "react";
import { useParams } from "react-router-dom";

const AssignEditor = () => {
  const { id } = useParams();
  return <div>{id} AssignEditor</div>;
};

export default AssignEditor;
