import React from 'react'
import InfoPageLayout from '../../components/home/InfoPageLayout'
import { Link } from 'react-router-dom'

const AffiliatePage = () => {
    const steps = [
        {
            number: '01',
            title: 'Sign Up',
            desc: 'Create a free affiliate account in under 2 minutes. No technical setup required.',
        },
        {
            number: '02',
            title: 'Share Your Link',
            desc: 'Get your unique referral link and share it on LinkedIn, YouTube, blogs, or anywhere your audience hangs out.',
        },
        {
            number: '03',
            title: 'Earn Commission',
            desc: 'Earn 30% recurring commission on every paying subscriber you refer — every single month.',
        },
    ]

    const perks = [
        '30% recurring monthly commissions',
        'Real-time dashboard to track earnings',
        'Custom referral links & banners',
        'Dedicated affiliate manager',
        'Payouts via UPI / PayPal / Bank Transfer',
        'No cap on earnings',
    ]

    return (
        <InfoPageLayout>
            {/* Hero */}
            <div className="text-center mb-14">
                <span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-widest">Affiliate Program</span>
                <h1 className="mt-3 text-4xl font-bold text-slate-800 dark:text-white">Earn while helping others level up</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-[15px]">
                    Join our affiliate program and earn <span className="text-green-600 dark:text-green-400 font-semibold">30% recurring commission</span> for every person you refer. Zero cost to join.
                </p>
                <Link
                    to="/contact"
                    className="mt-8 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full transition-all active:scale-95"
                >
                    Apply to Become an Affiliate
                </Link>
            </div>

            {/* How it works */}
            <div className="mb-14">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white text-center mb-10">How it works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-8 text-center"
                        >
                            <span className="text-4xl font-black text-green-600 dark:text-green-400">{step.number}</span>
                            <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">{step.title}</h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Perks */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/40 rounded-3xl p-10">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">What you get</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {perks.map((perk, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                            <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {perk}
                        </li>
                    ))}
                </ul>
            </div>
        </InfoPageLayout>
    )
}

export default AffiliatePage
