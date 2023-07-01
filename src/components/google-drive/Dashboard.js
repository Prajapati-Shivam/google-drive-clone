import React from "react";
import Navbar from "./Navbar";
import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";
import { useFolder } from "../../hooks/useFolder";
import Folder from "./Folder";
import { useParams, useLocation } from "react-router-dom";
import FolderBreadcrumps from "./FolderBreadcrumps";

export default function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders } = useFolder(folderId, state && state.folder);
  return (
    <>
      <Navbar />
      <div className="px-6 py-4">
        <div className="flex items-center">
          <FolderBreadcrumps currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="flex flex-wrap mt-6">
            {childFolders.map((child) => (
              <div key={child.id} className="sm:w-1/5">
                <Folder folder={child} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
