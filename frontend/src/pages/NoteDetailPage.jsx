import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import axiosInstance from "../lib/axios"
import toast, { LoaderIcon } from "react-hot-toast"
import { ArrowLeftIcon, Trash2Icon } from "lucide-react"


const NoteDetailPage = () => {

    const [note, setNote] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const navigate = useNavigate()

    const { id } = useParams()

    console.log(id)

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await axiosInstance.get(`/notes/${id}`)
                setNote(res.data)
            } catch (error) {
                console.error(`Failed to fetch note with id ${id}`)
                console.log(error)
                toast.error("Something went wrong. Failed to fetch note.")
            } finally {
                setLoading(false)
            }
        }
        fetchNote()
    }, [id])

    console.log(note)

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="size-10 animate-spin" />
            </div>
        )
    }

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await axiosInstance.delete(`/notes/${id}`);
            toast.success("Note deleted");
            navigate("/");
        } catch (error) {
            console.log("Error deleting the note:", error);
            toast.error("Failed to delete note");
        }
    };

    const handleSave = async () => {
        setSaving(true)
        try {
            await axiosInstance.put(`/notes/${id}`, note)
            toast.success("Note saved successfully")
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong. Failed to save note.")
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="mx-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5" />
                            Back to Notes
                        </Link>
                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="h-5 w-5" />
                            Delete Note
                        </button>
                    </div>
                </div>

                <div className="card bg-base-100">
                    <div className="card-body">
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Note title"
                                className="input input-bordered"
                                value={note.title}
                                onChange={(e) => setNote({ ...note, title: e.target.value })}
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Content</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Write your note here..."
                                className="textarea textarea-bordered h-32"
                                value={note.content}
                                onChange={(e) => setNote({ ...note, content: e.target.value })}
                            />
                        </div>

                        <div className="card-actions justify-end">
                            <button type="submit" onClick={handleSave} className="btn btn-primary" disabled={saving}>
                                {saving ? "Saving..." : "Save changes"}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NoteDetailPage