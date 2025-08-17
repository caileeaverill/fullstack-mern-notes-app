import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { formatDate } from '../lib/utils'

function NoteCard({ note }) {
    return (
        <Link to={`/notes/${note._id}`}
            className='card bg-base-100 hover:shadow-lg transition-all duration-300 border-t-4 border-solid border-primary'>
            <div className='card-body '>
                <h3 className='card-title text-base-content'>{note.title}</h3>
                <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
                    <div className='flex items-center gap-1'>
                        <button>
                            <PenSquareIcon className='size-4' />
                        </button>
                        <button className='btn btn-ghost btn-xs text-error'>
                            <Trash2Icon className='size-4' />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard