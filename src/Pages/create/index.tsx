import { NoteForm } from "components/NoteForm";
import { NoteData, TagType } from "App";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: TagType) => void;
  availableTags: TagType[];
};

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
