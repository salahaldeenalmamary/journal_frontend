import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionsToggled } from "../../store/UI/submissionsTable";
import Table from "../../common/table/table";
import {
  Anchor,
  Button,
  Collapse,
  Container,
  Dropdown,
  ToggleButton,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const SubmissionsTable = ({ submission, sortColumn, onSort, status }) => {
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
                  <li>
                    <Anchor className="text-decoration-none p-2">
                      View Submission
                    </Anchor>
                  </li>
                  <li>
                    <LinkContainer to={"/select_reviewer"}>
                      <Anchor className="text-decoration-none p-2">
                        Invite Reviewers
                      </Anchor>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to={`/submissions/${status}/${article.id}`}>
                      <Anchor className="text-decoration-none p-2">
                        Details
                      </Anchor>
                    </LinkContainer>
                  </li>
                  <li>
                    <Anchor className="text-decoration-none p-2">
                      History
                    </Anchor>
                  </li>
                  <li>
                    <Anchor className="text-decoration-none p-2">
                      Submit Early Decision
                    </Anchor>
                  </li>
                  <li>
                    <Anchor className="text-decoration-none p-2">
                      File Inventory
                    </Anchor>
                  </li>
                  <li>
                    <Anchor className="text-decoration-none p-2">
                      Edit Submission
                    </Anchor>
                  </li>
                  <li>
                    <Anchor className="text-decoration-none p-2">
                      Send Back to Author
                    </Anchor>
                  </li>
                  <li>
                    <Anchor className="text-decoration-none p-2">
                      Remove Submission
                    </Anchor>
                  </li>
                  <li>
                    <Anchor className="text-decoration-none p-2">
                      Assign Editor
                    </Anchor>
                  </li>
                  <li>
                    <Anchor className="text-decoration-none p-2">
                      Set Final Decision
                    </Anchor>
                  </li>
                </ul>
              </Collapse>
              <Collapse in={!toggleActions}>
                <Dropdown className="py-2">
                  <Dropdown.Toggle as={Anchor}>Actions</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <LinkContainer to={"/select_reviewer"}>
                        <Anchor className="text-decoration-none p-2">
                          View Submission
                        </Anchor>
                      </LinkContainer>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Anchor className="text-decoration-none p-2">
                        Invite Reviewers
                      </Anchor>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <LinkContainer to={`/submissions/${article.id}`}>
                        <Anchor className="text-decoration-none p-2">
                          Details
                        </Anchor>
                      </LinkContainer>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Anchor className="text-decoration-none p-2">
                        History
                      </Anchor>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Anchor className="text-decoration-none p-2">
                        Submit Early Decision
                      </Anchor>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Anchor className="text-decoration-none p-2">
                        File Inventory
                      </Anchor>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Anchor className="text-decoration-none p-2">
                        Edit Submission
                      </Anchor>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Anchor className="text-decoration-none p-2">
                        Send Back to Author
                      </Anchor>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Anchor className="text-decoration-none p-2">
                        Remove Submission
                      </Anchor>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Anchor className="text-decoration-none p-2">
                        Assign Editor
                      </Anchor>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Anchor className="text-decoration-none p-2">
                        Set Final Decision
                      </Anchor>
                    </Dropdown.Item>
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
