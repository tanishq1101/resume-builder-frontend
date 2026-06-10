
const MinimalTemplate = ({ data, accentColor, atsMode = false }) => {
    const displayAccent = atsMode ? "#111827" : accentColor;
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
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-4xl font-thin mb-4 tracking-wide">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && (
                        <span className="break-all">{data.personal_info.linkedin}</span>
                    )}
                    {data.personal_info?.website && (
                        <span className="break-all">{data.personal_info.website}</span>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-10">
                    <p className=" text-gray-700">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: displayAccent }}>
                        Experience
                    </h2>

                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="break-inside-avoid">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-medium">{exp.position}</h3>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(exp.start_date)} - {exp.current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-2">{exp.company}</p>
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
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: displayAccent }}>
                        Projects
                    </h2>

                    <div className="space-y-4">
                        {data.projects.map((proj, index) => (
                            <div key={index} className="flex flex-col gap-2 justify-between items-baseline break-inside-avoid">
                                <h3 className="text-lg font-medium ">{proj.name}</h3>
                                <p className="text-gray-600">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: displayAccent }}>
                        Education
                    </h2>

                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline break-inside-avoid">
                                <div>
                                    <h3 className="font-medium">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600">{edu.institution}</p>
                                    {edu.gpa && (
                                        <p className="text-sm text-gray-500">
                                            {edu.gpa_type === "percentage" ? "Percentage" : "GPA"}: {edu.gpa}
                                        </p>
                                    )}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-10 break-inside-avoid">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: displayAccent }}>
                        Skills
                    </h2>

                    <div className="text-gray-700">
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}

            {/* Key Achievements */}
            {data.key_achievements && data.key_achievements.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: displayAccent }}>
                        Achievements
                    </h2>
                    <div className="space-y-4">
                        {data.key_achievements.map((ach, index) => (
                            <div key={index} className="space-y-1 break-inside-avoid">
                                <h3 className="font-medium text-base">
                                    {ach.title}
                                    {ach.issuer && <span className="text-sm text-gray-500 font-normal"> - {ach.issuer}</span>}
                                    {ach.date && <span className="text-xs text-gray-400 font-normal ml-1"> ({formatDate(ach.date)})</span>}
                                </h3>
                                {ach.description && <p className="text-gray-600 text-sm mt-0.5">{ach.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Training / Courses */}
            {data.training_courses && data.training_courses.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: displayAccent }}>
                        Training / Courses
                    </h2>
                    <div className="space-y-4">
                        {data.training_courses.map((course, index) => (
                            <div key={index} className="space-y-1 break-inside-avoid">
                                <h3 className="font-medium text-base">
                                    {course.name}
                                    {course.institution && <span className="text-sm text-gray-500 font-normal"> - {course.institution}</span>}
                                    {course.date && <span className="text-xs text-gray-400 font-normal ml-1"> ({formatDate(course.date)})</span>}
                                    {course.status && <span className="text-xs text-gray-400 font-normal italic ml-1"> [{course.status}]</span>}
                                    {course.certificate_url && (
                                        <a href={course.certificate_url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline font-normal ml-2">
                                            (Credential)
                                        </a>
                                    )}
                                </h3>
                                {course.description && <p className="text-gray-600 text-sm mt-0.5">{course.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Interests */}
            {data.interests && data.interests.length > 0 && (
                <section className="mb-10 break-inside-avoid">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Interests
                    </h2>
                    <div className="text-gray-700 space-y-1">
                        {data.interests.map((interest, index) => (
                            <div key={index} className="text-sm">
                                <strong>{interest.name}</strong>{interest.description && `: ${interest.description}`}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default MinimalTemplate;