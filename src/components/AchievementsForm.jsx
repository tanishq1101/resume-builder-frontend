import React from 'react';
import { Plus, Trash2, Award, Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import api from '../configs/api';

const AchievementsForm = ({ data = [], onChange }) => {
  const { token } = useSelector(state => state.auth);
  const [generatingIndex, setGeneratingIndex] = React.useState(-1);

  const addAchievement = () => {
    const newAchievement = {
      title: "",
      issuer: "",
      date: "",
      description: ""
    };
    onChange([...data, newAchievement]);
  };

  const removeAchievement = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateAchievement = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateAchievementDescription = async (index) => {
    const achievement = data[index];
    if (!achievement.description) {
      toast.error("Please enter a basic description first.");
      return;
    }

    setGeneratingIndex(index);
    const userContent = achievement.description;
    const context = `Achievement: ${achievement.title}${achievement.issuer ? ` by ${achievement.issuer}` : ""}`;

    try {
      const { data: resData } = await api.post(
        '/api/ai/enhance',
        { fieldType: "achievement", context, userContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      updateAchievement(index, "description", resData.enhancedContent);
      toast.success("Achievement description enhanced!");
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
            <Award className="size-5 text-indigo-600 dark:text-indigo-400" />
            Key Achievements
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Add major accomplishments or recognition</p>
        </div>
        <button
          onClick={addAchievement}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Achievement
        </button>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
            <Award className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No achievements added yet.</p>
            <p className="text-xs text-gray-400">Click "Add Achievement" to add items like academic awards or project recognition.</p>
          </div>
        ) : (
          data.map((achievement, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Achievement #{index + 1}</h4>
                <button
                  onClick={() => removeAchievement(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid gap-3">
                <input
                  value={achievement.title || ""}
                  onChange={(e) => updateAchievement(index, "title", e.target.value)}
                  type="text"
                  placeholder="Achievement Title (e.g. GPA Excellence, Best Developer Award)"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-850 dark:text-gray-100"
                />

                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    value={achievement.issuer || ""}
                    onChange={(e) => updateAchievement(index, "issuer", e.target.value)}
                    type="text"
                    placeholder="Issuer / Organization (e.g. Google, Stanford University)"
                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-850 dark:text-gray-100"
                  />
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] font-semibold text-gray-500 pl-1">Award Date</label>
                    <input
                      value={achievement.date || ""}
                      onChange={(e) => updateAchievement(index, "date", e.target.value)}
                      type="month"
                      className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-850 dark:text-gray-100 w-full"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-500">Description</label>
                    <button
                      type="button"
                      onClick={() => generateAchievementDescription(index)}
                      disabled={generatingIndex === index || !achievement.title}
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
                    value={achievement.description || ""}
                    onChange={(e) => updateAchievement(index, "description", e.target.value)}
                    placeholder="Describe your achievement..."
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

export default AchievementsForm;
