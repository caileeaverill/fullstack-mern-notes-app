import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { formatDate } from '../lib/utils'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'

function NoteCard({ note, setNotes }) {

    const handleDelete = async (e, id) => {
        e.preventDefault()

        if (!window.confirm("Are you sure you want to delete this note?")) return

        try {
            await axiosInstance.delete(`/notes/${id}`)
            toast.success("Note deleted successfully")
            setNotes(prevNotes => prevNotes.filter(note => note._id !== id))
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong. Failed to delete note.")
        }
    }

    return (
        <Link to={`/note/${note._id}`}
            className='card bg-base-100 transition-all duration-300 hover:-translate-y-2 '>
            <div className='card-body p-4 bg-white border-t-4 border-solid border-primary rounded-md text-zinc-900'>
                <h3 className='card-title'>{note.title}</h3>
                <p className='line-clamp-3'>{note.content}</p>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-sm uppercase'>{formatDate(new Date(note.createdAt))}</span>
                    <div className='flex items-center gap-1'>
                        <button className='text-green-700'>
                            <PenSquareIcon className='size-4' />
                        </button>
                        <button onClick={(e) => handleDelete(e, note._id)} className='btn btn-ghost btn-xs text-red-600'>
                            <Trash2Icon className='size-4' />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard