import { NoteForm } from "components/NoteForm";
import { NewNoteProps } from "./create.types";

export function CreateNote({ availableTags }: NewNoteProps) {
  return (
    <>
      <h1 className="my-4">New Note</h1>
      <NoteForm availableTags={availableTags} />
    </>
  );
}
