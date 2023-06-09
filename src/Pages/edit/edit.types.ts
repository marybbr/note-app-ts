import { NoteData, TagType } from "model/global.types";

export type EditNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: TagType) => void;
  availableTags: TagType[];
};
