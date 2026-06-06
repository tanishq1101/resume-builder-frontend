import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import api from '../configs/api';

const ProjectForm = ({data, onChange}) => {
     const { token } = useSelector(state => state.auth);
     const [generatingIndex, setGeneratingIndex] = React.useState(-1);

     const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: "",        
        };
        onChange([...data, newProject]);
    }

    const removeProject = (index) => {
        const updated= data.filter((_, i) => i !== index);
        onChange(updated);
    }

    const updateProject = (index, field, value) => {
        const updated= [...data];
        updated[index] = {...updated[index], [field]: value}
        onChange(updated);
    }

    const generateProjectDescription = async (index) => {
        const project = data[index];
        if (!project.description) {
            toast.error("Please enter a basic project description first.");
            return;
        }

        setGeneratingIndex(index);
        const userContent = project.description;
        const context = `Project Name: ${project.name}, Type: ${project.type}`;

        try {
            const { data: resData } = await api.post(
                '/api/ai/enhance',
                { fieldType: "project", context, userContent },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            updateProject(index, "description", resData.enhancedContent);
            toast.success("Project description enhanced!");
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        } finally {
            setGeneratingIndex(-1);
        }
    };

  return (
    <div>
         <div className='flex items-center justify-between'>
        <div >
            <h3 className='flex items-center gap-2 text-lg font-semibold
             text-gray-900'> Projects </h3>
             <p className='text-sm text-gray-600'>Add your projects</p>
        </div>
        <button onClick={addProject} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 
        rounded-lg hover:bg-green-200 transition-colors'>
            <Plus className='size-4'/>
            Add Project
        </button>
        </div>
           
            <div className='space-y-4 mt-6'>
                {data.map((project, index)=>(
                    <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>

                    <div className='flex justify-between items-start'>
                        <h4>Project #{index+1}</h4>
                        <button onClick={()=> removeProject(index)} 
                        className='text-red-500 hover:text-red-700 transition-colors'>
                            <Trash2 className='size-4'/>
                        </button>
                    </div>

                    <div className='grid gap-3'>
                    <input value={project.name || ""} 
                    onChange={(e)=> updateProject(index, "name", e.target.value)}
                    type="text" placeholder='Project Name' 
                    className='px-3 py-2 text-sm rounded-lg'/>

                    <input value={project.type || ""} 
                    onChange={(e)=> updateProject(index, "type", e.target.value)}
                    type="text" placeholder='Project Type' 
                    className='px-3 py-2 text-sm rounded-lg'/>

                    <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                            <label className='text-xs font-semibold text-gray-500'>Project Description</label>
                            <button 
                                type="button"
                                onClick={() => generateProjectDescription(index)}
                                disabled={generatingIndex === index || !project.name}
                                className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100
                                text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50 cursor-pointer'
                            >
                                {generatingIndex === index ? (
                                    <Loader2 className='w-3 h-3 animate-spin' />
                                ) : (
                                    <Sparkles className='w-3 h-3' />
                                )}
                                Enhance with AI
                            </button>
                        </div>
                        <textarea rows={4} value={project.description || ""} 
                        onChange={(e)=> updateProject(index, "description", e.target.value)}
                        placeholder='Describe your project (technologies used, goals, outcomes)...' 
                        className='px-3 py-2 w-full text-sm rounded-lg resize-none'/>
                    </div>

                   
                        </div>
                       

                    </div>
                ))}
            </div>
     

    </div>
  )
}

export default ProjectForm