import React from "react";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { Link } from "react-router-dom";

export default function FolderBreadcrumps({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];
  return (
    <div className="flex items-center gap-x-2 flex-1">
      {path.map((folder, index) => (
        <Link
          to={{
            pathname: folder.id ? `/folder/${folder.id}` : "/",
            state: { folder: { ...folder, path: path.slice(1, index) } },
          }}
          key={folder.id}
          className="text-2xl text-gray-400"
        >
          {folder.name}
          <span className="text-gray-500 ml-2">&nbsp;/&nbsp;</span>
        </Link>
      ))}
      {currentFolder && (
        <span className="text-gray-500 text-lg">{currentFolder.name}</span>
      )}
    </div>
  );
}
