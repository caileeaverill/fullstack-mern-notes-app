import { useState, useEffect } from 'react'
import axiosInstance from '../lib/axios'
import { toast } from 'react-hot-toast'

import RateLimitedUI from '../components/RateLimitedUI'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'

const Homepage = () => {

    const [isRateLimited, setIsRateLimited] = useState(false)
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axiosInstance.get('/notes')
                console.log(res.data)
                setNotes(res.data)
                setIsRateLimited(false)
            } catch (error) {
                console.error('Error fetching notes:', error)
                if (error.response.status === 429) {
                    setIsRateLimited(true)
                } else {
                    toast.error("Something went wrong")
                }
            } finally {
                setLoading(false)
            }
        }

        fetchNotes()
    }, [])

    return (
        <div className='min-h-screen'>

            {isRateLimited && <RateLimitedUI />}

            <div className='max-w-6xl mx-auto p-4 mt-4'>
                {loading && <p>Loading...</p>}

                {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

                {notes.length > 0 && !isRateLimited && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Homepage