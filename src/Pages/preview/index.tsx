import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useOutletContext, useParams } from "react-router-dom";
import { Note, TagType } from "model/global.types";
import { useNavigate } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteNote, getNoteDetail } from "Services/NoteApi";

export function Preview({ tags }: { tags: TagType[] }) {
  const note = useOutletContext() as Note;
  const navigate = useNavigate();

  const { mutate: mutateDeleteNote } = useMutation(deleteNote, {
    // onSuccess: () => {
    //   refetchNotes();
    // },
  });

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
              onClick={() => mutateDeleteNote(note.id)}
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
          {note.tags.map((tag: any) => (
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
