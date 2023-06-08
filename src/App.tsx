import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { NoteList } from "Pages/noteList";
import { CreateNote } from "Pages/create";
import { useLocalStorage } from "useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import "./style/main.css";
import { useState } from "react";
import { NoteLayout } from "NoteDetailLayout";

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

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<TagType[]>("TAGS", []);

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

  const noteWithTagsLable = notes.map((note) => {
    return {
      ...note,
      tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
    };
  });

  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={<NoteList notes={noteWithTagsLable} availableTags={tags} />}
        />
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
        <Route path="/:id" element={<NoteLayout notes={notes} />}>
          <Route index element={<h1>ID Page</h1>} />
          <Route path="edit" element={<h1>Note Edit</h1>} />
        </Route>
        <Route path="*" element={<h1>Page Not 404</h1>} />
      </Routes>
    </Container>
  );
}

export default App;
