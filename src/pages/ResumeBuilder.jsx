import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User, Award, BookOpen, Heart } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import AiToolsForm from '../components/AiToolsForm'
import AchievementsForm from '../components/AchievementsForm'
import TrainingForm from '../components/TrainingForm'
import InterestsForm from '../components/InterestsForm'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import html2canvas from 'html2canvas-pro'
const ResumeBuilder = () => {

  const {resumeId} = useParams()
  const {token} = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState( {
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    key_achievements: [],
    training_courses: [],
    interests: [],
    template: "classic",
    accentColor: "#3B82F6",
    public: false
  })

  const loadExistingResumeData = async () => { 
    try {
      const {data} = await api.get(`/api/resumes/get/${resumeId}`, {headers: {
        Authorization: `Bearer ${token}` }})
        if(data.resume) {
          setResumeData(data.resume)
          document.title = data.resume.title
        }

    } catch (error) {
      console.log(error.message)
    }
  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)
  const [atsMode, setAtsMode] = useState(false)

  const sections = [
    { id: 'personal', name: 'Personal Information', icon: User},
    { id: 'summary', name: 'Summary', icon: FileText},
    { id: 'experience', name: 'Experience', icon: Briefcase},
    { id: 'education', name: 'Education', icon: GraduationCap},
    { id: 'projects', name: 'Projects', icon: FolderIcon},
    { id: 'skills', name: 'Skills', icon: Sparkles},
    { id: 'achievements', name: 'Achievements', icon: Award},
    { id: 'training', name: 'Training / Courses', icon: BookOpen},
    { id: 'interests', name: 'Interests', icon: Heart},
    { id: 'ai-tools', name: 'AI Co-Pilot', icon: Sparkles},
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(() => {
      loadExistingResumeData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


const changeResumeVisibility = async () => {
  try {
    const formData = new FormData(); // <-- FIXED (Capital F)
    formData.append("resumeId", resumeId);
    formData.append("resumeData", JSON.stringify({ public: !resumeData.public }));

    const { data } = await api.put("/api/resumes/update", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setResumeData(prev => ({ ...prev, public: !prev.public }));
    toast.success(data.message);

  } catch (error) {
    console.error("Error changing visibility:", error);
    toast.error("Failed to update resume visibility");
  }
};

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;

    if(navigator.share) {
      navigator.share({url: resumeUrl,text: "My Resume",})
    }
    else {
      alert('Share is not supported in this browser.')
    }
    
  }

  const downloadResume = async () => {
    try {
      toast.loading("Generating PDF...", { id: "pdf-gen" });
      
      // Set waiting cursor and yield to browser event loop to repaint UI & show toast
      document.body.style.cursor = 'wait';
      await new Promise((resolve) => setTimeout(resolve, 300));

      window.html2canvas = html2canvas;

      const html2pdf = await new Promise((resolve, reject) => {
        if (window.html2pdf) {
          resolve(window.html2pdf);
          return;
        }
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
        script.onload = () => resolve(window.html2pdf);
        script.onerror = () => reject(new Error("Failed to load PDF library"));
        document.body.appendChild(script);
      });

      const element = document.getElementById("resume-preview");
      if (!element) {
        toast.error("Resume content not found");
        return;
      }

      const opt = {
        margin: 0.15,
        filename: `${resumeData.title || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("PDF Downloaded!");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF. Falling back to browser print.");
      window.print();
    } finally {
      document.body.style.cursor = 'default';
      toast.dismiss("pdf-gen");
      // Remove any lingering html2pdf container or elements
      const elements = document.querySelectorAll('.html2pdf__container');
      elements.forEach(el => el.remove());
      // Restore standard body/html styling if altered
      document.body.style.opacity = '';
      document.body.style.visibility = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }

 const saveResume = async () => { 
  try {
    let updatedResumeData = structuredClone(resumeData);

    // remove image if object
    if (typeof resumeData.personal_info.image === "object") {
      delete updatedResumeData.personal_info.image;
    }

    const formData = new FormData();
    formData.append("resumeId", resumeId);
    formData.append("resumeData", JSON.stringify(updatedResumeData));

    if (removeBackground) {
      formData.append("removeBackground", "yes");
    }

    if (typeof resumeData.personal_info.image === "object") {
      formData.append("image", resumeData.personal_info.image);
    }

    const { data } = await api.put("/api/resumes/update", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setResumeData(data.resume);
    toast.success(data.message);

  } catch (error) {
    console.error("Error saving resume:", error);
  }
};



  return (
    <div>

      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to={`/app`} className='inline-flex gap-2 items-center text-slate-500
        hover:text-slate-700 transition-all'>
        <ArrowLeftIcon className='size-4'/> Back to Dashboard
         </Link>
      </div>
        
      <div className='max-w-7xl mx-auto px-4 pb-8'> 

        <div className='grid lg:grid-cols-12 gap-8'>
        {/*Left Panel -form*/}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
          {/* Progress bar using activeSectionIndex */}
          <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
          <hr className='absolute top-0 left-0 h-1 bg-linear-to-r from-green-500 to-green-600
          border-none transition-all duration-2000' 
          style={{width:`${activeSectionIndex *100 / (sections.length-1)}%` }}/>

          {/* Section Navigation */}
          <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
              
              <div className='flex items-center gap-2'>
                <TemplateSelector selectedTemplate={resumeData.template}
                onChange={(template)=> setResumeData(prev =>({...prev, template}))}/>
                <ColorPicker selectedColor={resumeData.accentColor}
                onChange={(color)=> setResumeData(prev =>({...prev, accentColor:color}))}/>
              </div>

              <div className='flex items-center'>
              {activeSectionIndex !==0 && (
                <button onClick={()=> setActiveSectionIndex((prevIndex)=> Math.max(prevIndex-1,0))}
                 className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium
                text-gray-600 hover:bg-gray-100 transition-all' disabled={activeSectionIndex ===0}>
                  <ChevronLeft className='size-4'/>Previous
                </button>

              )}

              <button onClick={()=> setActiveSectionIndex((prevIndex)=> Math.min(prevIndex+1,sections.length-1))}
                 className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium
                text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length -1 && 'opacity-50'}`} 
                disabled={activeSectionIndex === sections.length -1}>
                  Next<ChevronRight className='size-4'/>
                </button>
              </div>


          </div>

          {/* Form Content */}
          <div className='space-y-6'>
            {activeSection.id === 'personal' && (
              <PersonalInfoForm data={resumeData.personal_info} onChange={(data)=>setResumeData(prev => 
              ({...prev, personal_info:data}))}  removeBackground={removeBackground} 
              setRemoveBackground={setRemoveBackground}/>
            )}
            {activeSection.id === 'summary' && (
              <ProfessionalSummaryForm data={resumeData.professional_summary}
              onChange={(data)=>setResumeData(prev => ({...prev, professional_summary:data}))}
              setResumeData={setResumeData}/>
               )}

              {activeSection.id === 'experience' && (
              <ExperienceForm data={resumeData.experience}
              onChange={(data)=>setResumeData(prev => ({...prev, experience:data}))}/>
               )}

              {activeSection.id === 'education' && (
              <EducationForm data={resumeData.education}
              onChange={(data)=>setResumeData(prev => ({...prev, education:data}))}/>
               )}

               {activeSection.id === 'projects' && (
            <ProjectForm data={resumeData.projects}
           onChange={(data)=>setResumeData(prev => ({ ...prev, projects: data }))}/>
              )}


               {activeSection.id === 'skills' && (
              <SkillsForm data={resumeData.skills}
              onChange={(data)=>setResumeData(prev => ({...prev, skills:data}))}
              profession={resumeData.personal_info?.profession}
              token={token}/>
               )}

               {activeSection.id === 'achievements' && (
              <AchievementsForm data={resumeData.key_achievements || []}
              onChange={(data)=>setResumeData(prev => ({...prev, key_achievements:data}))}/>
               )}

               {activeSection.id === 'training' && (
              <TrainingForm data={resumeData.training_courses || []}
              onChange={(data)=>setResumeData(prev => ({...prev, training_courses:data}))}/>
               )}

               {activeSection.id === 'interests' && (
              <InterestsForm data={resumeData.interests || []}
              onChange={(data)=>setResumeData(prev => ({...prev, interests:data}))}/>
               )}

               {activeSection.id === 'ai-tools' && (
              <AiToolsForm resumeData={resumeData} setResumeData={setResumeData}
              token={token} resumeId={resumeId}/>
               )}

          </div>

            <button onClick={() =>  toast.promise(saveResume(), { loading: 'Saving...' })}  
            className='bg-linear-to-br from-green-100 to-green-200 ring-green-300 text-green-600
            ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
              Save Changes
            </button>

        </div>
        </div>

        {/*Right Panel - Resume Preview*/}
          <div className='lg:col-span-7 max-lg:mt-6'>
            <div className='relative w-full'>
              <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                <button
                  onClick={() => setAtsMode((prev) => !prev)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs rounded-lg ring transition-colors ${atsMode ?
                    'bg-(--brand-primary-soft) text-(--brand-primary) ring-(--brand-primary-light)' :
                    'bg-gray-100 text-gray-600 ring-gray-200 hover:ring-gray-300'
                  }`}
                  aria-pressed={atsMode}
                >
                  <FileText className='size-4'/>
                  ATS Mode
                </button>
                {resumeData.public && (
                  <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-blue-100 to-blue-200 
                  text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
                    <Share2Icon className='size-4'/>
                  </button>
                )}

                <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-purple-100 to-purple-200
                text-purple-600 rounded-lg ring-purple-300 hover:ring transition-colors'>
                  {resumeData.public ? <EyeIcon className='size-4'/>:
                  <EyeOffIcon className='size-4'/>}
                  {resumeData.public ? 'Public' : 'Private'}
                </button>

                <button onClick={downloadResume} className='flex items-center gap-2 px-6 py-2 text-xs bg-linear-to-br from-green-100 to-green-200
                text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
                  <DownloadIcon className='size-4'/>Download
                </button>

              </div>
              
            </div>

             
             <ResumePreview data={resumeData} template={resumeData.template}
             accentColor={resumeData.accentColor} atsMode={atsMode}/>
             

          </div>

        </div>
        </div>

    </div>
  )
}

export default ResumeBuilder