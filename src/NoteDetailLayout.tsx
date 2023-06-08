import { RawNote } from "model/global.types";
import { Outlet, useParams } from "react-router-dom";

type NoteLayoutProps = {
  notes: RawNote[];
};

function NotFound() {
  return (
    <h1>
      Note Not Found <a href="/"> back to home</a>
    </h1>
  );
}

export function NoteLayout({ notes }: NoteLayoutProps) {
  const param = useParams();
  const detectedNote = notes.find((n) => n.id === param.id);

  if (detectedNote == null) return <NotFound />;
  return <Outlet context={detectedNote} />;
}
