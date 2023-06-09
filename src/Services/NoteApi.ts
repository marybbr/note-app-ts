import apiCall from "API";
import { Note, RawNote } from "model/global.types";

export const getNotes = async () => {
  return apiCall.get<RawNote[]>("/notes");
};

export const getNoteDetail = async (id: string) => {
  return apiCall.get(`/notes/${id}`);
};

export const createNote = async (body: RawNote) => {
  return apiCall.post("/notes", body);
};

export const updateNote = async ({
  body,
  id,
}: {
  body: RawNote;
  id: string;
}) => {
  return apiCall.put(`/notes/${id}`, body);
};

export const deleteNote = async (id: string) => {
  return apiCall.delete(`/notes/${id}`);
};
