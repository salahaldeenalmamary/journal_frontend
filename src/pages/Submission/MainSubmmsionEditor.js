import SubmmisonTable from "./SubmmisonTable";
import React from "react";
import SubmissionsComponent from "./api";
import SearchReviewersTabOne from "../SearchReviewer/SearchReviewersTabOne";
const MainSubmmsionEditor = () => {
  const headerStyle = {
    backgroundColor: "#255384", // Customize the color as needed
    color: "#fff", // Text color
    padding: "15px", // Add padding for better appearance
    marginBottom: "2px",
    margin:'auto'
    // Add margin for separation
  };

  return (
    <div >
            <div style={headerStyle}  className="col-md-4">
        <h className="row justify-content-center" style={{ margin: "auto" }}>Search For Submmissions</h>
      </div>
     <SearchReviewersTabOne attributes={['salah', 'saksa']}></SearchReviewersTabOne>
      <SubmmisonTable></SubmmisonTable>
     
      <SubmissionsComponent></SubmissionsComponent>
    </div>
  );
};

export default MainSubmmsionEditor;