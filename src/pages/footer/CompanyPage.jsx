import React from 'react'
import InfoPageLayout from '../../components/home/InfoPageLayout'

const CompanyPage = () => {
    const values = [
        { icon: '🚀', title: 'Innovation First', desc: 'We push the boundaries of AI to make career tools smarter and more accessible every day.' },
        { icon: '🤝', title: 'People Centred', desc: 'Every feature is built with the job-seeker in mind, from a fresh graduate to a seasoned professional.' },
        { icon: '🔒', title: 'Trust & Privacy', desc: 'Your data is yours. We are committed to transparency, security, and giving you control.' },
        { icon: '🌱', title: 'Continuous Growth', desc: 'We believe in lifelong learning — for our users and for ourselves as a team.' },
    ]

    return (
        <InfoPageLayout>
            {/* Hero */}
            <div className="text-center mb-14">
                <span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-widest">Our Company</span>
                <h1 className="mt-3 text-4xl font-bold text-slate-800 dark:text-white">Building the future of career tools</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-[15px]">
                    AI Resume Builder was founded with a single mission: to democratise access to world-class resume and career tools for every job-seeker, everywhere.
                </p>
            </div>

            {/* Story */}
            <div className="mb-14 rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-10">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Our story</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-loose">
                    We started as a small team of engineers and designers who were tired of seeing great candidates rejected because their resumes didn't reflect their true potential. Traditional resume builders were clunky, expensive, and design-heavy without substance.
                </p>
                <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-loose">
                    So we built something different: an AI-powered resume builder that understands job descriptions, highlights your strengths, and coaches you to tell a compelling career story — in minutes, not hours.
                </p>
                <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-loose">
                    Today, thousands of job-seekers across India and beyond use our platform to land interviews at top companies. We're just getting started.
                </p>
            </div>

            {/* Values */}
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white text-center mb-10">Our values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {values.map((v, i) => (
                        <div key={i} className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-8">
                            <span className="text-3xl">{v.icon}</span>
                            <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">{v.title}</h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </InfoPageLayout>
    )
}

export default CompanyPage
