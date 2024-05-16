import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionsToggled } from "../../store/UI/submissionsTable";
import Table from "../../common/table/table";
import {
  Anchor,
  Collapse,
  Container,
  Dropdown,
  ToggleButton,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "antd";

const SubmissionsTable = ({ submission, sortColumn, onSort, status }) => {
  const actionLinks = [
    {
      link: (variants) => `/main/submission/${variants.id}`,
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
      link: (variants) => ``,
      text: "Assign Editor",
    },
    {
      link: (variants) => ``,
      text: "Set Final Decision",
    },
  ];
  const dispatch = useDispatch();
  const { toggleActions } = useSelector((store) => store.UIS.submissionsTable);
  const handleActionsToggle = useCallback(() => dispatch(actionsToggled()));
  const [columns, setColumns] = useState([]);
  const handleTableContent = () => {
    const cols = [
      {
        title: "#",
        key: "state",
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
        dataIndex: "step",
        title: "Article Status",
        key: "status",
        sorter: (a, b) => a.step - b.step,
      },
      {
        dataIndex: "titleString",
        title: "Article Title",
        key: "title",
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
    ];
    setColumns(cols);
  };
  useEffect(() => {
    handleTableContent();
  }, [toggleActions]);
  return (
    <div className="mx-3">
      <Table
        striped
        bordered
        className="align-middle"
        data={submission}
        sortColumn={sortColumn}
        onSort={onSort}
        columns={columns}
      />
    </div>
  );
};

export default SubmissionsTable;
