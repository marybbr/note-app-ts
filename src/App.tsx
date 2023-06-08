import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { NoteList } from "./Pages/noteList";
import { CreateNote } from "./Pages/create";
import "./style/main.css";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/new" element={<CreateNote />} />
        <Route path="/:id" element={<h1> ID Page </h1>} />
        <Route path="/edit" element={<h1>Note Edit</h1>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
