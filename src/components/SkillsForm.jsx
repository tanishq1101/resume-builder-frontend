import { Plus, Sparkles, X, Loader2 } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import api from '../configs/api'

const SkillsForm = ({ data = [], onChange, profession, token }) => {

    const [newSkill, setNewSkill] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [loadingSuggestions, setLoadingSuggestions] = useState(false)

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!profession || !token) return;
            try {
                setLoadingSuggestions(true)
                const { data: resData } = await api.post(
                    '/api/ai/suggest-skills',
                    { skills: data, profession },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                if (resData.suggestions) {
                    setSuggestions(resData.suggestions)
                }
            } catch (err) {
                console.error("Error fetching skills suggestions:", err)
            } finally {
                setLoadingSuggestions(false)
            }
        }
        fetchSuggestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profession, token])

    const addSkill = () => {
        const skill = newSkill.trim()
        if (skill && !data.includes(skill)) {
            onChange([...data, skill])
            setNewSkill("")
        }
    }

    const removeSkill = (indexToRemove) => {
        onChange(data.filter((_, index) => index !== indexToRemove))
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    }

    return (
        <div className='space-y-4'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'> Skills </h3>
                <p className='text-sm text-gray-500'> Add your technical and soft skills</p>
            </div>

            <div className='flex gap-2'>
                <input
                    type="text"
                    placeholder='Enter a skill (e.g., JavaScript, Project Management)'
                    className='flex-1 px-3 py-2 text-sm border rounded-lg'
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button
                    className='flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white 
                    rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={addSkill}
                    disabled={!newSkill.trim()}
                >
                    <Plus className='size-4' /> Add
                </button>
            </div>

            {data.length > 0 ? (
                <div className='flex flex-wrap gap-2'>
                    {data.map((skill, index) => (
                        <span key={index}
                            className='flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
                            {skill}
                            <button onClick={() => removeSkill(index)}
                                className='ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors'>
                                <X className='w-3 h-3' />
                            </button>
                        </span>
                    ))}
                </div>
            ) : (
                <div className='text-center py-6 text-gray-500'>
                    <Sparkles className='w-10 h-10 mx-auto mb-2 text-gray-300' />
                    <p>No skills added yet.</p>
                    <p className='text-sm'>Add your technical and soft skills above.</p>
                </div>
            )}

            {profession && (
                <div className='bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/50 p-4 rounded-lg space-y-2'>
                    <div className='flex items-center justify-between'>
                        <h4 className='text-xs font-semibold text-purple-800 dark:text-purple-300 flex items-center gap-1.5'>
                            <Sparkles className='size-3 text-purple-600 dark:text-purple-400' />
                            AI Suggested Skills for {profession}
                        </h4>
                        {loadingSuggestions && <Loader2 className='size-3 animate-spin text-purple-600 dark:text-purple-400' />}
                    </div>
                    {suggestions.length > 0 ? (
                        <div className='flex flex-wrap gap-1.5 pt-1'>
                            {suggestions
                                .filter(skill => !data.includes(skill))
                                .map((skill, index) => (
                                    <button 
                                        key={index} 
                                        onClick={() => onChange([...data, skill])}
                                        className='text-[11px] px-2 py-0.5 bg-white dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-950/50 border border-purple-200 dark:border-purple-900/50 text-purple-700 dark:text-purple-300 rounded-md cursor-pointer transition-colors'
                                    >
                                        + {skill}
                                    </button>
                                ))
                            }
                        </div>
                    ) : (
                        <p className='text-[11px] text-purple-600/70 dark:text-purple-400/70'>
                            {loadingSuggestions ? 'Loading AI recommendations...' : 'No suggestions available or all suggested skills added.'}
                        </p>
                    )}
                </div>
            )}

            <div className='bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 p-3 rounded-lg'>
                <p className='text-sm text-blue-800 dark:text-blue-300'>
                    <strong>Tip: </strong>
                    Add 6-10 relevant skills. Include both technical skills (languages, tools) and soft skills.
                </p>
            </div>
        </div>
    )
}

export default SkillsForm
