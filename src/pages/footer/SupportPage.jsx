import React from 'react'
import InfoPageLayout from '../../components/home/InfoPageLayout'
import { Link } from 'react-router-dom'

const SupportPage = () => {
    const faqs = [
        {
            q: 'How do I create my first resume?',
            a: 'Simply sign up, click "New Resume" on your dashboard, fill in your details section by section, and let our AI polish your content. Download when ready!'
        },
        {
            q: 'Can I create multiple resumes?',
            a: 'Yes! You can create and manage multiple resumes for different roles or industries, all from a single dashboard.'
        },
        {
            q: 'How does the AI writing assistance work?',
            a: 'Our AI (powered by Google Gemini) analyses your input and suggests stronger, ATS-friendly bullet points, summaries, and skill descriptions tailored to your target role.'
        },
        {
            q: 'Is my data secure?',
            a: 'Absolutely. All data is encrypted in transit and at rest. We never sell your personal information. See our Privacy Policy for full details.'
        },
        {
            q: 'Can I download my resume as a PDF?',
            a: 'Yes — hit the download button inside the resume builder and you will get a clean, printer-ready PDF of your resume.'
        },
        {
            q: 'What if I need help I can\'t find here?',
            a: 'Reach out to us directly via the Contact page. We typically respond within 24 hours on business days.'
        },
    ]

    return (
        <InfoPageLayout>
            {/* Hero */}
            <div className="text-center mb-14">
                <span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-widest">Support Center</span>
                <h1 className="mt-3 text-4xl font-bold text-slate-800 dark:text-white">How can we help you?</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-[15px]">
                    Everything you need to know about the AI Resume Builder. Can't find an answer? <Link to="/contact" className="text-green-600 dark:text-green-400 underline">Contact us.</Link>
                </p>
            </div>

            {/* FAQ */}
            <div className="space-y-6">
                {faqs.map((item, i) => (
                    <div
                        key={i}
                        className="border border-gray-100 dark:border-gray-800 rounded-2xl p-6 bg-gray-50 dark:bg-gray-900/60"
                    >
                        <h3 className="font-semibold text-slate-800 dark:text-white text-[15px]">{item.q}</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.a}</p>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/40 rounded-3xl p-10">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Still need help?</h2>
                <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">Our team is ready to assist you with anything.</p>
                <Link
                    to="/contact"
                    className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full transition-all active:scale-95"
                >
                    Contact Support
                </Link>
            </div>
        </InfoPageLayout>
    )
}

export default SupportPage
