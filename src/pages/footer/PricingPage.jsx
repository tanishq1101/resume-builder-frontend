import React from 'react'
import InfoPageLayout from '../../components/home/InfoPageLayout'
import { Link } from 'react-router-dom'

const PricingPage = () => {
    const plans = [
        {
            name: 'Free',
            price: '₹0',
            period: 'forever',
            description: 'Perfect for getting started with your first resume.',
            features: [
                '1 active resume',
                'Basic AI suggestions',
                '3 templates',
                'PDF export',
                'Community support',
            ],
            cta: 'Get Started Free',
            highlight: false,
        },
        {
            name: 'Pro',
            price: '₹299',
            period: 'per month',
            description: 'Everything you need to land your dream job.',
            features: [
                'Unlimited resumes',
                'Advanced AI writing assistant',
                'All 20+ templates',
                'Cover letter builder',
                'ATS score checker',
                'Priority email support',
                'LinkedIn profile tips',
            ],
            cta: 'Start Pro – Free 7-day Trial',
            highlight: true,
        },
        {
            name: 'Teams',
            price: '₹799',
            period: 'per user / month',
            description: 'For career coaches, universities, and placement cells.',
            features: [
                'Everything in Pro',
                'Team dashboard',
                'Bulk resume review',
                'Branded templates',
                'Dedicated account manager',
                'Analytics & reporting',
            ],
            cta: 'Contact Sales',
            highlight: false,
        },
    ]

    return (
        <InfoPageLayout>
            {/* Hero */}
            <div className="text-center mb-14">
                <span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-widest">Pricing</span>
                <h1 className="mt-3 text-4xl font-bold text-slate-800 dark:text-white">Simple, transparent pricing</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-[15px]">
                    Start for free. Upgrade when you need more power. No hidden fees, ever.
                </p>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, i) => (
                    <div
                        key={i}
                        className={`relative flex flex-col rounded-3xl p-8 border transition-all ${plan.highlight
                                ? 'bg-green-600 text-white border-green-600 shadow-2xl shadow-green-600/30 scale-105'
                                : 'bg-gray-50 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800 text-slate-800 dark:text-white'
                            }`}
                    >
                        {plan.highlight && (
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full">
                                Most Popular
                            </span>
                        )}
                        <p className={`text-sm font-semibold uppercase tracking-widest ${plan.highlight ? 'text-green-100' : 'text-green-600 dark:text-green-400'}`}>
                            {plan.name}
                        </p>
                        <div className="mt-4 flex items-end gap-1">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            <span className={`text-sm mb-1 ${plan.highlight ? 'text-green-100' : 'text-gray-500 dark:text-gray-400'}`}>/ {plan.period}</span>
                        </div>
                        <p className={`mt-3 text-sm ${plan.highlight ? 'text-green-100' : 'text-gray-500 dark:text-gray-400'}`}>{plan.description}</p>
                        <ul className="mt-6 space-y-3 flex-1">
                            {plan.features.map((f, j) => (
                                <li key={j} className="flex items-center gap-2 text-sm">
                                    <svg className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? 'text-green-200' : 'text-green-600 dark:text-green-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="/contact"
                            className={`mt-8 block text-center font-semibold py-3 rounded-full transition-all active:scale-95 ${plan.highlight
                                    ? 'bg-white text-green-700 hover:bg-green-50'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                        >
                            {plan.cta}
                        </Link>
                    </div>
                ))}
            </div>

            {/* Note */}
            <p className="mt-12 text-center text-sm text-gray-400 dark:text-gray-500">
                All prices in Indian Rupees (INR). Billed monthly or annually. Change or cancel any time.
            </p>
        </InfoPageLayout>
    )
}

export default PricingPage
