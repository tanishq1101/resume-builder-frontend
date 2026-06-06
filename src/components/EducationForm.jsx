import { GraduationCap, Plus, Trash2} from 'lucide-react';
import React from 'react'

const EducationForm = ({data, onChange}) => {

      const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: "",
            gpa_type: "gpa"
        };
        onChange([...data, newEducation]);
    }

    const removeEducation = (index) => {
        const updated= data.filter((_, i) => i !== index);
        onChange(updated);
    }

    const updateEducation = (index, field, value) => {
        const updated= [...data];
        updated[index] = {...updated[index], [field]: value}
        onChange(updated);
    }

  return (
    <div className='space-y-6'>
         <div className='flex items-center justify-between'>
        <div >
            <h3 className='flex items-center gap-2 text-lg font-semibold
             text-gray-900'>Education</h3>
             <p className='text-sm text-gray-600'>Add your education details</p>
        </div>
        <button onClick={addEducation} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 
        rounded-lg hover:bg-green-200 transition-colors'>
            <Plus className='size-4'/>
            Add Education
        </button>
        </div>

        {data.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
                <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
                <p>No Education added yet.</p>
                <p className='text-sm'>Click "Add Education" to get started.</p>
            </div>
        ): (
            <div className='space-y-4'>
                {data.map((education, index)=>(
                    <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>

                    <div className='flex justify-between items-start'>
                        <h4>Education #{index+1}</h4>
                        <button onClick={()=> removeEducation(index)} 
                        className='text-red-500 hover:text-red-700 transition-colors'>
                            <Trash2 className='size-4'/>
                        </button>
                    </div>

                    <div className='grid md:grid-cols-2 gap-3'>
                    <input value={education.institution || ""} 
                    onChange={(e)=> updateEducation(index, "institution", e.target.value)}
                    type="text" placeholder='Institute Name' 
                    className='px-3 py-2 text-sm '/>

                    <input value={education.degree || ""} 
                    onChange={(e)=> updateEducation(index, "degree", e.target.value)}
                    type="text" placeholder='Degree (e.g., B.Tech, Masters)' 
                    className='px-3 py-2 text-sm '/>

                    <input value={education.field|| ""} 
                    onChange={(e)=> updateEducation(index, "field", e.target.value)}
                    type="text" className='px-3 py-2 text-sm ' 
                    placeholder='Field of Study'/>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-gray-500">Graduation Date (completed or expected)</label>
                      <input value={education.graduation_date || ""} 
                      onChange={(e)=> updateEducation(index, "graduation_date", e.target.value)}
                      type="month" className='px-3 py-2 text-sm w-full'/>
                    </div>
                        </div>

                    <div className='space-y-2'>
                      <div className='flex items-center gap-3'>
                        <span className='text-xs font-semibold text-gray-500'>Grading System:</span>
                        <div className='flex rounded-md border border-gray-300 dark:border-gray-700 overflow-hidden'>
                          <button
                            type="button"
                            onClick={() => updateEducation(index, "gpa_type", "gpa")}
                            className={`px-3 py-1 text-xs font-medium transition-colors ${
                              (education.gpa_type || "gpa") === "gpa"
                                ? "bg-green-600 text-white"
                                : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            GPA
                          </button>
                          <button
                            type="button"
                            onClick={() => updateEducation(index, "gpa_type", "percentage")}
                            className={`px-3 py-1 text-xs font-medium transition-colors ${
                              education.gpa_type === "percentage"
                                ? "bg-green-600 text-white"
                                : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            Percentage
                          </button>
                        </div>
                      </div>

                      <input value={education.gpa || ""} 
                      onChange={(e)=> updateEducation(index, "gpa", e.target.value)}
                      type="text" className='px-3 py-2 text-sm w-full' 
                      placeholder={(education.gpa_type || "gpa") === "gpa" ? "GPA (optional, e.g. 3.8/4.0)" : "Percentage (optional, e.g. 85%)"}/> 
                    </div> 
                
                       

                    </div>
                ))}
            </div>
        )}

    </div>
  )
}

export default EducationForm