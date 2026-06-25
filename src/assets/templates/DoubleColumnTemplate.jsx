import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Award, BookOpen, Heart, Sparkles, Github } from "lucide-react";

const DoubleColumnTemplate = ({ data, accentColor, atsMode = false }) => {
  const displayAccent = atsMode ? "#111827" : accentColor;
  const borderAccent = atsMode ? "#e5e7eb" : accentColor;
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
    <div className="max-w-4xl mx-auto bg-white text-gray-800 leading-relaxed shadow-sm">
      {/* Header Banner */}
      <header 
        className={`p-8 text-center space-y-4 ${atsMode ? "text-gray-900 border-b border-gray-200" : "text-white"}`}
        style={{ backgroundColor: atsMode ? "#ffffff" : displayAccent }}
      >
        <h1 className="text-4xl font-bold tracking-wide uppercase" style={{ color: atsMode ? "#111827" : undefined }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        
        {data.personal_info?.profession && (
          <p className="text-sm font-medium tracking-wider opacity-90">
            {data.personal_info.profession}
          </p>
        )}

  <div className={`flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs opacity-90 pt-2 ${atsMode ? "border-t border-gray-200" : "border-t border-white/20"}`}>
          {data.personal_info?.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="size-3.5" />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="size-3.5" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="size-3.5" />
              <span>{data.personal_info.linkedin}</span>
            </div>
          )}
          {data.personal_info?.github && (
            <div className="flex items-center gap-1.5">
              <Github className="size-3.5" />
              <span>{data.personal_info.github}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="size-3.5" />
              <span>{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="grid grid-cols-3 gap-8 p-8">
        
        {/* Left Column (2/3 Width): Summary, Experience, Projects */}
        <div className="col-span-2 space-y-8 pr-2 border-r border-gray-100">
          
          {/* Summary */}
          {data.professional_summary && (
            <section className="space-y-2 break-inside-avoid">
              <h2 className="text-base font-bold tracking-wider uppercase border-b-2 pb-1" style={{ color: displayAccent, borderColor: borderAccent }}>
                Summary
              </h2>
              <p className="text-xs text-gray-700 leading-relaxed text-justify">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-base font-bold tracking-wider uppercase border-b-2 pb-1" style={{ color: displayAccent, borderColor: borderAccent }}>
                Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index} className="space-y-1.5 break-inside-avoid">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-xs text-gray-900">{exp.position}</h3>
                        <p className="text-xs text-gray-700 font-semibold">{exp.company}</p>
                      </div>
                      <div className="text-right text-[10px] text-gray-500">
                        <p>{formatDate(exp.start_date)} - {exp.current ? "Present" : formatDate(exp.end_date)}</p>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-line pl-2 border-l border-gray-200">
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
              <h2 className="text-base font-bold tracking-wider uppercase border-b-2 pb-1" style={{ color: displayAccent, borderColor: borderAccent }}>
                Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((proj, index) => (
                  <div key={index} className="space-y-1.5 break-inside-avoid">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-xs text-gray-900">{proj.name}</h3>
                      {proj.type && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-600 font-medium rounded">
                          {proj.type}
                        </span>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-line pl-2 border-l border-gray-200">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Training / Courses */}
          {data.training_courses && data.training_courses.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-base font-bold tracking-wider uppercase border-b-2 pb-1" style={{ color: displayAccent, borderColor: borderAccent }}>
                Training / Courses
              </h2>
              <div className="space-y-4">
                {data.training_courses.map((course, index) => (
                  <div key={index} className="space-y-1.5 break-inside-avoid">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-xs text-gray-900">{course.name}</h4>
                        <p className="text-xs text-gray-755 font-semibold text-gray-700">{course.institution}</p>
                      </div>
                      <div className="text-right text-[10px] text-gray-500 whitespace-nowrap">
                        <p>
                          {course.date && formatDate(course.date)}
                          {course.status && <span className="italic ml-1">[{course.status}]</span>}
                          {course.certificate_url && (
                            <a href={course.certificate_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline ml-2">
                              (Link)
                            </a>
                          )}
                        </p>
                      </div>
                    </div>
                    {course.description && (
                      <p className="text-[11px] text-gray-650 leading-relaxed whitespace-pre-line pl-2 border-l border-gray-200">
                        {course.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column (1/3 Width): Education, Achievements, Skills, Interests */}
        <div className="col-span-1 space-y-8 pl-2">
          
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section className="space-y-3 break-inside-avoid">
              <h2 className="text-base font-bold tracking-wider uppercase border-b-2 pb-1" style={{ color: displayAccent, borderColor: borderAccent }}>
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index} className="space-y-1 break-inside-avoid">
                    <h3 className="font-bold text-xs text-gray-900 leading-tight">{edu.degree}</h3>
                    <p className="text-[11px] text-gray-700 font-semibold">{edu.institution} {edu.field && `• ${edu.field}`}</p>
                    <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                      <span>{formatDate(edu.graduation_date)}</span>
                      {edu.gpa && (
                        <span>
                          {edu.gpa_type === "percentage" ? "Percentage" : "GPA"}: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Achievements */}
          {data.key_achievements && data.key_achievements.length > 0 && (
            <section className="space-y-3 break-inside-avoid">
              <h2 className="text-base font-bold tracking-wider uppercase border-b-2 pb-1" style={{ color: displayAccent, borderColor: borderAccent }}>
                Achievements
              </h2>
              <div className="space-y-3">
                {data.key_achievements.map((ach, index) => (
                  <div key={index} className="flex gap-2 break-inside-avoid">
                    {/* Visual Square bullet point */}
                    <div 
                      className="size-1.5 rounded-xs mt-1 shrink-0"
                      style={{ backgroundColor: atsMode ? "#111827" : displayAccent }}
                    />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-gray-900 leading-tight">
                        {ach.title}
                        {ach.issuer && <span className="text-[10px] text-gray-500 font-normal"> - {ach.issuer}</span>}
                        {ach.date && <span className="text-[9px] text-gray-400 font-normal ml-1"> ({formatDate(ach.date)})</span>}
                      </h4>
                      {ach.description && <p className="text-[10px] text-gray-600 leading-normal mt-0.5">{ach.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section className="space-y-3 break-inside-avoid">
              <h2 className="text-base font-bold tracking-wider uppercase border-b-2 pb-1" style={{ color: displayAccent, borderColor: borderAccent }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide shadow-2xs ${atsMode ? "text-gray-900 bg-gray-200" : "text-white"}`}
                    style={atsMode ? undefined : { backgroundColor: displayAccent }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Interests */}
          {data.interests && data.interests.length > 0 && (
            <section className="space-y-3 break-inside-avoid">
              <h2 className="text-base font-bold tracking-wider uppercase border-b-2 pb-1" style={{ color: displayAccent, borderColor: borderAccent }}>
                Interests
              </h2>
              <div className="space-y-2.5">
                {data.interests.map((interest, index) => (
                  <div key={index} className="flex gap-2 break-inside-avoid">
                    <div 
                      className="size-1.5 rounded-full mt-1 shrink-0"
                      style={{ backgroundColor: atsMode ? "#111827" : displayAccent }}
                    />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-gray-900 leading-none">{interest.name}</h4>
                      {interest.description && <p className="text-[10px] text-gray-500 leading-relaxed">{interest.description}</p>}
                    </div>
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

export default DoubleColumnTemplate;
