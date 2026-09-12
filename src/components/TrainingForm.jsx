import React from 'react';
import { Plus, Trash2, BookOpen, Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../configs/api';

const TrainingForm = ({ data = [], onChange }) => {
  const [generatingIndex, setGeneratingIndex] = React.useState(-1);

  const addTraining = () => {
    const newTraining = {
      name: "",
      institution: "",
      date: "",
      status: "completed",
      certificate_id: "",
      certificate_url: "",
      description: ""
    };
    onChange([...data, newTraining]);
  };

  const removeTraining = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateTraining = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateCourseDescription = async (index) => {
    const course = data[index];
    if (!course.description) {
      toast.error("Please enter a basic description first.");
      return;
    }

    setGeneratingIndex(index);
    const userContent = course.description;
    const context = `Course/Certification: ${course.name}${course.institution ? ` by ${course.institution}` : ""}`;

    try {
      const { data: resData } = await api.post(
        '/api/ai/enhance',
        { fieldType: "course", context, userContent }
      );

      updateTraining(index, "description", resData.enhancedContent);
      toast.success("Course description enhanced!");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <BookOpen className="size-5 text-indigo-600 dark:text-indigo-400" />
            Training / Courses
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Add key certifications, bootcamps, or relevant courses</p>
        </div>
        <button
          onClick={addTraining}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Course
        </button>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
            <BookOpen className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No courses added yet.</p>
            <p className="text-xs text-gray-400">Click "Add Course" to display certifications like Machine Learning, Data Structures, etc.</p>
          </div>
        ) : (
          data.map((course, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Course #{index + 1}</h4>
                <button
                  onClick={() => removeTraining(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid gap-3">
                <input
                  value={course.name || ""}
                  onChange={(e) => updateTraining(index, "name", e.target.value)}
                  type="text"
                  placeholder="Course or Certification Name (e.g. Data Structures & Algorithms)"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-850 dark:text-gray-100"
                />

                <div className="grid md:grid-cols-3 gap-3">
                  <input
                    value={course.institution || ""}
                    onChange={(e) => updateTraining(index, "institution", e.target.value)}
                    type="text"
                    placeholder="Institution / Provider (e.g. Coursera, Udemy)"
                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-850 dark:text-gray-100"
                  />
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] font-semibold text-gray-500 pl-1">Date</label>
                    <input
                      value={course.date || ""}
                      onChange={(e) => updateTraining(index, "date", e.target.value)}
                      type="month"
                      className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-850 dark:text-gray-100 w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] font-semibold text-gray-500 pl-1">Status</label>
                    <select
                      value={course.status || "completed"}
                      onChange={(e) => updateTraining(index, "status", e.target.value)}
                      className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-850 dark:text-gray-100 w-full"
                    >
                      <option value="completed">Completed</option>
                      <option value="ongoing">Ongoing</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    value={course.certificate_id || ""}
                    onChange={(e) => updateTraining(index, "certificate_id", e.target.value)}
                    type="text"
                    placeholder="Credential ID (Optional)"
                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-850 dark:text-gray-100"
                  />
                  <input
                    value={course.certificate_url || ""}
                    onChange={(e) => updateTraining(index, "certificate_url", e.target.value)}
                    type="url"
                    placeholder="Credential URL (Optional)"
                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-850 dark:text-gray-100"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-500">Description</label>
                    <button
                      type="button"
                      onClick={() => generateCourseDescription(index)}
                      disabled={generatingIndex === index || !course.name}
                      className="flex items-center gap-1 px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {generatingIndex === index ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Sparkles className="w-3 h-3" />
                      )}
                      Enhance with AI
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={course.description || ""}
                    onChange={(e) => updateTraining(index, "description", e.target.value)}
                    placeholder="Describe what you learned..."
                    className="px-3 py-2 w-full text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-850 dark:text-gray-100 resize-none"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrainingForm;
