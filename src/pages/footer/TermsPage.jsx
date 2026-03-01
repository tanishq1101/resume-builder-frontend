import React from 'react'
import InfoPageLayout from '../../components/home/InfoPageLayout'

const TermsPage = () => {
    const sections = [
        {
            title: '1. Acceptance of Terms',
            body: `By accessing or using AI Resume Builder ("the Service"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the Service.`,
        },
        {
            title: '2. Eligibility',
            body: `You must be at least 13 years old to use this Service. By using it, you represent that you meet this requirement and that any information you provide is accurate and truthful.`,
        },
        {
            title: '3. Your Account',
            body: `You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. Notify us immediately at tks2005homes@gmail.com if you suspect unauthorised access. We reserve the right to terminate accounts that violate these Terms.`,
        },
        {
            title: '4. Acceptable Use',
            body: `You agree not to:
• Use the Service for any unlawful or fraudulent purpose
• Upload content that is offensive, defamatory, or infringes third-party intellectual property rights
• Attempt to reverse-engineer, scrape, or disrupt the Service
• Impersonate another person or entity
• Use automated bots or scripts to access the Service without prior written permission`,
        },
        {
            title: '5. Intellectual Property',
            body: `The Service, including its source code, design, branding, and AI models, is the exclusive property of AI Resume Builder. The content you create (your resumes) remains your intellectual property. You grant us a limited, non-exclusive licence to store and process your content solely to provide the Service.`,
        },
        {
            title: '6. Subscription & Billing',
            body: `Paid plans are billed Monthly or Annually in advance. All fees are non-refundable except where required by law. You may cancel your subscription at any time; cancellation takes effect at the end of the current billing period. We may change pricing with 30 days' notice.`,
        },
        {
            title: '7. Disclaimer of Warranties',
            body: `The Service is provided "AS IS" without warranties of any kind, express or implied. We do not guarantee that using our Service will result in job interviews or employment. AI-generated content is a suggestion tool and should be reviewed by you before submission.`,
        },
        {
            title: '8. Limitation of Liability',
            body: `To the fullest extent permitted by law, AI Resume Builder shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, the Service. Our total liability to you for any claim shall not exceed the amount you paid us in the preceding 12 months.`,
        },
        {
            title: '9. Governing Law',
            body: `These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in India.`,
        },
        {
            title: '10. Changes to Terms',
            body: `We may update these Terms at any time. We will notify you of material changes via email or an in-app notification. Continued use of the Service after the effective date constitutes your acceptance of the revised Terms.`,
        },
    ]

    return (
        <InfoPageLayout>
            {/* Hero */}
            <div className="text-center mb-14">
                <span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-widest">Legal</span>
                <h1 className="mt-3 text-4xl font-bold text-slate-800 dark:text-white">Terms of Service</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-[15px]">
                    Last updated: <strong className="text-slate-700 dark:text-gray-300">March 1, 2026</strong>
                </p>
                <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm">
                    Please read these terms carefully before using AI Resume Builder. By using our service you agree to be bound by these terms.
                </p>
            </div>

            {/* Sections */}
            <div className="space-y-6">
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

export default TermsPage
