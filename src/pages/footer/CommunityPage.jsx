import React from 'react'
import InfoPageLayout from '../../components/home/InfoPageLayout'
import { Link } from 'react-router-dom'

const CommunityPage = () => {
    const channels = [
        {
            icon: '💬',
            name: 'Discord Server',
            desc: 'Join 2,500+ job-seekers in our Discord. Share resumes for peer review, ask questions, and get real-time help.',
            cta: 'Join Discord',
            href: 'https://discord.com',
        },
        {
            icon: '🔗',
            name: 'LinkedIn Group',
            desc: 'Connect with our LinkedIn community for weekly career tips, job leads, and networking opportunities.',
            cta: 'Join Group',
            href: 'https://linkedin.com/in/pratyush-sinha-',
        },
        {
            icon: '📸',
            name: 'Instagram',
            desc: 'Follow us on Instagram for daily resume tips, before-and-after makeovers, and motivational career content.',
            cta: 'Follow Us',
            href: 'https://instagram.com',
        },
    ]

    return (
        <InfoPageLayout>
            {/* Hero */}
            <div className="text-center mb-14">
                <span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-widest">Community</span>
                <h1 className="mt-3 text-4xl font-bold text-slate-800 dark:text-white">You're not job-hunting alone</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-[15px]">
                    Connect with thousands of job-seekers, career coaches, and industry pros who are on the same journey as you.
                </p>
            </div>

            {/* Channels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                {channels.map((c, i) => (
                    <div key={i} className="flex flex-col rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-8 text-center">
                        <span className="text-4xl">{c.icon}</span>
                        <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">{c.name}</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">{c.desc}</p>
                        <a
                            href={c.href}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all active:scale-95"
                        >
                            {c.cta} →
                        </a>
                    </div>
                ))}
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/40 rounded-3xl p-10">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white text-center mb-10">Our community in numbers</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { num: '2,500+', label: 'Active Members' },
                        { num: '500+', label: 'Resumes Reviewed' },
                        { num: '120+', label: 'Jobs Landed' },
                        { num: '4.9★', label: 'Community Rating' },
                    ].map((stat, i) => (
                        <div key={i}>
                            <p className="text-3xl font-black text-green-600 dark:text-green-400">{stat.num}</p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </InfoPageLayout>
    )
}

export default CommunityPage
