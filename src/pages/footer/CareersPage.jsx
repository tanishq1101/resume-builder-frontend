import React from 'react'
import InfoPageLayout from '../../components/home/InfoPageLayout'
import { Link } from 'react-router-dom'

const openRoles = [
    {
        title: 'Full Stack Engineer',
        team: 'Engineering',
        type: 'Full-time · Remote',
        desc: 'Build and scale the core resume builder platform. Experience with React, Node.js, and cloud services required.',
    },
    {
        title: 'AI/ML Engineer',
        team: 'AI Research',
        type: 'Full-time · Remote',
        desc: 'Work on our AI writing engine, prompt engineering, and model fine-tuning to improve resume quality scores.',
    },
    {
        title: 'Product Designer (UI/UX)',
        team: 'Design',
        type: 'Full-time · Remote / Hybrid',
        desc: 'Craft beautiful, accessible experiences for job seekers. Strong Figma skills and a portfolio of web/app designs required.',
    },
    {
        title: 'Content Writer & SEO Strategist',
        team: 'Marketing',
        type: 'Part-time · Remote',
        desc: 'Create career-focused blog content, manage SEO strategy, and help grow our organic traffic.',
    },
]

const teamColors = {
    Engineering: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    'AI Research': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    Design: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    Marketing: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
}

const CareersPage = () => {
    return (
        <InfoPageLayout>
            {/* Hero */}
            <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-widest">
                    Careers
                    <span className="text-xs text-white bg-green-600 rounded-md px-2 py-0.5">We're hiring!</span>
                </span>
                <h1 className="mt-3 text-4xl font-bold text-slate-800 dark:text-white">Help us reshape how people find jobs</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-[15px]">
                    We are a small, fully remote team passionate about using AI for good. Join us and make a real impact from day one.
                </p>
            </div>

            {/* Why work with us */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
                {[
                    { icon: '🌍', title: '100% Remote', desc: 'Work from anywhere in the world on your own schedule.' },
                    { icon: '⚡', title: 'Move fast', desc: 'Ship meaningful features every sprint. No bureaucracy.' },
                    { icon: '📈', title: 'Equity & Growth', desc: 'Competitive pay, ESOPs, and clear paths to grow.' },
                ].map((v, i) => (
                    <div key={i} className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-7 text-center">
                        <span className="text-3xl">{v.icon}</span>
                        <h3 className="mt-4 font-semibold text-slate-800 dark:text-white">{v.title}</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{v.desc}</p>
                    </div>
                ))}
            </div>

            {/* Open Roles */}
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Open roles</h2>
            <div className="space-y-4">
                {openRoles.map((role, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-6">
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="font-semibold text-slate-800 dark:text-white">{role.title}</h3>
                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${teamColors[role.team]}`}>{role.team}</span>
                            </div>
                            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{role.type}</p>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{role.desc}</p>
                        </div>
                        <Link
                            to="/contact"
                            className="shrink-0 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all active:scale-95"
                        >
                            Apply →
                        </Link>
                    </div>
                ))}
            </div>

            {/* General applications */}
            <div className="mt-12 text-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/40 rounded-3xl p-10">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Don't see your role?</h2>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">We're always looking for talented people. Send us a general application.</p>
                <Link
                    to="/contact"
                    className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full transition-all active:scale-95"
                >
                    Get in Touch
                </Link>
            </div>
        </InfoPageLayout>
    )
}

export default CareersPage
