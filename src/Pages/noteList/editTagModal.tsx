import { updateTags, deleteTags, getTags } from "Services/TagsApi";
import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type EditTagsModalProps = {
  isShow: boolean;
  onClose: () => void;
};

export function EditTagsModal({ isShow, onClose }: EditTagsModalProps) {
  const [title, settitle] = useState("");
  const { mutate: mutateDeleteTag } = useMutation(deleteTags, {
    onSuccess: () => {
      refetch();
    },
  });
  const { mutate: mutateUpdateTag } = useMutation(updateTags);
  const { data: tags, refetch } = useQuery(["tags-list"], getTags);

  useEffect(() => {
    if (isShow) {
      refetch();
    }
  }, [isShow]);

  return (
    <Modal
      contentClassName="modal-bg"
      show={isShow}
      onHide={onClose}
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {tags?.data.map((tag) => (
              <Row key={tag.id}>
                <Col className="w-100">
                  <Form.Control
                    type="text"
                    defaultValue={tag.label}
                    // value={tag.label}
                    onChange={(e) => settitle(e.target.value)}
                    required
                  />
                </Col>
                <Col sm="auto">
                  <Button
                    onClick={() => mutateDeleteTag(tag.id)}
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Col>
                <Col sm="auto">
                  <Button
                    onClick={() => {
                      const body = {
                        id: tag.id,
                        label: title,
                      };
                      mutateUpdateTag({
                        id: tag.id,
                        body,
                      });
                    }}
                    variant="success"
                  >
                    +
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
