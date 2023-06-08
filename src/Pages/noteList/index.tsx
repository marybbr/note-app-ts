import { Row, Col, Stack, Button, Form } from "react-bootstrap";
import ReactSelect from "react-select";
import { useNavigate } from "react-router-dom";

export function NoteList() {
  const Navigate = useNavigate();
  return (
    <>
      <Row className="align-items-center p-2 mb-5">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Button onClick={() => Navigate("/new")} variant="dark" size="lg">
              Create
            </Button>
            <Button variant="outline-dark" size="lg">
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="glassy-bg p-5">
          <Col>
            <Form.Group>
              <Form.Label as="h4">Title</Form.Label>
              <Form.Control
                type="text"
                value=""
                onChange={(e) => console.log(e)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label as="h4">Tags</Form.Label>
              <ReactSelect
                isMulti
                // value={Array.map()}
                // options={}
                onChange={(e) => console.log(e)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
}
