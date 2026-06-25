import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Award, BookOpen, Heart, Sparkles, Briefcase, GraduationCap, FolderIcon, User, Github } from "lucide-react";

const CreativeTemplate = ({ data, accentColor, atsMode = false }) => {
  const displayAccent = atsMode ? "#111827" : accentColor;
  const borderAccent = atsMode ? "#e5e7eb" : accentColor;
  const lightBg = atsMode ? "#f9fafb" : `${accentColor}10`; // 10% opacity

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
    <div className="max-w-4xl mx-auto bg-white text-gray-800 leading-relaxed shadow-sm font-sans">
      {/* Header section with asymmetric accents */}
      <div className="grid grid-cols-12 gap-0 border-b-4" style={{ borderColor: displayAccent }}>
        <div 
          className="col-span-4 p-8 text-white flex flex-col justify-center space-y-3"
          style={{ backgroundColor: displayAccent }}
        >
          {data.personal_info?.image && typeof data.personal_info.image === 'string' ? (
            <div className="shrink-0 mb-2">
              <img src={data.personal_info.image} alt="Profile" className="w-24 h-24 object-cover rounded-2xl border-2 border-white mx-auto shadow-sm" />
            </div>
          ) : data.personal_info?.image && typeof data.personal_info.image === 'object' ? (
            <div className="shrink-0 mb-2">
              <img src={URL.createObjectURL(data.personal_info.image)} alt="Profile" className="w-24 h-24 object-cover rounded-2xl border-2 border-white mx-auto shadow-sm" />
            </div>
          ) : (
            <div className="size-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-2">
              <User className="size-8 text-white" />
            </div>
          )}
          <h2 className="text-sm font-semibold tracking-widest uppercase opacity-90 text-center">
            {data.personal_info?.profession || "PROFESSION"}
          </h2>
        </div>

        <div className="col-span-8 p-8 flex flex-col justify-center space-y-4 bg-gray-50">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide uppercase text-gray-900">
              {data.personal_info?.full_name || "Your Name"}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-gray-650">
            {data.personal_info?.email && (
              <div className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" style={{ color: displayAccent }} />
                <span className="truncate">{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" style={{ color: displayAccent }} />
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" style={{ color: displayAccent }} />
                <span>{data.personal_info.location}</span>
              </div>
            )}
            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="size-4 shrink-0" style={{ color: displayAccent }} />
                <span className="truncate">{data.personal_info.linkedin}</span>
              </div>
            )}
            {data.personal_info?.github && (
              <div className="flex items-center gap-2">
                <Github className="size-4 shrink-0" style={{ color: displayAccent }} />
                <span className="truncate">{data.personal_info.github}</span>
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-center gap-2 col-span-2">
                <Globe className="size-4 shrink-0" style={{ color: displayAccent }} />
                <span className="truncate">{data.personal_info.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-12 gap-6 p-8">
        
        {/* Left Column (8/12 width): Summary, Experience, Projects */}
        <div className="col-span-8 space-y-8 pr-4">
          
          {/* Summary */}
          {data.professional_summary && (
            <section className="space-y-3 break-inside-avoid">
              <div className="flex items-center gap-2 pb-1 border-b" style={{ borderColor: borderAccent }}>
                <User className="size-5 shrink-0" style={{ color: displayAccent }} />
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Professional Profile</h3>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed text-justify">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 pb-1 border-b" style={{ borderColor: borderAccent }}>
                <Briefcase className="size-5 shrink-0" style={{ color: displayAccent }} />
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Professional Journey</h3>
              </div>
              
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index} className="space-y-2 break-inside-avoid relative pl-4 border-l-2" style={{ borderColor: borderAccent }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{exp.position}</h4>
                        <p className="text-xs font-semibold" style={{ color: displayAccent }}>{exp.company}</p>
                      </div>
                      <span className="text-[10px] bg-gray-150 px-2 py-0.5 rounded text-gray-600 font-medium whitespace-nowrap">
                        {formatDate(exp.start_date)} - {exp.current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line text-justify">
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
              <div className="flex items-center gap-2 pb-1 border-b" style={{ borderColor: borderAccent }}>
                <FolderIcon className="size-5 shrink-0" style={{ color: displayAccent }} />
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Key Projects</h3>
              </div>
              
              <div className="space-y-5">
                {data.projects.map((proj, index) => (
                  <div key={index} className="space-y-2 break-inside-avoid p-3 rounded-lg" style={{ backgroundColor: lightBg }}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-gray-900">{proj.name}</h4>
                      {proj.type && (
                        <span className="text-[9px] px-2 py-0.5 font-bold uppercase rounded tracking-wider bg-white text-gray-700 shadow-3xs border border-gray-100">
                          {proj.type}
                        </span>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-xs text-gray-600 leading-relaxed text-justify">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column (4/12 width): Education, Skills, Achievements, Training, Interests */}
        <div className="col-span-4 space-y-8 pl-2 border-l border-gray-100">
          
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section className="space-y-3 break-inside-avoid">
              <div className="flex items-center gap-1.5 pb-1 border-b" style={{ borderColor: borderAccent }}>
                <Sparkles className="size-4 shrink-0" style={{ color: displayAccent }} />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Expertise</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className={`text-[10px] px-2.5 py-1 rounded-md font-bold tracking-wide shadow-3xs ${atsMode ? "text-gray-900 bg-gray-200" : "text-white"}`}
                    style={atsMode ? undefined : { backgroundColor: displayAccent }}
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
              <div className="flex items-center gap-1.5 pb-1 border-b" style={{ borderColor: borderAccent }}>
                <GraduationCap className="size-4.5 shrink-0" style={{ color: displayAccent }} />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Education</h3>
              </div>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index} className="space-y-1 break-inside-avoid">
                    <h4 className="font-bold text-xs text-gray-900 leading-tight">{edu.degree}</h4>
                    <p className="text-[10px] text-gray-600 leading-snug">{edu.institution}</p>
                    {edu.field && <p className="text-[10px] text-gray-500 italic">{edu.field}</p>}
                    <div className="flex justify-between text-[9px] text-gray-400 font-semibold pt-0.5">
                      <span>{formatDate(edu.graduation_date)}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {data.key_achievements && data.key_achievements.length > 0 && (
            <section className="space-y-3 break-inside-avoid">
              <div className="flex items-center gap-1.5 pb-1 border-b" style={{ borderColor: borderAccent }}>
                <Award className="size-4.5 shrink-0" style={{ color: displayAccent }} />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Accolades</h3>
              </div>
              <div className="space-y-3">
                {data.key_achievements.map((ach, index) => (
                  <div key={index} className="space-y-1 break-inside-avoid">
                    <h4 className="text-xs font-bold text-gray-900 leading-tight">
                      {ach.title}
                    </h4>
                    {ach.issuer && <p className="text-[10px] text-gray-500">{ach.issuer}</p>}
                    {ach.date && <p className="text-[9px] text-gray-400">{formatDate(ach.date)}</p>}
                    {ach.description && <p className="text-[10px] text-gray-650 leading-relaxed bg-gray-50 p-1.5 rounded">{ach.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Training / Courses */}
          {data.training_courses && data.training_courses.length > 0 && (
            <section className="space-y-3 break-inside-avoid">
              <div className="flex items-center gap-1.5 pb-1 border-b" style={{ borderColor: borderAccent }}>
                <BookOpen className="size-4.5 shrink-0" style={{ color: displayAccent }} />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Training</h3>
              </div>
              <div className="space-y-3">
                {data.training_courses.map((course, index) => (
                  <div key={index} className="space-y-1 break-inside-avoid">
                    <h4 className="text-xs font-bold text-gray-900 leading-tight">
                      {course.name}
                    </h4>
                    <p className="text-[10px] text-gray-500">{course.institution} {course.date && `(${formatDate(course.date)})`}</p>
                    {course.certificate_url && (
                      <a href={course.certificate_url} target="_blank" rel="noreferrer" className="text-[9px] text-blue-500 hover:underline">
                        View Credential
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
              <div className="flex items-center gap-1.5 pb-1 border-b" style={{ borderColor: borderAccent }}>
                <Heart className="size-4.5 shrink-0" style={{ color: displayAccent }} />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Interests</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.interests.map((interest, index) => (
                  <div key={index} className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium break-inside-avoid">
                    {interest.name}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

      </div>
    </div>
  );
};

export default CreativeTemplate;
