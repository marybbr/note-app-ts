import { Navigate, Route, Routes } from "react-router-dom";
import { NoteList } from "../Pages/noteList";
import "./style/main.css";

function RouteContainer() {
  return (
    <Routes>
      <Route path="/" element={<NoteList />} />
      <Route path="/new" element={<h1>Note Create</h1>} />
      <Route path="/:id" element={<h1> ID Page </h1>} />
      <Route path="/edit" element={<h1>Note Edit</h1>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RouteContainer;
