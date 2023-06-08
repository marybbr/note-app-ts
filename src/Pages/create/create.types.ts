import { NoteData, TagType } from "model/global.types";

export type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: TagType) => void;
  availableTags: TagType[];
};
