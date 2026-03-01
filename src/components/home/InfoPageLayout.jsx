import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const InfoPageLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
            {/* Top nav bar */}
            <div className="shadow bg-white dark:bg-gray-900 dark:shadow-gray-800/50 transition-colors duration-300">
                <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 dark:text-gray-200">
                    <Link to="/">
                        <img src="/logo.svg" alt="logo" className="h-8 w-auto dark:invert" />
                    </Link>
                    <Link
                        to="/"
                        className="text-sm text-green-600 dark:text-green-400 hover:underline font-medium"
                    >
                        ← Back to Home
                    </Link>
                </nav>
            </div>

            {/* Page content */}
            <main className="max-w-4xl mx-auto px-6 py-16">
                {children}
            </main>

            <Footer />
        </div>
    )
}

export default InfoPageLayout
