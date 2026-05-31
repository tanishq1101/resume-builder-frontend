import React, { useState } from 'react'
import { Sparkles, ArrowRight, Check, CheckCircle2, AlertTriangle, HelpCircle, Copy, Download, RefreshCw, ChevronRight } from 'lucide-react'
import api from '../configs/api'
import toast from 'react-hot-toast'

const AiToolsForm = ({ resumeData, setResumeData, token, resumeId }) => {
  const [activeSubTab, setActiveSubTab] = useState('ats') // 'ats' | 'tailor' | 'letter'
  const [jobDescription, setJobDescription] = useState('')
  
  // ATS Score state
  const [atsReport, setAtsReport] = useState(null)
  const [isAuditing, setIsAuditing] = useState(false)

  // Tailor state
  const [isTailoring, setIsTailoring] = useState(false)
  const [tailoredPreview, setTailoredPreview] = useState(null) // holds temporary tailored changes

  // Cover Letter state
  const [coverLetter, setCoverLetter] = useState(resumeData.cover_letter || '')
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false)

  // ATS score auditor
  const runAtsAudit = async () => {
    setIsAuditing(true)
    try {
      const { data } = await api.post(
        '/api/ai/analyze',
        { resumeId, resumeData },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setAtsReport(data)
      // Save the score in local resume state so user sees it
      setResumeData(prev => ({ ...prev, ats_score: data.score }))
      toast.success('ATS Audit complete!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to run ATS Audit')
    } finally {
      setIsAuditing(false)
    }
  }

  // Tailor resume
  const runTailoring = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please paste a job description first')
      return
    }
    setIsTailoring(true)
    try {
      const { data } = await api.post(
        '/api/ai/tailor',
        { resumeId, resumeData, jobDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTailoredPreview(data)
      toast.success('Resume tailored! Review changes below.')
    } catch (error) {
      console.error(error)
      toast.error('Failed to tailor resume')
    } finally {
      setIsTailoring(false)
    }
  }

  // Apply tailored content
  const applyTailoredContent = () => {
    if (!tailoredPreview) return

    setResumeData(prev => {
      // Map experience from preview back into our experiences matching indices/companies
      const updatedExperience = prev.experience.map((exp, index) => {
        const tailoredExp = tailoredPreview.experience?.[index]
        if (tailoredExp) {
          return {
            ...exp,
            description: tailoredExp.description
          }
        }
        return exp
      })

      return {
        ...prev,
        professional_summary: tailoredPreview.professional_summary,
        experience: updatedExperience
      }
    })

    setTailoredPreview(null)
    toast.success('Tailored changes applied to resume fields!')
  }

  // Generate Cover Letter
  const runCoverLetterGenerator = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please paste a job description first')
      return
    }
    setIsGeneratingLetter(true)
    try {
      const { data } = await api.post(
        '/api/ai/cover-letter',
        { resumeId, resumeData, jobDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCoverLetter(data.coverLetter)
      setResumeData(prev => ({ ...prev, cover_letter: data.coverLetter }))
      toast.success('Cover letter generated!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to generate cover letter')
    } finally {
      setIsGeneratingLetter(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const downloadCoverLetter = () => {
    const element = document.createElement("a");
    const file = new Blob([coverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${resumeData.title || 'Resume'}_Cover_Letter.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          <Sparkles className="size-5 text-purple-600 dark:text-purple-400" />
          AI Co-Pilot & Tools
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enhance your application materials with advanced AI tools
        </p>
      </div>

      {/* Sub Tabs Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveSubTab('ats')}
          className={`flex-1 py-2 text-center text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
            activeSubTab === 'ats'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          ATS Audit
        </button>
        <button
          onClick={() => setActiveSubTab('tailor')}
          className={`flex-1 py-2 text-center text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
            activeSubTab === 'tailor'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Tailor Resume
        </button>
        <button
          onClick={() => setActiveSubTab('letter')}
          className={`flex-1 py-2 text-center text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
            activeSubTab === 'letter'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Cover Letter
        </button>
      </div>

      {/* Sub Tab Contents */}
      <div className="space-y-4">
        {/* ATS AUDIT VIEW */}
        {activeSubTab === 'ats' && (
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/50 p-4 rounded-lg flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-300">Evaluate ATS Match</h4>
                <p className="text-xs text-purple-700 dark:text-purple-400">
                  Analyze your content's structure, spelling, vocabulary, and keywords.
                </p>
              </div>
              <button
                disabled={isAuditing}
                onClick={runAtsAudit}
                className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
              >
                {isAuditing ? <RefreshCw className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
                {isAuditing ? 'Auditing...' : 'Run Audit'}
              </button>
            </div>

            {atsReport ? (
              <div className="space-y-4">
                {/* Score Circle */}
                <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div 
                    className="size-16 rounded-full flex flex-col items-center justify-center text-white font-bold text-lg shadow-sm"
                    style={{
                      backgroundColor: atsReport.score >= 85 ? '#16a34a' : atsReport.score >= 70 ? '#d97706' : '#dc2626'
                    }}
                  >
                    {atsReport.score}
                    <span className="text-[9px] font-normal leading-none">/ 100</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Overall ATS Score</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {atsReport.score >= 85 ? 'Excellent work! Your resume is highly compatible with tracking software.' : atsReport.score >= 70 ? 'Good start. Some key improvements could boost your recruiter visibility.' : 'Needs modification. The AI detected several formatting or keyword issues.'}
                    </p>
                  </div>
                </div>

                {/* Audit breakdown lists */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50/50 dark:bg-green-950/10 border border-green-100 dark:border-green-900/30 rounded-lg">
                    <h6 className="text-xs font-bold text-green-800 dark:text-green-400 flex items-center gap-1 mb-2">
                      <CheckCircle2 className="size-3.5 text-green-600" />
                      Strengths
                    </h6>
                    <ul className="text-xs text-green-900 dark:text-green-300 list-disc pl-4 space-y-1">
                      {atsReport.strengths?.map((str, i) => <li key={i}>{str}</li>)}
                    </ul>
                  </div>

                  <div className="p-3 bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-lg">
                    <h6 className="text-xs font-bold text-red-800 dark:text-red-400 flex items-center gap-1 mb-2">
                      <AlertTriangle className="size-3.5 text-red-600" />
                      Weaknesses
                    </h6>
                    <ul className="text-xs text-red-900 dark:text-red-300 list-disc pl-4 space-y-1">
                      {atsReport.weaknesses?.map((wk, i) => <li key={i}>{wk}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 rounded-lg space-y-2">
                  <h6 className="text-xs font-bold text-blue-800 dark:text-blue-400 flex items-center gap-1">
                    <HelpCircle className="size-3.5 text-blue-600" />
                    Actionable Recommendations
                  </h6>
                  <ul className="text-xs text-blue-950 dark:text-blue-300 list-decimal pl-4 space-y-1.5">
                    {atsReport.recommendations?.map((rec, i) => <li key={i}>{rec}</li>)}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-500">
                <HelpCircle className="size-10 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Click "Run Audit" to analyze your resume content.</p>
              </div>
            )}
          </div>
        )}

        {/* TAILOR RESUME VIEW */}
        {activeSubTab === 'tailor' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Target Job Description</label>
              <textarea
                rows={5}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description (responsibilities, skills, requirements) here..."
                className="w-full text-xs p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                disabled={isTailoring || !jobDescription.trim()}
                onClick={runTailoring}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 text-xs font-semibold transition-all cursor-pointer"
              >
                {isTailoring ? <RefreshCw className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
                {isTailoring ? 'Analyzing & Tailoring...' : 'Optimize Resume for Job'}
              </button>
            </div>

            {tailoredPreview && (
              <div className="border border-purple-200 dark:border-purple-900 rounded-lg overflow-hidden bg-purple-50/10 dark:bg-purple-950/5">
                <div className="bg-purple-50 dark:bg-purple-950/30 p-3 border-b border-purple-200 dark:border-purple-900 flex justify-between items-center">
                  <span className="text-xs font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1">
                    <CheckCircle2 className="size-3.5 text-purple-600" />
                    Tailored Content Ready
                  </span>
                  <button
                    onClick={applyTailoredContent}
                    className="flex items-center gap-1 text-[10px] bg-purple-600 hover:bg-purple-700 text-white px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors"
                  >
                    <Check className="size-3" /> Apply to Resume
                  </button>
                </div>
                <div className="p-4 space-y-4 text-xs">
                  <div>
                    <h6 className="font-bold text-purple-800 dark:text-purple-400 mb-1">Tailored Professional Summary:</h6>
                    <p className="bg-white dark:bg-gray-800 p-2.5 rounded border border-gray-200 dark:border-gray-700 leading-relaxed text-gray-700 dark:text-gray-300">
                      {tailoredPreview.professional_summary}
                    </p>
                  </div>
                  <div>
                    <h6 className="font-bold text-purple-800 dark:text-purple-400 mb-1">Tailored Work Experience Bullet Points:</h6>
                    <div className="space-y-3">
                      {tailoredPreview.experience?.map((exp, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-2.5 rounded border border-gray-200 dark:border-gray-700 space-y-1">
                          <p className="font-semibold text-gray-900 dark:text-gray-100">{exp.position} at {exp.company}</p>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* COVER LETTER VIEW */}
        {activeSubTab === 'letter' && (
          <div className="space-y-4">
            {!coverLetter && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Target Job Description (Required)</label>
                  <textarea
                    rows={4}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the target job description here to generate a customized cover letter..."
                    className="w-full text-xs p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                  />
                </div>
                <button
                  disabled={isGeneratingLetter || !jobDescription.trim()}
                  onClick={runCoverLetterGenerator}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 text-xs font-semibold transition-all cursor-pointer"
                >
                  {isGeneratingLetter ? <RefreshCw className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
                  {isGeneratingLetter ? 'Generating Cover Letter...' : 'Generate Cover Letter'}
                </button>
              </div>
            )}

            {coverLetter && (
              <div className="space-y-3">
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => copyToClipboard(coverLetter)}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md text-[10px] font-semibold cursor-pointer transition-colors"
                  >
                    <Copy className="size-3" /> Copy
                  </button>
                  <button
                    onClick={downloadCoverLetter}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md text-[10px] font-semibold cursor-pointer transition-colors"
                  >
                    <Download className="size-3" /> Download
                  </button>
                  <button
                    onClick={() => setCoverLetter('')}
                    className="flex items-center gap-1 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-md text-[10px] font-semibold cursor-pointer transition-colors"
                  >
                    Regenerate
                  </button>
                </div>

                <textarea
                  rows={14}
                  value={coverLetter}
                  onChange={(e) => {
                    setCoverLetter(e.target.value)
                    setResumeData(prev => ({ ...prev, cover_letter: e.target.value }))
                  }}
                  className="w-full text-xs font-mono p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg leading-relaxed focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AiToolsForm
