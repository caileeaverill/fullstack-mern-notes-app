import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'

import SearchBar from './SearchBar'

const Navbar = () => {
    return (
        <div className='bg-primary'>
            <div className="navbar shadow-sm max-w-6xl mx-auto">
                <div className="flex-1">
                    <Link to={'/'} className="text-black font-bold text-2xl">My Notebook</Link>
                </div>
                <div className="flex gap-4">
                    <SearchBar />
                    <Link to={"/create"} className='btn btn-secondary rounded-full'>
                        <PlusIcon className='size-5' />Create Note
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar