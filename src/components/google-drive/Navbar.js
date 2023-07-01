import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-blue-500 text-white px-6 py-3">
      <Link className='text-3xl font-semibold' to='/'>🔺G-Drive</Link>
      <Link to='/user'>Profile</Link>
    </nav>
  )
}
