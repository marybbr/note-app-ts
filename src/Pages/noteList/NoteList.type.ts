import { TagType, tagEditProps } from "model/global.types";

export type silmplifiedNote = {
  tags: TagType[];
  title: string;
  color: string;
  id: string;
};

export type NoteListProps = {
  availableTags: TagType[];
  notes: silmplifiedNote[];
} & tagEditProps;
