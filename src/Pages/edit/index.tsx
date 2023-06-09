import { NoteForm } from "components/NoteForm";
import { EditNoteProps } from "./edit.types";
import { useOutletContext } from "react-router-dom";
import { Note } from "model/global.types";

export function EditNote({ availableTags }: EditNoteProps) {
  const note = useOutletContext() as Note;
  return (
    <>
      <h1 className="my-4">Edit Note</h1>
      <NoteForm availableTags={availableTags} note={note} />
    </>
  );
}
