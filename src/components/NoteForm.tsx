import { useState, useRef, FormEvent } from "react";
import { Form, Row, Stack, Col, Button } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { SliderPicker } from "react-color";
import { NoteData, TagType } from "App";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: TagType) => void;
  availableTags: TagType[];
};

export function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {
  const navigate = useNavigate();

  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [SelectedColor, setSelectedColor] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
      color: SelectedColor,
    });

    navigate("/");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack>
        <Row className="glassy-bg p-5 my-2">
          <Col>
            <Form.Group>
              <Form.Label as="h4">Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label as="h4">Tags</Form.Label>
              <CreatableReactSelect
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 10 }) }}
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                value={selectedTags.map((tag) => {
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
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="glassy-bg p-5 my-2">
          <SliderPicker
            color="#000"
            onChange={(colorPicked) => {
              setSelectedColor(colorPicked.hex);
            }}
          />
        </Row>
        <Row className="glassy-bg p-5 my-2">
          <Form.Group>
            <Form.Label>Body</Form.Label>
            <Form.Control ref={markdownRef} required as="textarea" rows={10} />
          </Form.Group>
        </Row>
        <Stack
          className="mt-3 justify-content-end"
          direction="horizontal"
          gap={2}
        >
          <Button variant="dark" type="submit">
            Save
          </Button>
          <Button variant="outline-dark">Cancel</Button>
        </Stack>
      </Stack>
    </Form>
  );
}
