import React from 'react'
import InfoPageLayout from '../../components/home/InfoPageLayout'

const posts = [
    {
        tag: 'Career Tips',
        title: '10 Resume Mistakes That Will Get You Rejected Instantly',
        excerpt: 'Even experienced professionals make these common resume mistakes. Learn what to avoid and how our AI catches them automatically.',
        date: 'Feb 20, 2026',
        readTime: '5 min read',
    },
    {
        tag: 'AI & Tech',
        title: 'How AI is Changing the Way We Write Resumes',
        excerpt: 'From automated keyword optimisation to tone-matching, here\'s a deep dive into how generative AI is transforming the resume writing process.',
        date: 'Feb 12, 2026',
        readTime: '7 min read',
    },
    {
        tag: 'Interview Prep',
        title: 'The STAR Method: Structuring Your Interview Answers',
        excerpt: 'Situation, Task, Action, Result — a proven framework for answering behavioural interview questions that leaves a lasting impression.',
        date: 'Feb 5, 2026',
        readTime: '4 min read',
    },
    {
        tag: 'ATS Tips',
        title: 'What is an ATS and How to Beat It',
        excerpt: 'Most applications are filtered by software before a human ever sees them. Here\'s how to optimise your resume to pass ATS algorithms.',
        date: 'Jan 28, 2026',
        readTime: '6 min read',
    },
    {
        tag: 'Career Tips',
        title: 'Crafting a LinkedIn Profile that Attracts Recruiters',
        excerpt: 'Your LinkedIn profile is your digital resume. Learn the exact sections recruiters look at first and how to make yours stand out.',
        date: 'Jan 15, 2026',
        readTime: '5 min read',
    },
    {
        tag: 'Skill Building',
        title: 'Top 10 In-Demand Skills for 2026 and How to Learn Them',
        excerpt: 'The job market is evolving fast. Here are the skills hiring managers are searching for and the best (often free) resources to acquire them.',
        date: 'Jan 5, 2026',
        readTime: '8 min read',
    },
]

const tagColors = {
    'Career Tips': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    'AI & Tech': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    'Interview Prep': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
    'ATS Tips': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    'Skill Building': 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
}

const BlogsPage = () => {
    return (
        <InfoPageLayout>
            {/* Hero */}
            <div className="text-center mb-14">
                <span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-widest">Blog</span>
                <h1 className="mt-3 text-4xl font-bold text-slate-800 dark:text-white">Career insights & tips</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-[15px]">
                    Expert advice on resumes, interviews, AI tools, and everything in between — to help you land your next job faster.
                </p>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post, i) => (
                    <div
                        key={i}
                        className="flex flex-col rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-7 hover:shadow-md dark:hover:shadow-black/20 transition-shadow cursor-pointer group"
                    >
                        <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${tagColors[post.tag] || 'bg-gray-100 text-gray-600'}`}>
                            {post.tag}
                        </span>
                        <h3 className="mt-4 text-[15px] font-semibold text-slate-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors leading-snug">
                            {post.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">{post.excerpt}</p>
                        <div className="mt-5 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                ))}
            </div>
        </InfoPageLayout>
    )
}

export default BlogsPage
