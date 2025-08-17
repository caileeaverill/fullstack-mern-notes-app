import React from 'react'
import { Route, Routes } from 'react-router'
import Homepage from './pages/Homepage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import toast from 'react-hot-toast'

function App() {
  return (
    <div data-theme="forest">
      <button className='btn btn-primary' onClick={() => toast.success("Hello")}>Toast</button>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App