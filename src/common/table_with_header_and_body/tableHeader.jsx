import React from "react";
const TableHeader = ({ columns, sortColumn: localsortcolumn, onSort ,rowActions }) => {
  const headerStyle = {
    backgroundColor: "#255384", // Customize the color as needed
    color: "#fff", // Text color
    padding: "15px", // Add padding for better appearance
    marginBottom: "2px", // Add margin for separation
  };
  const raiseSort = (path) => {
    const sortColumn = { ...localsortcolumn };
    if (path === undefined) return null;
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort(sortColumn);
  };
  const renderSortIcon = (column) => {
    if (column.path !== localsortcolumn.path) {
      return null;
    }
    if (column.path === undefined) {
      return null;
    }
    if (localsortcolumn.order === "asc") {
      return <i className="fa fa-sort-asc"></i>;
    }
    return <i className="fa fa-sort-desc"></i>;
  };
  
  return (
    <thead style={headerStyle}>
      <tr>
      {rowActions && <th className="text-center">Actions</th>}
        {columns.map((column) => (
          <th
            className="clickable text-center"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
// class TableHeader extends Component {
//   raiseSort = (path) => {
//     const sortColumn = { ...this.props.sortColumn };
//     if (path === sortColumn.path) {
//       sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
//     } else {
//       sortColumn.path = path;
//       sortColumn.order = "asc";
//     }
//     this.props.onSort(sortColumn);
//   };
//   renderSortIcon = (column) => {
//     const { sortColumn } = this.props;
//     if (column.path !== sortColumn.path) {
//       return null;
//     }
//     if (sortColumn.order === "asc") {
//       return <i className="fa fa-sort-asc"></i>;
//     }
//     return <i className="fa fa-sort-desc"></i>;
//   };
//   render() {
//     const { columns } = this.props;
//     return (
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th
//               className="clickable"
//               key={column.path || column.key}
//               onClick={() => this.raiseSort(column.path)}
//             >
//               {column.label} {this.renderSortIcon(column)}
//             </th>
//           ))}
//         </tr>
//       </thead>
//     );
//   }
// }

// export default TableHeader;
