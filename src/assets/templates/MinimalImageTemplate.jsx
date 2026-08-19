import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";
import { formatDate } from "./formatDate";

const MinimalImageTemplate = ({ data, accentColor, atsMode = false }) => {
    const displayAccent = atsMode ? "#111827" : accentColor;

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800">
            <div className="grid grid-cols-3">

                <div className="col-span-1  py-10">
                    {/* Image */}
                    {data.personal_info?.image && typeof data.personal_info.image === 'string' ? (
                        <div className="mb-6">
                            <img src={data.personal_info.image} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto" style={{ background: atsMode ? "#e5e7eb" : accentColor+'70' }} />
                        </div>
                    ) : (
                        data.personal_info?.image && typeof data.personal_info.image === 'object' ? (
                            <div className="mb-6">
                                <img src={URL.createObjectURL(data.personal_info.image)} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto" />
                            </div>
                        ) : null
                    )}
                </div>

                {/* Name + Title */}
                <div className="col-span-2 flex flex-col justify-center py-10 px-8">
                    <h1 className="text-4xl font-bold text-zinc-700 tracking-widest">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="uppercase text-zinc-600 font-medium text-sm tracking-widest">
                        {data?.personal_info?.profession || "Profession"}
                    </p>
                </div>

                {/* Left Sidebar */}
                <aside className="col-span-1 border-r border-zinc-400 p-6 pt-0">


                    {/* Contact */}
                    <section className="mb-8 break-inside-avoid">
                        <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                            CONTACT
                        </h2>
                        <div className="space-y-2 text-sm">
                            {data.personal_info?.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone size={14} style={{ color: displayAccent }} />
                                    <span>{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.email && (
                                <div className="flex items-center gap-2">
                                    <Mail size={14} style={{ color: displayAccent }} />
                                    <span>{data.personal_info.email}</span>
                                </div>
                            )}
                             {data.personal_info?.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} style={{ color: displayAccent }} />
                                    <span>{data.personal_info.location}</span>
                                </div>
                            )}
                            {data.personal_info?.linkedin && (
                                <div className="flex items-center gap-2">
                                    <Linkedin size={14} style={{ color: displayAccent }} />
                                    <span className="break-all">{data.personal_info.linkedin}</span>
                                </div>
                            )}
                            {data.personal_info?.github && (
                                <div className="flex items-center gap-2">
                                    <Github size={14} style={{ color: displayAccent }} />
                                    <span className="break-all">{data.personal_info.github}</span>
                                </div>
                            )}
                            {data.personal_info?.website && (
                                <div className="flex items-center gap-2">
                                    <Globe size={14} style={{ color: displayAccent }} />
                                    <span className="break-all">{data.personal_info.website}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                                EDUCATION
                            </h2>
                            <div className="space-y-4 text-sm">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="break-inside-avoid">
                                        <p className="font-semibold uppercase">{edu.degree}</p>
                                        <p className="text-zinc-600">{edu.institution}</p>
                                        <p className="text-xs text-zinc-500">
                                            {formatDate(edu.graduation_date)}
                                        </p>
                                        {edu.gpa && (
                                            <p className="text-xs text-zinc-500 font-medium mt-0.5">
                                                {edu.gpa_type === "percentage" ? "Percentage" : "GPA"}: {edu.gpa}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section className="break-inside-avoid">
                            <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                                SKILLS
                            </h2>
                            <ul className="space-y-1 text-sm">
                                {data.skills.map((skill, index) => (
                                    <li key={index} className="break-inside-avoid">{skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Key Achievements */}
                    {data.key_achievements && data.key_achievements.length > 0 && (
                        <section className="mb-8 mt-6">
                            <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                                ACHIEVEMENTS
                            </h2>
                            <ul className="space-y-3 text-xs leading-relaxed">
                                {data.key_achievements.map((ach, index) => (
                                    <li key={index} className="break-inside-avoid">
                                        <strong className="text-zinc-700">{ach.title}</strong>
                                        {ach.issuer && <span className="text-[10px] text-zinc-500 block">Issuer: {ach.issuer}</span>}
                                        {ach.date && <span className="text-[9px] text-zinc-400 block">Date: {formatDate(ach.date)}</span>}
                                        {ach.description && <p className="text-zinc-500 text-[10px] mt-0.5">{ach.description}</p>}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Interests */}
                    {data.interests && data.interests.length > 0 && (
                        <section className="mb-8 mt-6 break-inside-avoid">
                            <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                                INTERESTS
                            </h2>
                            <ul className="space-y-1 text-xs">
                                {data.interests.map((interest, index) => (
                                    <li key={index} className="break-inside-avoid">
                                        <strong>{interest.name}</strong>{interest.description && `: ${interest.description}`}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </aside>

                {/* Right Content */}
                <main className="col-span-2 p-8 pt-0">

                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="mb-8">
                            <h2 className="text-sm font-semibold tracking-widest mb-3" style={{ color: displayAccent }} >
                                SUMMARY
                            </h2>
                            <p className="text-zinc-700 leading-relaxed">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-semibold tracking-widest mb-4" style={{ color: displayAccent }} >
                                EXPERIENCE
                            </h2>
                            <div className="space-y-6 mb-8">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="break-inside-avoid">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-semibold text-zinc-900">
                                                {exp.position}
                                            </h3>
                                            <span className="text-xs text-zinc-500">
                                                {formatDate(exp.start_date)} -{" "}
                                                {exp.current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-sm mb-2" style={{ color: displayAccent }} >
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <ul className="list-disc list-inside text-sm text-zinc-700 leading-relaxed space-y-1">
                                                {exp.description.split("\n").map((line, i) => (
                                                    <li key={i}>{line}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.projects && data.projects.length > 0 && (
                        <section>
                            <h2 className="text-sm uppercase tracking-widest font-semibold" style={{ color: displayAccent }}>
                                PROJECTS
                            </h2>
                            <div className="space-y-4">
                                {data.projects.map((project, index) => (
                                    <div key={index} className="break-inside-avoid">
                                        <h3 className="text-md font-medium text-zinc-800 mt-3">{project.name}</h3>
                                        <p className="text-sm mb-1" style={{ color: displayAccent }} >
                                            {project.type}
                                        </p>
                                        {project.description && (
                                            <ul className="list-disc list-inside text-sm text-zinc-700  space-y-1">
                                                {project.description.split("\n").map((line, i) => (
                                                    <li key={i}>{line}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Training / Courses */}
                    {data.training_courses && data.training_courses.length > 0 && (
                        <section className="mt-8">
                            <h2 className="text-sm uppercase tracking-widest font-semibold" style={{ color: displayAccent }}>
                                TRAINING / COURSES
                            </h2>
                            <div className="space-y-4">
                                {data.training_courses.map((course, index) => (
                                    <div key={index} className="mt-3 break-inside-avoid">
                                        <h3 className="text-md font-medium text-zinc-800">
                                            {course.name}
                                            {course.institution && <span className="text-xs text-zinc-500 font-normal"> - {course.institution}</span>}
                                            {course.date && <span className="text-xs text-zinc-400 font-normal ml-1"> ({formatDate(course.date)})</span>}
                                            {course.status && <span className="text-xs text-zinc-400 font-normal italic ml-1"> [{course.status}]</span>}
                                            {course.certificate_url && (
                                                <a href={course.certificate_url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline font-normal ml-2">
                                                    (Credential)
                                                </a>
                                            )}
                                        </h3>
                                        {course.description && <p className="text-sm text-zinc-600 pl-2 border-l border-zinc-200 mt-1">{course.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}


export default MinimalImageTemplate;