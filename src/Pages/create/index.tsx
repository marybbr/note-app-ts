import { NoteForm } from "components/NoteForm";
import { NewNoteProps } from "./create.types";

export function CreateNote({
  availableTags,
  onAddTag,
  onSubmit,
}: NewNoteProps) {
  return (
    <>
      <h1 className="my-4">New Note</h1>
      <NoteForm
        onAddTag={onAddTag}
        onSubmit={onSubmit}
        availableTags={availableTags}
      />
    </>
  );
}
