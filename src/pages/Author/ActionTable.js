import React, { useState } from "react";
import Tables from "../../common/table_with_header_and_body/table";

const AuthorActionTable = () => {
  const [sortColumn, setSortColumn] = useState({
    path: "ManuscriptNumber",
    order: "asc",
  });

  const data = [
    {
      ManuscriptNumber: '',
      Title: '',
      DateSubmissionBegan: '',
      StatusDate: "",
      CurrentStatus: "",
    },
    // Add more data as needed
  ];

  const columns = [
    { path: "ManuscriptNumber", label: "Manuscript Number" },
    { path: "Title", label: "Title" },
    { path: "DateSubmissionBegan", label: "Date Submission Began" },
    { path: "StatusDate", label: "Status Date" },
    { path: "CurrentStatus", label: "Current Status" },
  ];

  const rowActions = [
    {
      to: (item) => '/authorSubmissionForm',
      label: "Edit Submission",
      onClick: (item) => {
        console.log("Edit clicked for item:", item);
      },
    },
    {
      label: "Remove Submission",
      onClick: (item) => {
        const indexToRemove = data.findIndex((e) => e === item);

        if (indexToRemove !== -1) {
          // Using splice to remove the item from the array
          const newData = [...data];
          newData.splice(indexToRemove, 1);

          // Updating the state or wherever 'data' is stored
          // Example: setYourDataState(newData);
          console.log("Item removed:", item);
        }
      },
    },
    {
      to: (item) => '/EmailFormSend',
      label: "Send E-mail",
      onClick: (item) => {
        console.log(" E-mail:", item);
      },
    },
  ];

  const handleSort = (path) => {
    setSortColumn((prevSortColumn) => ({
      path,
      order: prevSortColumn.path === path
        ? (prevSortColumn.order === "asc" ? "desc" : "asc")
        : "asc",
    }));
  };

  return (
    <div>
      <h2> Incomplete Submissions</h2>
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

export default AuthorActionTable;
