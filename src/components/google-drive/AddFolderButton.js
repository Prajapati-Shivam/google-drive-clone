import React, { useState } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function AddFolderButton({ currentFolder }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (currentFolder == null) return;
    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id })
    }
    database.folder.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      createdAt: database.getCurrentTimestamp(),
      path

    })
    setName("");
    closeModal();
  }
  return (
    <>
      <button
        onClick={openModal}
        className="border-2 rounded-md text-3xl border-blue-500 text-blue-500 p-2 hover:bg-blue-500 hover:text-white hover:outline-none"
      >
        <AiOutlineFolderAdd />
      </button>
      {open && (
        <>
          <div
            onClick={closeModal}
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-20 p-4 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Add Folder</h2>
              <button

                onClick={closeModal}
                className="text-2xl hover:text-red-500 hover:outline-none"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label htmlFor="folder-name">Folder name:</label>
                <input
                  type="text" id="folder-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 rounded px-4 py-2 mt-2 mb-4 hover:border-blue-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 w-full text-center"
              >
                Add Folder
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
