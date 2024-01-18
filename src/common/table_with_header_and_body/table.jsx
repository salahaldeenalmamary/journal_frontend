/* eslint-disable no-unused-vars */
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import { useState } from "react";
import { Table } from "react-bootstrap";

const Tables = ({ columns, sortColumn, onSort, data ,rowActions, checkboxActions, onSelectedAction}) => {
  const [localColumns, setLocalColumns] = useState(columns);
 

  // console.log(localColumns);
  return (
    <Table striped bordered hover responsive>
 
      <TableHeader
        columns={localColumns}
        sortColumn={sortColumn}
        onSort={onSort}
        rowActions={rowActions}
      />
      <TableBody data={data} columns={localColumns}
       checkboxActions={checkboxActions}
       onSelectedAction={onSelectedAction}
      rowActions={rowActions}/>
    </Table>
  );
};

export default Tables;
