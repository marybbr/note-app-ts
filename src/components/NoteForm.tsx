import { Form, Row, Stack, Col } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";

export function NoteForm() {
  return (
    <Form>
      <Stack>
        <Row className="glassy-bg p-5 mt-1">
          <Col>
            <Form.Group>
              <Form.Label as="h4">Title</Form.Label>
              <Form.Control required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label as="h4">Tags</Form.Label>
              <CreatableReactSelect
                // onCreateOption={}
                // value={}
                // options={}
                // onChange={}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Stack>
    </Form>
  );
}
