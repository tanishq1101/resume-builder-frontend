import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";

const ClassicTemplate = ({ data, accentColor, atsMode = false }) => {
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
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
            {/* Header */}
            <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: borderAccent }}>
                <h1 className="text-3xl font-bold mb-2" style={{ color: displayAccent }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="size-4" />
                            <span className="break-all">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.github && (
                        <div className="flex items-center gap-1">
                            <Github className="size-4" />
                            <span className="break-all">{data.personal_info.github}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-4" />
                            <span className="break-all">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3" style={{ color: displayAccent }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: displayAccent }}>
                        PROFESSIONAL EXPERIENCE
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="border-l-3 pl-4 break-inside-avoid" style={{ borderColor: borderAccent }}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                                        <p className="text-gray-700 font-medium">{exp.company}</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                        <p>{formatDate(exp.start_date)} - {exp.current ? "Present" : formatDate(exp.end_date)}</p>
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

          {/* Projects */}
{data.projects && data.projects.length > 0 && (
    <section className="mb-6">
    <h2 className="text-xl font-semibold mb-4" style={{ color: displayAccent }}>
            PROJECTS
        </h2>

        <ul className="space-y-3">
            {data.projects.map((proj, index) => (
                <li key={index} className="border-l-3 pl-6 break-inside-avoid" style={{ borderColor: borderAccent }}>
                    <h3 className="font-semibold text-gray-800">{proj.name}</h3>
                    {proj.type && <p className="text-sm text-gray-600 italic">{proj.type}</p>}
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{proj.description}</p>
                </li>
            ))}
        </ul>
    </section>
)}


            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: displayAccent }}>
                        EDUCATION
                    </h2>

                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start break-inside-avoid">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-700">{edu.institution}</p>
                                    {edu.gpa && (
                                        <p className="text-sm text-gray-600">
                                            {edu.gpa_type === "percentage" ? "Percentage" : "GPA"}: {edu.gpa}
                                        </p>
                                    )}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p>{formatDate(edu.graduation_date)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-6 break-inside-avoid">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: displayAccent }}>
                        CORE SKILLS
                    </h2>

                    <div className="flex gap-4 flex-wrap">
                        {data.skills.map((skill, index) => (
                            <div key={index} className="text-gray-700">
                                • {skill}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Key Achievements */}
            {data.key_achievements && data.key_achievements.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: displayAccent }}>
                        KEY ACHIEVEMENTS
                    </h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {data.key_achievements.map((ach, index) => (
                            <li key={index} className="text-gray-700 text-sm break-inside-avoid">
                                <strong>{ach.title}</strong>
                                {ach.issuer && <span> - {ach.issuer}</span>}
                                {ach.date && <span> ({formatDate(ach.date)})</span>}
                                {ach.description && <span>: {ach.description}</span>}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Training / Courses */}
            {data.training_courses && data.training_courses.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: displayAccent }}>
                        TRAINING / COURSES
                    </h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {data.training_courses.map((course, index) => (
                            <li key={index} className="text-gray-700 text-sm break-inside-avoid">
                                <strong>{course.name}</strong>
                                {course.institution && <span> - {course.institution}</span>}
                                {course.date && <span> ({formatDate(course.date)})</span>}
                                {course.status && <span className="text-xs text-gray-500 italic ml-1">[{course.status}]</span>}
                                {course.certificate_url && (
                                    <a href={course.certificate_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs ml-2">
                                        (Credential)
                                    </a>
                                )}
                                {course.description && <span>: {course.description}</span>}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Interests */}
            {data.interests && data.interests.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        INTERESTS & HOBBIES
                    </h2>
                    <div className="flex gap-4 flex-wrap">
                        {data.interests.map((interest, index) => (
                            <div key={index} className="text-gray-700 text-sm break-inside-avoid">
                                • <strong>{interest.name}</strong>{interest.description && `: ${interest.description}`}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default ClassicTemplate;