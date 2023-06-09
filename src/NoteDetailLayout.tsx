import { useQuery } from "@tanstack/react-query";
import { getNoteDetail } from "Services/NoteApi";
import { TagType, Note } from "model/global.types";
import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";

type NoteLayoutProps = {
  tags: TagType[];
};

function NotFound() {
  return (
    <h1>
      Note Not Found <a href="/"> back to home</a>
    </h1>
  );
}

export function NoteLayout({ tags }: NoteLayoutProps) {
  const { id } = useParams();
  const { data: NoteDataById } = useQuery(
    ["note-detail"],
    () => getNoteDetail(id!),
    {
      enabled: !!id,
      onError: () => {
        return <NotFound />;
      },
    }
  );
  const DetectedNoteWithTag = {
    ...NoteDataById?.data,
    tags: tags?.filter((tag) => NoteDataById?.data?.tagIds.includes(tag.id)),
  };
  return <Outlet context={DetectedNoteWithTag as Note} />;
}
