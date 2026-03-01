import React from 'react'
import InfoPageLayout from '../../components/home/InfoPageLayout'
import { Link } from 'react-router-dom'

const AboutPage = () => {
    const team = [
        { name: 'Pratyush Sinha', role: 'Founder & Full Stack Developer', emoji: '👨‍💻' },
        { name: 'AI Engine', role: 'Powered by Google Gemini', emoji: '🤖' },
    ]

    const milestones = [
        { year: '2024', event: 'Project started as a personal side project to solve the resume gap.' },
        { year: 'Early 2025', event: 'First 100 users. Validated the AI-writing assistance concept.' },
        { year: 'Mid 2025', event: 'Dark mode, multiple templates, and PDF export shipped.' },
        { year: '2026', event: 'Reached 2,500+ active users and launched the community.' },
    ]

    return (
        <InfoPageLayout>
            {/* Hero */}
            <div className="text-center mb-14">
                <span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-widest">About Us</span>
                <h1 className="mt-3 text-4xl font-bold text-slate-800 dark:text-white">A tool built by a job-seeker, for job-seekers</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-[15px]">
                    AI Resume Builder started with one question: <em>"Why is it so hard to write a great resume?"</em> We set out to fix that.
                </p>
            </div>

            {/* Mission */}
            <div className="mb-14 rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-10">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Our mission</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-loose">
                    To make professional, ATS-optimised resume creation accessible to every job-seeker — regardless of their background, budget, or experience with design tools. We believe the right résumé can open doors to life-changing opportunities, and no one should be held back by a poorly formatted document.
                </p>
            </div>

            {/* Milestones */}
            <div className="mb-14">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">Our journey</h2>
                <div className="relative border-l-2 border-green-300 dark:border-green-700 pl-8 space-y-8">
                    {milestones.map((m, i) => (
                        <div key={i} className="relative">
                            <span className="absolute -left-11 flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold ring-4 ring-white dark:ring-gray-950">
                                {i + 1}
                            </span>
                            <p className="text-green-600 dark:text-green-400 text-sm font-semibold">{m.year}</p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{m.event}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team */}
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">The team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {team.map((member, i) => (
                        <div key={i} className="flex items-center gap-5 rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-7">
                            <span className="text-5xl">{member.emoji}</span>
                            <div>
                                <p className="font-semibold text-slate-800 dark:text-white">{member.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 text-center">
                <Link to="/contact" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full transition-all active:scale-95">
                    Get in Touch
                </Link>
            </div>
        </InfoPageLayout>
    )
}

export default AboutPage
