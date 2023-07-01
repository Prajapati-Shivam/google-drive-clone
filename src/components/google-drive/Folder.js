import React from "react";
import { Link } from "react-router-dom";
import { AiFillFolder } from "react-icons/ai";

export default function Folder({ folder }) {
  return (
    <Link
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
      className="flex items-center gap-x-2 mr-2 border-2 rounded-md text-2xl border-blue-500 text-blue-500 p-2 hover:bg-blue-500 hover:text-white hover:outline-none"
    >
      <AiFillFolder className="text-3xl" />
      {folder.name}
    </Link>
  );
}
