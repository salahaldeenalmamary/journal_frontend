import React, { useState } from "react";
import Table from "../../common/table/table";
// import BackButton from "../../components/BackButton";

const ReviewerAssignment = () => {
  const data = [
    {
      article_title: "",
      article_type: "",
      assigned_editors: "",
      section_category: "",
    },
  ];

  const columns = [
    { path: "my_reviewer_number", label: "My Reviewer Number" },
    { path: "manuscript_number", label: "Manuscript Number " },
    { path: "article_type", label: "Article Type " },
    { path: "article_title", label: " Article Title" },
    { path: "status_date", label: "Status Date" },
    { path: "current_date", label: "Current Date" },
    { path: "date_reviewer_invited", label: "Date Reviewer Invited" },
    { path: "date_reviewer_agreed", label: "Date Reviewer Agreed" },
    { path: "date_review_due", label: "Date Review Due" },
    { path: "date_review_submitted", label: "Date Review Submitted" },
    { path: "days_taken", label: "Days Taken" },
    { path: "editors_name", label: "Editor's Name" },
    { path: "corr_author", label: "Corresponding Author" },
  ];

  const rowActions = [
    {
      to: (item) => `/mainSubmissionDetails/${item.id}`, // Assuming you have an 'id' property in your item
      label: "View Submission",
      onClick: (item) => {
        console.log("View Submission clicked for item:", item);
        // You can navigate to the specified route using the 'to' function
      },
    },

    {
      to: (item) => {
        console.log(item);
      },
      label: "View Reviewer Comments",
      onClick: (item) => {
        // Handle View Reviewer Comments action
        console.log("View Reviewer Comments clicked for item:", item);
      },
    },
    {
      to: (item) => {
        console.log(item);
      },
      label: "View Attachments",
      onClick: (item) => {
        // Handle View Attachments action
        console.log("View Attachments clicked for item:", item);
      },
    },
    {
      to: (item) => {
        console.log(item);
      },
      label: "Similar Articles in MIDLINE",
      onClick: (item) => {
        // Handle Similar Articles in MIDLINE action
        console.log("Similar Articles in MIDLINE clicked for item:", item);
      },
    },
    {
      to: (item) => "/emailFormSend",

      label: "Send E-mail",
      onClick: (item) => {
        // Handle Send E-mail action
        console.log("Send E-mail clicked for item:", item);
      },
    },
  ];

  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });

  const handleSort = (path) => {
    setSortColumn((prevSortColumn) => ({
      path,
      order: prevSortColumn.order === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div>
      {/* <h2>
        {" "}
        <BackButton to="/reviews" /> Complete Assignments
      </h2> */}
      <Table
        columns={columns}
        sortColumn={sortColumn}
        onSort={handleSort}
        data={data}
        rowActions={rowActions}
      />
    </div>
  );
};

export default ReviewerAssignment;
