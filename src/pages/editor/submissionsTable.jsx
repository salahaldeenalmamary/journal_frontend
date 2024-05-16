import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionsToggled } from "../../store/UI/submissionsTable";
// import Table from "../../common/table/table";
import { Anchor, Collapse, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Space, Table } from "antd";

const SubmissionsTable = ({
  submission,
  sortColumn,
  onSort,
  status,
  isLoading,
}) => {
  const actionLinks = [
    {
      link: (variants) => ``,
      text: "View Submission",
    },
    {
      link: (variants) => `/main/select_reviewer`,
      text: "Invite Reviewers",
    },
    {
      link: (variants) => `/main/submissions/${status}/${variants.id}`,
      text: "Details",
    },
    {
      link: (variants) => ``,
      text: "History",
    },
    {
      link: (variants) => ``,
      text: "Submit Early Decision",
    },
    {
      link: (variants) => ``,
      text: "File Inventory",
    },
    {
      link: (variants) => ``,
      text: "Edit Submission",
    },
    {
      link: (variants) => ``,
      text: "Send Back to Author",
    },
    {
      link: (variants) => ``,
      text: "Remove Submission",
    },
    {
      link: (variants) => `/main/assignEditor/${variants.id}`,
      text: "Assign Editor",
    },
    {
      link: (variants) => ``,
      text: "Set Final Decision",
    },
  ];
  const antColumns = [
    {
      title: "#",
      key: "state",
      width: 30,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, r, rIndex) => (
        <ul className="list-unstyled actions">
          {actionLinks.map((item, index) => (
            <li key={index}>
              <LinkContainer to={item.link(r)}>
                <Button
                  type="link"
                  disabled={!item.link(r) && true}
                  className=" p-2"
                >
                  {`${item.text}`}
                </Button>
              </LinkContainer>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Manuscript Number",
      dataIndex: "id",
      key: "manuscript",
      sorter: (a, b) => a.id - b.id,
    },
    {
      dataIndex: "author",
      title: "Author Name",
      key: "author",
    },
    {
      dataIndex: "type",
      title: "Article Type",
      key: "type",
    },
    {
      dataIndex: "title",
      title: "Article Title",
      key: "title",
    },
    {
      dataIndex: "status",
      title: "Article Status",
      key: "status",
    },
  ];
  const dispatch = useDispatch();
  const { toggleActions } = useSelector((store) => store.UIS.submissionsTable);
  const handleActionsToggle = useCallback(() => dispatch(actionsToggled()));
  const [columns, setColumns] = useState([]);
  const handleTableContent = () => {
    const cols = [
      {
        key: "color",
        label: "no",
        content: (article) => {
          return (
            <div
              className="d-block h-auto"
              style={{
                width: "100%",
                // height: "100px",
                background: "red",
              }}
            >
              .
            </div>
          );
        },
      },
      {
        key: "action",
        labelContent: () => {
          return (
            <Anchor
              className="text-decoration-none"
              onClick={() => handleActionsToggle()}
            >
              Actions
            </Anchor>
          );
        },
        content: (article) => {
          return (
            <>
              <Collapse in={toggleActions}>
                <ul className="list-unstyled actions">
                  {actionLinks.map((item, index) => (
                    <li key={index}>
                      <LinkContainer to={item.link(article)}>
                        <Anchor className="text-decoration-none p-2">
                          {item.text}
                        </Anchor>
                      </LinkContainer>
                    </li>
                  ))}
                </ul>
              </Collapse>
              <Collapse in={!toggleActions}>
                <Dropdown className="py-2">
                  <Dropdown.Toggle as={Anchor}>Actions</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {actionLinks.map((item, index) => {
                      <Dropdown.Item key={index}>
                        <LinkContainer to={item.link(article)}>
                          <Anchor className="text-decoration-none p-2">
                            {item.text}
                          </Anchor>
                        </LinkContainer>
                      </Dropdown.Item>;
                    })}
                  </Dropdown.Menu>
                </Dropdown>

                {/* <div className="actions">
                <a className="text-decoration-none"></a>
              </div> */}
              </Collapse>
            </>
          );
        },
      },
      {
        path: "manuscript_number",
        label: "Manuscript Number",
      },
      {
        path: "author",
        label: "Author Name",
      },
      {
        path: "type",
        label: "Article Type",
      },
      {
        path: "title",
        label: "Article Title",
      },
      {
        path: "status",
        label: "Article Status",
      },
    ];
    setColumns(cols);
  };
  useEffect(() => {
    handleTableContent();
  }, [toggleActions]);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("pagination", pagination);
    console.log("filters", filters);
    console.log("sorter", sorter);
    console.log("extra", extra);
  };
  return (
    <div className="mx-3">
      <Table
        columns={antColumns}
        pagination={{
          total: submission.length,
          position: ["topCenter", "bottomCenter"],
          pageSizeOptions: [3, 5, 10, 20, 30, 100],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          // hideOnSinglePage: true,
        }}
        loading={isLoading}
        dataSource={submission}
        // onChange={onChange}
      />
      {/* <Table
        striped
        bordered
        className="align-middle"
        data={submission}
        sortColumn={sortColumn}
        onSort={onSort}
        columns={columns}
      /> */}
    </div>
  );
};

export default SubmissionsTable;
