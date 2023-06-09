import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { NoteList } from "Pages/noteList";
import { CreateNote } from "Pages/create";
import { Preview } from "Pages/preview";
import { EditNote } from "Pages/edit";
import { useLocalStorage } from "useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import { RawNote, TagType, NoteData } from "model/global.types";
import { NoteLayout } from "NoteDetailLayout";
import "./style/main.css";

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

  function onDeleteNote(id: string) {
    setNotes((prvs) => {
      return prvs.filter((note) => note.id !== id);
    });
  }

  function onAddTag(tag: TagType) {
    setTags((prvTag) => [...prvTag, tag]);
  }

  function onUpdateTag({ id, label }: { id: string; label: string }) {
    setTags((prv) => {
      return prv.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function onDeleteTag(id: string) {
    setTags((prvTags) => {
      return prvTags.filter((tag) => tag.id !== id);
    });
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
          element={
            <NoteList
              notes={noteWithTagsLable}
              availableTags={tags}
              onDelete={onDeleteTag}
              onUpdate={onUpdateTag}
            />
          }
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
        <Route path="/:id" element={<NoteLayout notes={notes} tags={tags} />}>
          <Route index element={<Preview onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                availableTags={tags}
                onSubmit={onCreateNote}
                onAddTag={onAddTag}
              />
            }
          />
        </Route>
        <Route path="*" element={<h1>Page Not 404</h1>} />
      </Routes>
    </Container>
  );
}

export default App;
