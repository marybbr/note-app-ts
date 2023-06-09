export type RawNote = {
  id: string;
  title: string;
  markdown: string;
  color: string;
  tagIds: string[];
};

export type TagType = {
  id: string;
  label: string;
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: TagType[];
  color: string;
};

export type Note = {
  id: string;
} & NoteData;
