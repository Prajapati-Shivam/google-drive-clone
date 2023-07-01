import React from 'react'
import { AiFillFileAdd } from 'react-icons/ai'

export default function AddFileButton() {
  function handleUpload(e) {}
  return (
    <label className="border-2 rounded-md mr-4 text-3xl border-blue-500 text-blue-500 p-2 hover:bg-blue-500 hover:text-white hover:outline-none">
      <AiFillFileAdd />
      <input type="file" onChange={handleUpload} className='opacity-0 absolute left-[-999px]' />
    </label>
  )
}
