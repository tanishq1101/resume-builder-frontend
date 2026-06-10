import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "How does the AI Resume Builder work?",
      answer: "Simply input your basic details, experience, projects, or training. You can then use our built-in AI Co-Pilot to instantly enhance your bullet points, polish descriptions, and write professional summaries that capture recruiter attention."
    },
    {
      question: "Can I download my resume as a PDF?",
      answer: "Absolutely! You can download your resume as a clean, print-ready PDF with a single click. Our templates are specifically optimized for pagination, ensuring no text or sections are cut in half across pages."
    },
    {
      question: "What is ATS Mode?",
      answer: "ATS (Applicant Tracking System) Mode converts your resume layout and colors into a simplified, high-contrast, linear format. This ensures that parsing algorithms used by corporate recruiting platforms read and index your profile with 100% accuracy."
    },
    {
      question: "Is it free to use?",
      answer: "Yes! We offer a generous free tier that lets you build, customize, and download your resumes. You can also explore our premium templates and advanced AI generation options to take your job application to the next level."
    },
    {
      question: "How do I customize templates and colors?",
      answer: "In the builder workspace, you can switch between multiple professional layouts (Classic, Double-Column, Creative, Tech, etc.) and select from a expanded palette of 20 premium accent colors. The live preview updates in real-time."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div id="faq" className="w-full max-w-4xl mx-auto px-6 mt-28 scroll-mt-12 dark:bg-gray-950 transition-colors duration-300">
      
      {/* Badge Header */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-400/10 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full px-4 py-1 mb-4">
          <HelpCircle size={14} />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-slate-800 dark:text-gray-150">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500 dark:text-gray-400 text-center mt-2 max-w-md">
          Everything you need to know about building your next professional resume.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              key={index} 
              className={`border rounded-xl transition-all duration-300 bg-white dark:bg-slate-900/40 ${
                isOpen 
                  ? 'border-blue-300 dark:border-blue-800 ring-2 ring-blue-50 dark:ring-blue-900/10 shadow-xs' 
                  : 'border-slate-200 dark:border-gray-800 hover:border-slate-300 dark:hover:border-gray-700'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left text-slate-800 dark:text-gray-200 font-medium cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="pr-4 text-sm sm:text-base">{faq.question}</span>
                <ChevronDown 
                  size={18} 
                  className={`text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-40 border-t border-slate-100 dark:border-gray-800/80' : 'max-h-0'
                }`}
              >
                <div className="p-5 text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed bg-slate-50/50 dark:bg-slate-950/20">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
