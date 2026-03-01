import React from 'react'
import InfoPageLayout from '../../components/home/InfoPageLayout'

const PrivacyPage = () => {
    const sections = [
        {
            title: '1. Information We Collect',
            body: `We collect information you provide directly to us, including:
• Account information (name, email address, password)
• Resume content (work history, education, skills, personal summaries)
• Usage data (pages visited, features used, session duration)
• Device information (browser type, IP address, operating system)

We do not collect or store payment card details — payments are handled by trusted third-party processors.`,
        },
        {
            title: '2. How We Use Your Information',
            body: `We use the information we collect to:
• Provide, maintain, and improve our services
• Personalise your experience and deliver AI-powered suggestions
• Send you product updates, newsletters, and promotional messages (you can opt out at any time)
• Respond to your comments, questions, and support requests
• Monitor and analyse usage to ensure security and reliability`,
        },
        {
            title: '3. Sharing Your Information',
            body: `We do not sell, rent, or share your personal information with third parties for their marketing purposes. We may share your information with:
• Service providers (hosting, analytics, email delivery) who process it on our behalf under strict data agreements
• Law enforcement or government authorities, when required by applicable law
• A successor entity in the event of a merger, acquisition, or sale of assets`,
        },
        {
            title: '4. Data Retention',
            body: `We retain your account and resume data for as long as your account is active. You may delete your account at any time through the account settings page, which will permanently delete all associated data within 30 days.`,
        },
        {
            title: '5. Security',
            body: `We use industry-standard encryption (TLS/HTTPS) for all data in transit and AES-256 encryption for data at rest. Access to production systems is restricted and audited. However, no method of internet transmission is 100% secure, and we encourage you to use a strong, unique password.`,
        },
        {
            title: '6. Cookies',
            body: `We use cookies and similar tracking technologies to maintain your session, remember your preferences, and analyse usage patterns. You can control cookies through your browser settings, though disabling them may affect some functionality.`,
        },
        {
            title: '7. Your Rights',
            body: `Depending on your location, you may have the right to:
• Access the personal data we hold about you
• Correct inaccurate data
• Request deletion of your data
• Object to or restrict processing
• Data portability

To exercise any of these rights, contact us at tks2005homes@gmail.com.`,
        },
        {
            title: '8. Changes to This Policy',
            body: `We may update this Privacy Policy from time to time. We will notify you of significant changes by email or via an in-app notice. Continued use of the service after changes constitutes acceptance of the revised policy.`,
        },
    ]

    return (
        <InfoPageLayout>
            {/* Hero */}
            <div className="text-center mb-14">
                <span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-widest">Legal</span>
                <h1 className="mt-3 text-4xl font-bold text-slate-800 dark:text-white">Privacy Policy</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-[15px]">
                    Last updated: <strong className="text-slate-700 dark:text-gray-300">March 1, 2026</strong>
                </p>
                <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm">
                    We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.
                </p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
                {sections.map((s, i) => (
                    <div key={i} className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-8">
                        <h2 className="text-[15px] font-semibold text-slate-800 dark:text-white mb-3">{s.title}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">{s.body}</p>
                    </div>
                ))}
            </div>

            <p className="mt-10 text-center text-sm text-gray-400 dark:text-gray-500">
                Questions? Email us at{' '}
                <a href="mailto:tks2005homes@gmail.com" className="text-green-600 dark:text-green-400 underline">
                    tks2005homes@gmail.com
                </a>
            </p>
        </InfoPageLayout>
    )
}

export default PrivacyPage
