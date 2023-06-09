import { TagType } from "model/global.types";
import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { tagEditProps } from "model/global.types";

type EditTagsModalProps = {
  isShow: boolean;
  onClose: () => void;
  availableTags: TagType[];
} & tagEditProps;

export function EditTagsModal({
  isShow,
  onClose,
  availableTags,
  onDelete,
  onUpdate,
}: EditTagsModalProps) {
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
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col className="w-100">
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) =>
                      onUpdate({ id: tag.id, label: e.target.value })
                    }
                  />
                </Col>
                <Col sm="auto">
                  <Button
                    onClick={() => onDelete(tag.id)}
                    variant="outline-danger"
                  >
                    &times;
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
