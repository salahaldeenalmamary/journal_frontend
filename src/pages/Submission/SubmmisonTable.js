import React, { useState } from "react";
import TableBody from "../../common/table_with_header_and_body/tableBody";
import Tables from "../../common/table_with_header_and_body/table";

const SubmmisonTable = () => {
  const data = [
    // Your data array
    { articale_tital: '', articale_type: "", assignedEditors: '', sectionCategory: '' },


  ];

  const columns = [
    { path: "articale_tital", label: "Articale Titel" },
    { path: "articale_type", label: "Articale Type" },

    { path: "assignedEditors", label: "Assigned Editors" },
    { path: "sectionCategory", label: "Section Category" },
    { path: "doi", label: "DOI" },
    { path: "manuscriptNumber", label: "Manuscript Number" },
    { path: "currentStatus", label: "Current Status" },
    { path: "statusDate", label: "Status Date" },
    { path: "shortTitle", label: "Short Title" },
    { path: "keywords", label: "Keywords" },

  ];


  const checkboxActions = [
    { label: "Action 1", /* other properties */ },
    { label: "Action 2", /* other properties */ },
  ];





  const rowActions = [
    {
      to: (item) => {

        console.log("Delete clicked for item:", item);
      },
      label: " View Submission",
      onClick: (item) => {

        console.log("Edit clicked for item:", item);
      },
    },
    {
      to: (item) => {

        console.log("Delete clicked for item:", item);
      },
      label: "Similarity Check Results (309%)",
      onClick: (item) => {
        // Handle delete action
        console.log("Delete clicked for item:", item);
      },
    },
    {
      to: (item) => {
        // Handle delete action
        console.log("Delete clicked for item:", item);
      },
      label: " Duplicate Submission ",
      onClick: (item) => {
        // Handle edit action
        console.log("Edit clicked for item:", item);
      },
    },
    {
      to: (item) => {
        // Handle delete action
        console.log("Delete clicked for item:", item);
      },
      label: " Initiate DiscuSsion",
      onClick: (item) => {
        // Handle delete action
        console.log("Delete clicked for item:", item);
      },
    },
    {
      to: (item) => {
        // Handle delete action
        console.log("Delete clicked for item:", item);
      },
      label: "  History",
      onClick: (item) => {
        // Handle edit action
        console.log("Edit clicked for item:", item);
      },
    },
    {
      to: (item) => {
        // Handle delete action
        console.log("Delete clicked for item:", item);
      },
      label: "  File Inventoy",
      onClick: (item) => {
        // Handle delete action
        console.log("Delete clicked for item:", item);
      },
    },
    {
      label: "Edit Submission",
      to: (item) => `/edit-submission/${item.id}`,
    },
    {
      label: "Send Back to Author",
      onClick: (item) => {
        // Handle action
        console.log("Send Back to Author clicked for item:", item);
      },
    },
    {
      label: "Classifications",
      to: (item) => `/classifications/${item.id}`,
    },
    {
      label: "Assign Editor",
      onClick: (item) => {
        // Handle action
        console.log("Assign Editor clicked for item:", item);
      },
    },
    {
      label: "Set Final Disposition",
      onClick: (item) => {
        // Handle action
        console.log("Set Final Disposition clicked for item:", item);
      },
    },
    {
      label: "View Reviews and Comments",
      to: (item) => `/reviews/${item.id}`, // 
    },
    {
      label: "Similar Articles in MEDLINE",
      to: (item) => `/medline/${item.id}`, // 
    },
    {
      label: "PubMed - Title",
      to: (item) => `/pubmed-title/${item.id}`, //
    },
    {
      label: "Similar Articles in Scopus",
      to: (item) => `/scopus/${item.id}`,
    },
    {
      label: "Scopus Corresponding Author",
      to: (item) => `/scopus-corresponding-author/${item.id}`,
    },
    {
      label: "Send E-mail",
      onClick: (item) => {
        // Handle action
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
      <h2></h2>
      <Tables
        columns={columns}
        sortColumn={sortColumn}
        onSort={handleSort}
        data={data}
        rowActions={rowActions}
      />
    </div>
  );



};

export default SubmmisonTable;
