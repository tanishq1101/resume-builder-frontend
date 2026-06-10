import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>

            <footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 dark:text-gray-400 bg-linear-to-r from-white via-blue-200/60 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900 mt-40 transition-colors duration-300">
                <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
                    <Link to="/">
                        <img src="/logo.svg" alt="logo" className="h-11 w-auto dark:invert" />
                    </Link>
                    <div>
                        <p className="text-slate-800 dark:text-gray-200 font-semibold">Product</p>
                        <ul className="mt-2 space-y-2">
                            <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link></li>
                            <li><Link to="/support" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Support</Link></li>
                            <li><Link to="/pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Pricing</Link></li>
                            <li><Link to="/affiliate" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Affiliate</Link></li>
                        </ul>
                    </div>
                    <div>

                        <p className="text-slate-800 dark:text-gray-200 font-semibold">Resources</p>
                        <ul className="mt-2 space-y-2">
                            <li><Link to="/company" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Company</Link></li>
                            <li><Link to="/blogs" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Blogs</Link></li>
                            <li><Link to="/community" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Community</Link></li>
                            <li><Link to="/careers" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Careers<span className="text-xs text-white bg-blue-600 rounded-md ml-2 px-2 py-1">We're hiring!</span></Link></li>
                            <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-slate-800 dark:text-gray-200 font-semibold">Legal</p>
                        <ul className="mt-2 space-y-2">
                            <li><Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy</Link></li>
                            <li><Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Terms</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
                    <p className="max-w-60">Making every customer feel valued—no matter the size of your audience.</p>
                    <div className="flex items-center gap-4 mt-3">
                        {/* GitHub */}
                        <a href="https://github.com/pratyush-sinha" target="_blank" rel="noreferrer" title="GitHub">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 hover:text-blue-500 transition" aria-hidden="true">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                        </a>
                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/in/pratyush-sinha-" target="_blank" rel="noreferrer" title="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin size-5 hover:text-blue-500 transition" aria-hidden="true">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect width="4" height="12" x="2" y="9"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                        {/* Instagram */}
                        <a href="https://www.instagram.com/pratyush.sinha" target="_blank" rel="noreferrer" title="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 hover:text-blue-500 transition" aria-hidden="true">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                            </svg>
                        </a>
                        {/* Contact / Email */}
                        <a href="mailto:tks2005homes@gmail.com" title="Email us">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 hover:text-blue-500 transition" aria-hidden="true">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                        </a>
                    </div>
                    <p className="mt-3 text-center">© 2026 CV Craft</p>
                </div>
            </footer>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        </>
    )
}

export default Footer