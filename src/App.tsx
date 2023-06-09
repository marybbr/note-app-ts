import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { NoteList } from "Pages/noteList";
import { CreateNote } from "Pages/create";
import { Preview } from "Pages/preview";
import { EditNote } from "Pages/edit";
import { NoteLayout } from "NoteDetailLayout";
import { getTags } from "Services/TagsApi";
import { useQuery } from "@tanstack/react-query";
import "./style/main.css";

function App() {
  const { data: tags } = useQuery(["tags-list"], getTags);

  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={
            <NoteList availableTags={tags?.data || []} isError={false} />
          }
        />
        <Route
          path="/new"
          element={<CreateNote availableTags={tags?.data || []} />}
        />
        <Route path="/:id" element={<NoteLayout tags={tags?.data || []} />}>
          <Route index element={<Preview tags={tags?.data || []} />} />
          <Route
            path="edit"
            element={<EditNote availableTags={tags?.data || []} />}
          />
        </Route>
        <Route path="*" element={<h1>Page Not 404</h1>} />
      </Routes>
    </Container>
  );
}

export default App;
