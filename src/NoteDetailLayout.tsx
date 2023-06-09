import { RawNote, TagType, Note } from "model/global.types";
import { Outlet, useParams } from "react-router-dom";

type NoteLayoutProps = {
  notes: RawNote[];
  tags: TagType[];
};

function NotFound() {
  return (
    <h1>
      Note Not Found <a href="/"> back to home</a>
    </h1>
  );
}

export function NoteLayout({ notes, tags }: NoteLayoutProps) {
  const param = useParams();
  const detectedNote = notes.find((n) => n.id === param.id);

  const DetectedNoteWithTag = {
    ...detectedNote,
    tags: tags?.filter((tag) => detectedNote?.tagIds.includes(tag.id)),
  };

  if (detectedNote == null) return <NotFound />;
  return <Outlet context={DetectedNoteWithTag as Note} />;
}
