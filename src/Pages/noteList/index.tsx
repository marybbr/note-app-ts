import { Row, Col, Stack, Button, Form, Card, Badge } from "react-bootstrap";
import ReactSelect from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { NoteListProps, silmplifiedNote } from "./NoteList.type";
import { TagType } from "model/global.types";
import { EditTagsModal } from "./editTagModal";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "Services/NoteApi";

export function NoteList({ availableTags, isError = false }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [title, setTitle] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const Navigate = useNavigate();

  const { data: notes } = useQuery(["notes-list"], getNotes, {
    refetchOnMount: true,
  });

  const noteWithTagsLable = notes?.data.map((note: any) => {
    return {
      ...note,
      tags: availableTags?.filter((tag) => note.tagIds.includes(tag.id)),
    } as silmplifiedNote;
  });

  const filteredNote = noteWithTagsLable?.filter((note) => {
    return (
      selectedTags.every((tag) =>
        note.tags.some((noteTag) => noteTag.id === tag.id)
      ) && note.title.toLowerCase().includes(title.toLowerCase())
    );
  });

  return (
    <>
      <Row className="align-items-center p-2 mb-5 ">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Button onClick={() => Navigate("/new")} variant="dark" size="lg">
              Create
            </Button>
            <Button
              onClick={() => setIsShowModal(true)}
              variant="outline-dark"
              size="lg"
            >
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
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label as="h4">Tags</Form.Label>
              <ReactSelect
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 10 }) }}
                isMulti
                value={selectedTags?.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags?.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        {isError ? (
          <h1>Request Not Found</h1>
        ) : (
          <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-2">
            {filteredNote?.map((note) => (
              <Col key={note.id}>
                <Card
                  as={Link}
                  to={`/${note.id}`}
                  style={{
                    backgroundColor: note.color,
                    border: `1px solid ${note.color}`,
                  }}
                  className="h-100 text-reset text-decoration-none "
                >
                  <Card.Body>
                    <Stack
                      gap={2}
                      className="align-items-center justify-content-center"
                    >
                      <span className="fs-5 fw-bold">{note.title}</span>
                      <Stack
                        gap={1}
                        direction="horizontal"
                        className="justify-content-center "
                      >
                        {note.tags.map((tag) => (
                          <p className="h6" key={tag.id}>
                            <Badge bg="light" text="dark">
                              {tag.label}
                            </Badge>
                          </p>
                        ))}
                      </Stack>
                    </Stack>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Form>
      <EditTagsModal
        isShow={isShowModal}
        onClose={() => setIsShowModal(false)}
      />
    </>
  );
}
