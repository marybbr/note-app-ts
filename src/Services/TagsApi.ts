import apiCall from "API";
import { TagType } from "model/global.types";

export const getTags = () => {
  return apiCall.get<TagType[]>("/tags");
};
export const createTag = (body: TagType) => {
  return apiCall.post("/tags", body);
};
export const updateTags = ({ id, body }: { id: string; body: TagType }) => {
  return apiCall.put(`/tags/${id}`, body);
};
export const deleteTags = (id: string) => {
  return apiCall.delete(`/tags/${id}`);
};
