import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../app/features/authSlice'
import { useTheme } from '../app/ThemeContext'
import { useClerk } from '@clerk/clerk-react'
import { Sun, Moon } from 'lucide-react'

const Navbar = () => {

    const { user } = useSelector(state => state.auth)
    const { theme, toggleTheme } = useTheme()
    const { signOut } = useClerk()

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutUser = async () => {
        await signOut()
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className='shadow bg-white dark:bg-gray-900 dark:shadow-gray-800/50 transition-colors duration-300'>
            <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 dark:text-gray-200 transition-all">
                <Link to='/'>
                    <img src="/logo.svg" alt="CV Craft logo" className="h-8 w-auto dark:invert" />
                </Link>
                <div className='flex items-center gap-4 text-sm'>
                    <p className='max-sm:hidden'>Hi, {user?.name}</p>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button onClick={logoutUser} className="bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 border
                border-gray-300 dark:border-gray-600 px-7 py-2 rounded-full active:scale-95 transition-all">Logout</button>
                </div>

            </nav>
        </div>
    )
}

export default Navbar