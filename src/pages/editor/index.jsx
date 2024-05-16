import { Link } from "react-router-dom";
import ProgressIndicator from "../../common/progressIndicator";
import ContainerWithBadge from "../../common/containerWithBadge";
import { Nav, Tab, Tabs } from "react-bootstrap";

const Editor = () => {
  return (
    <Tabs defaultActiveKey="0" id="justify-tab-example" className="mb-3">
      <Tab title="Editorial" eventKey={"0"}>
        <div className="p-2" id="editorial-tab-pane">
          <div className="row justify-content-center justify-content-md-start">
            <div className="d-none d-md-block col-md-3 ">
              <h2 className="fs-3">Managing Editor Main Menu</h2>
            </div>
            <div className="col-11 col-sm-8 col-md-6 col-lg-4">
              <ContainerWithBadge label={"Submissions with:"}>
                <div
                  className="d-flex flex-wrap text-center border btn-group mx-2"
                  role="group"
                  aria-label="First group"
                >
                  <button type="button" className="btn w-25 ">
                    0 Reviews Complete 0
                  </button>
                  <button type="button" className="btn w-25 ">
                    1 Reviews Complete 0
                  </button>
                  <button type="button" className="btn w-25 ">
                    2 Reviews Complete 0
                  </button>
                  <button type="button" className="btn w-25 ">
                    3 Reviews Complete 0
                  </button>
                </div>
              </ContainerWithBadge>
              <ContainerWithBadge label="Search:">
                <ul className="d-flex list-unstyled justify-content-center text-center mb-lg-0">
                  <li className="">
                    <Link
                      to="submissions/declined"
                      className="px-2 text-decoration-none"
                    >
                      Search Submissions
                    </Link>
                  </li>
                  <li className="">
                    <span className="px-2">|</span>
                  </li>
                  <li className="">
                    <Link
                      to="search_people"
                      className="px-2 text-decoration-none"
                    >
                      Search People
                    </Link>
                  </li>
                </ul>
              </ContainerWithBadge>
              <ContainerWithBadge label={`Editor "To-Do"List"`}>
                <ul className="list-unstyled ms-3">
                  <h4 className="fs-5">New submissions</h4>
                  <li className="row ms-3 align-items-center">
                    <div className="col-2">
                      <ProgressIndicator
                        segments={[
                          {
                            label: "unfinished",
                            size: 40,
                            color: "success",
                          },
                          {
                            label: "finished",
                            size: 40,
                            color: "warning",
                          },
                          {
                            label: "reviewing",
                            size: 20,
                            color: "danger",
                          },
                        ]}
                      />
                    </div>
                    <Link
                      to="submissions/declined"
                      className="col text-decoration-none "
                      // aria-disabled="true"
                      // tabIndex="-1"
                    >
                      Submit New ManuScript
                      <span className="mx-2">(0)</span>
                    </Link>
                  </li>
                  <li className="row ms-3 align-items-center">
                    <div className="col-2">
                      <ProgressIndicator
                        segments={[
                          {
                            label: "unfinished",
                            size: 40,
                            color: "success",
                          },
                          {
                            label: "finished",
                            size: 40,
                            color: "warning",
                          },
                          {
                            label: "reviewing",
                            size: 20,
                            color: "danger",
                          },
                        ]}
                      />
                    </div>
                    <Link
                      to="submissions/declined"
                      className="col text-decoration-none pe-none link-dark"
                      // aria-disabled="true"
                      // tabIndex="-1"
                    >
                      Submissions Sent Back To Author
                      <span className="mx-2">(0)</span>
                    </Link>
                  </li>
                  <li className="row ms-3 align-items-center">
                    <div className="col-2">
                      <ProgressIndicator
                        segments={[
                          {
                            label: "unfinished",
                            size: 40,
                            color: "success",
                          },
                          {
                            label: "finished",
                            size: 40,
                            color: "warning",
                          },
                          {
                            label: "reviewing",
                            size: 20,
                            color: "danger",
                          },
                        ]}
                      />
                    </div>
                    <Link
                      to="submissions/declined"
                      className="col text-decoration-none pe-none link-dark"
                      aria-disabled="true"
                      tabIndex="-1"
                    >
                      Incomplete Submissions
                      <span className="mx-2">(0)</span>
                    </Link>
                  </li>
                  <li className="row ms-3 align-items-center">
                    <div className="col-2">
                      <ProgressIndicator
                        segments={[
                          {
                            label: "unfinished",
                            size: 40,
                            color: "success",
                          },
                          {
                            label: "finished",
                            size: 40,
                            color: "warning",
                          },
                          {
                            label: "reviewing",
                            size: 20,
                            color: "danger",
                          },
                        ]}
                      />
                    </div>
                    <Link
                      to="submissions/declined"
                      className="col text-decoration-none pe-none link-dark"
                      aria-disabled="true"
                      tabIndex="-1"
                    >
                      Submissions Waiting for Authors Approval
                      <span className="mx-2">(0)</span>
                    </Link>
                  </li>
                  <li className="row ms-3 align-items-center">
                    <div className="col-2">
                      <ProgressIndicator
                        segments={[
                          {
                            label: "unfinished",
                            size: 40,
                            color: "success",
                          },
                          {
                            label: "finished",
                            size: 40,
                            color: "warning",
                          },
                          {
                            label: "reviewing",
                            size: 20,
                            color: "danger",
                          },
                        ]}
                      />
                    </div>
                    <Link
                      to="submissions/declined"
                      className="col text-decoration-none pe-none link-dark"
                      aria-disabled="true"
                      tabIndex="-1"
                    >
                      Submissions Being Processed
                      <span className="mx-2">(0)</span>
                    </Link>
                  </li>
                </ul>
              </ContainerWithBadge>
              <ContainerWithBadge label="View All Assigned">
                <ul className="list-unstyled ps-5">
                  <li>
                    <Link
                      to="submissions/declined"
                      className="text-decoration-none link-dark"
                      aria-disabled="true"
                      tabIndex="-1"
                    >
                      View All Assigned Submissions
                      <span className="mx-2">(0)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="submissions/declined"
                      className="text-decoration-none link-dark"
                      aria-disabled="true"
                      tabIndex="-1"
                    >
                      View All Assigned Submissions being Edited
                      <span className="mx-2">(0)</span>
                    </Link>
                  </li>
                </ul>
              </ContainerWithBadge>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </Tab>
      <Tab title="Proposal Menu" eventKey={"1"}>
        <>Proposal Menu</>
      </Tab>
    </Tabs>
  );
};

export default Editor;
export { default as EditorSubmissions } from "./editorSubmissions";
