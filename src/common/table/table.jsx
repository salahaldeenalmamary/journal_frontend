/* eslint-disable no-unused-vars */
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
// import { Table as ReactTable } from "react-bootstrap";
import { Table as ReactTable } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Age",
    dataIndex: "age",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];
const Table = ({
  columns,
  sortColumn,
  onSort,
  data,
  children,
  pageSize,
  showPagination = true,
  ...res
}) => {
  return (
    <ReactTable
      columns={columns}
      pagination={
        showPagination && {
          total: data.length,
          position: ["topCenter", "bottomCenter"],
          pageSizeOptions: [3, 5, 10, 20, 30, 100],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} submissions`,
        }
      }
      dataSource={data}
    />

    // <ReactTable {...res}>
    //   {children}
    //   <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
    //   <TableBody data={data} columns={columns} />
    // </ReactTable>
  );
};

export default Table;
