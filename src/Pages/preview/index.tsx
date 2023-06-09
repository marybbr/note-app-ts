import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { Note } from "model/global.types";
import { useNavigate } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type PreviewProps = {
  onDelete: (id: string) => void;
};

export function Preview({ onDelete }: PreviewProps) {
  const note = useOutletContext<Note>();
  const navigate = useNavigate();

  return (
    <div>
      <Row className="align-items-center glassy-bg p-3 my-3">
        <Col>
          <h1>{note.title}</h1>
        </Col>
        <Col>
          <Stack gap={2} direction="horizontal" className="justify-content-end">
            <Button
              onClick={() => navigate(`/${note.id}/edit`)}
              size="lg"
              variant="dark"
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete(note.id)}
              size="lg"
              variant="danger"
            >
              Delete
            </Button>
            <Button
              onClick={() => navigate("/")}
              size="lg"
              variant="outline-dark"
            >
              Back
            </Button>
          </Stack>
        </Col>
      </Row>
      <Row
        className="align-items-center mt-3 p-3 rounded"
        style={{ backgroundColor: note.color }}
      >
        <Col>
          <h5>Tags :</h5>
        </Col>
        <Stack gap={2} direction="horizontal">
          {note.tags.map((tag) => (
            <Badge bg="light" text="dark" key={tag.id}>
              {tag.label}
            </Badge>
          ))}
        </Stack>
      </Row>
      <Row className="h-80 glassy-bg p-3 mt-4">
        <h5>
          <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </h5>
      </Row>
    </div>
  );
}
