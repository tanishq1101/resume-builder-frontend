import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Award, BookOpen, Heart, Sparkles, Briefcase, GraduationCap, FolderIcon, Code, Github } from "lucide-react";

const TechTemplate = ({ data, accentColor, atsMode = false }) => {
  const displayAccent = atsMode ? "#111827" : accentColor;
  const borderAccent = atsMode ? "#e5e7eb" : accentColor;
  const tagBg = atsMode ? "#e5e7eb" : `${accentColor}15`;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    if (dateStr.toLowerCase() === "present" || !dateStr.includes("-")) {
      return dateStr;
    }
    const [year, month] = dateStr.split("-");
    const parsedDate = new Date(year, month - 1);
    if (isNaN(parsedDate.getTime())) {
      return dateStr;
    }
    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-slate-800 leading-relaxed shadow-sm font-mono text-xs">
      {/* Top Banner / Header */}
      <header className="p-8 border-b-2 border-slate-200 bg-slate-50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900" style={{ borderLeft: `4px solid ${displayAccent}`, paddingLeft: '12px' }}>
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            <p className="text-sm font-semibold tracking-wider uppercase text-slate-650 pl-3.5">
              {data.personal_info?.profession || "Software Developer"}
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-1.5 text-[11px] text-slate-600 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
            {data.personal_info?.email && (
              <div className="flex items-center gap-2">
                <Mail className="size-3.5" style={{ color: displayAccent }} />
                <span>{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="size-3.5" style={{ color: displayAccent }} />
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5" style={{ color: displayAccent }} />
                <span>{data.personal_info.location}</span>
              </div>
            )}
            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="size-3.5" style={{ color: displayAccent }} />
                <span>{data.personal_info.linkedin}</span>
              </div>
            )}
            {data.personal_info?.github && (
              <div className="flex items-center gap-2">
                <Github className="size-3.5" style={{ color: displayAccent }} />
                <span>{data.personal_info.github}</span>
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-center gap-2">
                <Globe className="size-3.5" style={{ color: displayAccent }} />
                <span>{data.personal_info.website}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="grid grid-cols-3 gap-6 p-8">
        
        {/* Left Column (2/3 width) - Experience & Projects */}
        <div className="col-span-2 space-y-8 pr-4 border-r border-slate-100">
          
          {/* Profile Summary */}
          {data.professional_summary && (
            <section className="space-y-2.5 break-inside-avoid">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
                <Code className="size-4" style={{ color: displayAccent }} />
                <h3 className="font-bold uppercase tracking-wider text-slate-900">./profile</h3>
              </div>
              <p className="text-slate-600 text-justify leading-relaxed">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {data.experience && data.experience.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
                <Briefcase className="size-4" style={{ color: displayAccent }} />
                <h3 className="font-bold uppercase tracking-wider text-slate-900">./experience</h3>
              </div>
              
              <div className="space-y-5">
                {data.experience.map((exp, index) => (
                  <div key={index} className="space-y-1.5 break-inside-avoid">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-slate-900">{exp.position}</h4>
                      <span className="text-[10px] text-slate-500 font-medium">
                        [{formatDate(exp.start_date)} - {exp.current ? "Present" : formatDate(exp.end_date)}]
                      </span>
                    </div>
                    <p className="font-semibold text-[11px]" style={{ color: displayAccent }}>{exp.company}</p>
                    {exp.description && (
                      <p className="text-slate-600 leading-normal whitespace-pre-line text-justify pl-3 border-l border-slate-200">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
                <FolderIcon className="size-4" style={{ color: displayAccent }} />
                <h3 className="font-bold uppercase tracking-wider text-slate-900">./projects</h3>
              </div>
              
              <div className="space-y-5">
                {data.projects.map((proj, index) => (
                  <div key={index} className="space-y-1.5 break-inside-avoid">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900">{proj.name}</h4>
                      {proj.type && (
                        <span className="text-[9px] px-2 py-0.5 font-bold uppercase rounded-md tracking-wider" style={{ backgroundColor: tagBg, color: displayAccent }}>
                          {proj.type}
                        </span>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-slate-600 leading-normal pl-3 border-l border-slate-200 text-justify">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column (1/3 width) - Tech Skills, Education, Achievements, Certifications, Interests */}
        <div className="col-span-1 space-y-8 pl-2">
          
          {/* Tech Stack / Skills */}
          {data.skills && data.skills.length > 0 && (
            <section className="space-y-3 break-inside-avoid">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
                <Sparkles className="size-4" style={{ color: displayAccent }} />
                <h3 className="font-bold uppercase tracking-wider text-slate-900">./skills</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="text-[10px] px-2 py-0.5 rounded border font-semibold"
                    style={{ 
                      borderColor: borderAccent, 
                      backgroundColor: tagBg, 
                      color: displayAccent 
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section className="space-y-3 break-inside-avoid">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
                <GraduationCap className="size-4" style={{ color: displayAccent }} />
                <h3 className="font-bold uppercase tracking-wider text-slate-900">./education</h3>
              </div>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index} className="space-y-1 break-inside-avoid">
                    <h4 className="font-bold text-slate-900 leading-tight">{edu.degree}</h4>
                    <p className="text-[10px] text-slate-600">{edu.institution}</p>
                    <div className="flex justify-between text-[9px] text-slate-400 font-semibold mt-0.5">
                      <span>{formatDate(edu.graduation_date)}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Achievements */}
          {data.key_achievements && data.key_achievements.length > 0 && (
            <section className="space-y-3 break-inside-avoid">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
                <Award className="size-4" style={{ color: displayAccent }} />
                <h3 className="font-bold uppercase tracking-wider text-slate-900">./achievements</h3>
              </div>
              <div className="space-y-3">
                {data.key_achievements.map((ach, index) => (
                  <div key={index} className="space-y-0.5 break-inside-avoid">
                    <h4 className="font-bold text-slate-900 leading-tight">{ach.title}</h4>
                    {ach.issuer && <p className="text-[10px] text-slate-500">{ach.issuer}</p>}
                    {ach.description && <p className="text-[10px] text-slate-600 leading-snug bg-slate-50 p-1.5 rounded border border-slate-150 mt-1">{ach.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Courses & Training */}
          {data.training_courses && data.training_courses.length > 0 && (
            <section className="space-y-3 break-inside-avoid">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
                <BookOpen className="size-4" style={{ color: displayAccent }} />
                <h3 className="font-bold uppercase tracking-wider text-slate-900">./certifications</h3>
              </div>
              <div className="space-y-3">
                {data.training_courses.map((course, index) => (
                  <div key={index} className="space-y-1 break-inside-avoid">
                    <h4 className="font-bold text-slate-900 leading-tight">{course.name}</h4>
                    <p className="text-[10px] text-slate-500">{course.institution}</p>
                    {course.certificate_url && (
                      <a href={course.certificate_url} target="_blank" rel="noreferrer" className="text-[9px] text-blue-500 hover:underline">
                        [view-credential]
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Interests */}
          {data.interests && data.interests.length > 0 && (
            <section className="space-y-3 break-inside-avoid">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
                <Heart className="size-4" style={{ color: displayAccent }} />
                <h3 className="font-bold uppercase tracking-wider text-slate-900">./interests</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.interests.map((interest, index) => (
                  <span key={index} className="text-[10px] bg-slate-150 text-slate-650 px-2 py-0.5 rounded border border-slate-200 font-medium break-inside-avoid">
                    {interest.name}
                  </span>
                ))}
              </div>
            </section>
          )}

        </div>

      </div>
    </div>
  );
};

export default TechTemplate;
