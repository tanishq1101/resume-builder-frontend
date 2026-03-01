import React, { useState } from 'react'
import InfoPageLayout from '../../components/home/InfoPageLayout'

// ─── Social Icons ─────────────────────────────────────────────────────────────

const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
)

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
)

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
)

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
)

// ─── Contact Cards ─────────────────────────────────────────────────────────────

const contacts = [
    {
        icon: <EmailIcon />,
        label: 'Email',
        value: 'tks2005homes@gmail.com',
        description: 'For support, partnerships, or just to say hi.',
        href: 'mailto:tks2005homes@gmail.com',
        bg: 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-100 dark:border-red-800/30',
        iconBg: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400',
        hoverBorder: 'hover:border-red-300 dark:hover:border-red-700',
    },
    {
        icon: <LinkedInIcon />,
        label: 'LinkedIn',
        value: 'linkedin.com/in/pratyush-sinha-',
        description: 'Connect with me professionally.',
        href: 'https://www.linkedin.com/in/pratyush-sinha-',
        bg: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800/30',
        iconBg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
        hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-700',
    },
    {
        icon: <InstagramIcon />,
        label: 'Instagram',
        value: '@pratyush.sinha',
        description: 'Daily resume tips, design inspo & more.',
        href: 'https://www.instagram.com/pratyush.sinha',
        bg: 'from-pink-50 to-fuchsia-50 dark:from-pink-900/20 dark:to-fuchsia-900/20 border-pink-100 dark:border-pink-800/30',
        iconBg: 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400',
        hoverBorder: 'hover:border-pink-300 dark:hover:border-pink-700',
    },
    {
        icon: <GithubIcon />,
        label: 'GitHub',
        value: 'github.com/pratyush-sinha',
        description: 'Explore the open-source code behind this project.',
        href: 'https://github.com/pratyush-sinha',
        bg: 'from-gray-50 to-slate-100 dark:from-gray-800/40 dark:to-slate-900/40 border-gray-200 dark:border-gray-700',
        iconBg: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
        hoverBorder: 'hover:border-gray-400 dark:hover:border-gray-500',
    },
]

// ─── Contact Form ──────────────────────────────────────────────────────────────

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [sent, setSent] = useState(false)

    const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = e => {
        e.preventDefault()
        // In production, wire this to an API call or EmailJS
        setSent(true)
    }

    return (
        <InfoPageLayout>
            {/* Hero */}
            <div className="text-center mb-14">
                <span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-widest">Contact</span>
                <h1 className="mt-3 text-4xl font-bold text-slate-800 dark:text-white">Let's get in touch</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-[15px]">
                    Have a question, feedback, or want to collaborate? I'd love to hear from you. Reach out via any of the channels below.
                </p>
            </div>

            {/* Social / Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
                {contacts.map((c, i) => (
                    <a
                        key={i}
                        href={c.href}
                        target={c.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noreferrer"
                        className={`group flex items-start gap-5 rounded-3xl border bg-gradient-to-br ${c.bg} ${c.hoverBorder} p-7 transition-all duration-300 hover:shadow-lg`}
                    >
                        <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl ${c.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                            {c.icon}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">{c.label}</p>
                            <p className="mt-1 font-semibold text-slate-800 dark:text-white text-sm truncate">{c.value}</p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{c.description}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors ml-auto flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M7 7h10v10" />
                        </svg>
                    </a>
                ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-12">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
                <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">Or send a message</span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
            </div>

            {/* Contact Form */}
            {sent ? (
                <div className="text-center py-16 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/40 rounded-3xl">
                    <span className="text-5xl">🎉</span>
                    <h2 className="mt-5 text-2xl font-bold text-slate-800 dark:text-white">Message sent!</h2>
                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                        Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <button
                        onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                        className="mt-6 text-green-600 dark:text-green-400 text-sm font-medium underline"
                    >
                        Send another message
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-8 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5" htmlFor="name">
                                Your Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Pratyush Sinha"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="you@email.com"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5" htmlFor="subject">
                            Subject
                        </label>
                        <input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            placeholder="How can I help you?"
                            value={form.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            placeholder="Write your message here..."
                            value={form.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition resize-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition-all active:scale-95"
                    >
                        Send Message →
                    </button>
                </form>
            )}
        </InfoPageLayout>
    )
}

export default ContactPage
