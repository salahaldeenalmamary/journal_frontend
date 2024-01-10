// import Accordion from "react-bootstrap/Accordion";
import ReviewerFormDialog from "../ReviewerFormDialog";
import ActionButtons from "../ActionButtons";
import {
  Accordion,
  AccordionBody,
  AccordionButton,
  AccordionHeader,
  AccordionItem,
  Card,
} from "react-bootstrap";
export default function AccordionReviewerSteps(props) {
  return (
    <Card>
      <Card.Body className="">
        <Accordion className="">
          <Accordion.Item eventKey="0">
            <div className="rows">
              <Accordion.Button
                type="button"
                className="col-12 border m-2 text-start"
              >
                Suggest Reviewers :
              </Accordion.Button>
            </div>
            <Accordion.Body>
              <ReviewerFormDialog />
            </Accordion.Body>
          </Accordion.Item>
          <AccordionItem eventKey="1">
            <div className="rows">
              <Accordion.Button
                type="button"
                className="col-12 border m-2 text-start"
              >
                Oppose Reviewers:
              </Accordion.Button>
            </div>
            <Accordion.Body>
              <ReviewerFormDialog />
            </Accordion.Body>
          </AccordionItem>
        </Accordion>
      </Card.Body>
      <Card.Footer>
        <ActionButtons {...props} />
      </Card.Footer>
    </Card>
  );
}
