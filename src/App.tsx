import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { NoteList } from "Pages/noteList";
import { CreateNote } from "Pages/create";
import { v4 as uuidV4 } from "uuid";
import "./style/main.css";
import { useState } from "react";

type RawNote = {
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

function App() {
  const [notes, setNotes] = useState<RawNote[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);

  console.log(notes);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onAddTag(tag: TagType) {
    setTags((prvTag) => [...prvTag, tag]);
  }

  return (
    <Container>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route
          path="/new"
          element={
            <CreateNote
              availableTags={tags}
              onSubmit={onCreateNote}
              onAddTag={onAddTag}
            />
          }
        />
        <Route path="/:id" element={<h1> ID Page </h1>} />
        <Route path="/edit" element={<h1>Note Edit</h1>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
