import React from "react";
import { BsSortDown, BsSortUp } from "react-icons/bs";
const TableHeader = ({ columns, sortColumn: localSortColumn, onSort }) => {
  const renderCell = (column) => {
    if (column.labelContent) {
      return column.labelContent();
    }
    return column.label;
  };
  const raiseSort = (path) => {
    const sortColumn = { ...localSortColumn };
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
    if (column.path !== localSortColumn.path) {
      return null;
    }
    if (column.path === undefined) {
      return null;
    }
    if (localSortColumn.order === "asc") {
      return <BsSortDown />;
    }
    return <BsSortUp />;
  };
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="pe-auto"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {renderCell(column)} {renderSortIcon(column)}
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
